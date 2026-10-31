#!/usr/bin/env python3
"""Capture public Arduino resources as immutable bytes; standard library only."""
import argparse, hashlib, json, re, time
from collections import deque
from datetime import datetime, timezone
from html.parser import HTMLParser
from pathlib import Path, PurePosixPath
from urllib.parse import urljoin, urlsplit, urlunsplit, unquote
from urllib.request import Request, build_opener, HTTPRedirectHandler
from urllib.error import HTTPError, URLError
ORIGIN='https://learn-arduino-red.vercel.app/'
ROOT=Path(__file__).resolve().parents[1]
EXT=r'(?:js|mjs|css|woff2?|ttf|otf|png|jpe?g|webp|gif|svg|ico|avif|json|webmanifest|glb|gltf|bin|wasm|mp3|ogg|wav|mp4|webm|txt|xml|html)'
LITERAL=re.compile(r'([\"\x27`])((?:https?://|/|\./|\.\./|js/|fonts/|img/|assets/)[^\s\"\x27`<>]*?\.'+EXT+r'(?:\?[^\s\"\x27`<>]*)?)\1',re.I)
CSS=re.compile(r'url\(\s*([\"\x27]?)(.*?)\1\s*\)',re.I)
class Refs(HTMLParser):
 def __init__(self):super().__init__();self.urls=set()
 def handle_starttag(self,tag,attrs):
  a=dict(attrs)
  for k in ('src','href','poster'):
   if a.get(k):self.urls.add(a[k])
  if a.get('srcset'):
   self.urls.update(x.strip().split()[0] for x in a['srcset'].split(',') if x.strip())
  if a.get('property') in ('og:image','twitter:image') and a.get('content'):self.urls.add(a['content'])
def normalize(value,base):
 if not value or value.startswith(('#','data:','blob:','mailto:','tel:')) or '${' in value:return None
 if value.startswith(('js/','fonts/','img/','assets/')):value='/'+value
 u=urlsplit(urljoin(base,value));o=urlsplit(ORIGIN)
 if (u.scheme,u.netloc)!=(o.scheme,o.netloc):return None
 # Validate decoded routing semantics before any request or redirect. Reject
 # ambiguous/repeated encoding rather than asking the upstream how it resolves.
 decoded=u.path
 for _ in range(4):
  expanded=unquote(decoded)
  if expanded==decoded:break
  decoded=expanded
 if '%' in decoded or chr(92) in decoded or chr(0) in decoded:return None
 if any(part in ('.','..') for part in decoded.split('/')):return None
 canonical=re.sub(r'/+','/',decoded).casefold()
 if canonical in ('/api','/.netlify/functions') or canonical.startswith(('/api/','/.netlify/functions/','/pro-')):return None
 return urlunsplit((u.scheme,u.netloc,u.path or '/',u.query,''))
def local_path(url):
 u=urlsplit(url);p=unquote(u.path)
 if '..' in PurePosixPath(p).parts or '\\' in p or '\0' in p:raise ValueError('Unsafe URL path')
 p=p.lstrip('/')
 if not p or p.endswith('/'):p+='index.html'
 elif not PurePosixPath(p).suffix:p+='/index.html'
 if u.query:
  q=PurePosixPath(p);p=str(q.with_name(q.stem+'.query-'+hashlib.sha256(u.query.encode()).hexdigest()[:12]+q.suffix))
 return p
class Redirect(HTTPRedirectHandler):
 def redirect_request(self,req,fp,code,msg,headers,newurl):
  if normalize(newurl,req.full_url) is None:
   fp.close();raise URLError('Blocked redirect outside capture scope')
  return super().redirect_request(req,fp,code,msg,headers,newurl)
def fetch(url):
 if normalize(url,ORIGIN) is None:raise ValueError('URL outside safe public capture scope')
 local_path(url)  # Reject unsafe destination paths before opening the network.
 req=Request(url,headers={'User-Agent':'Arduino-Preservation/1.0','Accept-Encoding':'identity'})
 with build_opener(Redirect()).open(req,timeout=35) as r:
  length=r.headers.get('Content-Length')
  if length and int(length)>50_000_000:raise ValueError('Resource exceeds 50 MB capture limit')
  body=r.read(50_000_001)
  if len(body)>50_000_000:raise ValueError('Resource exceeds 50 MB capture limit')
  return r.status,dict(r.headers),body,r.url
def discover(body,mime):
 if not any(x in mime for x in ('text/','javascript','json','xml','manifest')):return set()
 s=body.decode('utf-8','replace');refs=set()
 if 'html' in mime:
  parser=Refs();parser.feed(s);refs.update(parser.urls)
 if 'css' in mime:refs.update(m.group(2) for m in CSS.finditer(s))
 refs.update(m.group(2) for m in LITERAL.finditer(s))
 if 'manifest' in mime or 'json' in mime:
  try:data=json.loads(s)
  except ValueError:data=None
  def walk(x):
   if isinstance(x,dict):
    for k,v in x.items():
     if k in ('src','href','url') and isinstance(v,str):refs.add(v)
     else:walk(v)
   elif isinstance(x,list):
    for v in x:walk(v)
  walk(data)
 return refs
def valid_response(url,mime,body):
 suffix=PurePosixPath(urlsplit(url).path).suffix.lower()
 prefix=body[:4096].decode('utf-8','ignore').lstrip('\ufeff \t\r\n')
 html_markup=re.match(r'(?:<!--.*?-->\s*)*(?:<!doctype\s+html\b|<(?:html|head|body)\b)',prefix,re.I|re.S)
 return not (('html' in mime.lower() or html_markup) and suffix not in ('','.html'))
def main():
 ap=argparse.ArgumentParser();ap.add_argument('--output',type=Path,default=ROOT/'reference');ap.add_argument('--max-files',type=int,default=500);args=ap.parse_args()
 out=args.output.resolve();out.mkdir(parents=True,exist_ok=True)
 manifest=out/'manifest.json'
 if manifest.exists():raise SystemExit('Capture exists; choose a fresh --output. Never overwrite reference bytes.')
 queue=deque([ORIGIN,urljoin(ORIGIN,'sw.js'),urljoin(ORIGIN,'robots.txt'),urljoin(ORIGIN,'sitemap.xml')]);seen=set(queue)
 files=[];edges=[];failures=[];excluded=set();total=0;started=datetime.now(timezone.utc).isoformat()
 while queue:
  if len(files)>=args.max_files:raise SystemExit('Capture file limit reached; inspect before expanding scope')
  url=queue.popleft()
  try:
   status,headers,body,final=fetch(url);mime=next((v for k,v in headers.items() if k.lower()=='content-type'),'')
   if not valid_response(url,mime,body):raise ValueError('HTML fallback returned for non-HTML resource')
   rel=local_path(url);dest=out/'site'/rel;dest.parent.mkdir(parents=True,exist_ok=True)
   if dest.exists() and dest.read_bytes()!=body:raise ValueError('Refusing to overwrite differing captured bytes')
   if not dest.exists():dest.write_bytes(body)
   record={'url':url,'final_url':final,'path':'site/'+rel,'status':status,'content_type':mime,'bytes':len(body),'sha256':hashlib.sha256(body).hexdigest(),'captured_at':datetime.now(timezone.utc).isoformat(),'headers':{k:v for k,v in headers.items() if k.lower() in ('etag','last-modified','cache-control')}}
   files.append(record);total+=len(body)
   print(f'{len(files):3} {len(body):9} {url}',flush=True)
   for raw in sorted(discover(body,mime)):
    target=normalize(raw,url)
    if target is None:excluded.add(raw);continue
    edges.append({'from':url,'to':target})
    if target not in seen:seen.add(target);queue.append(target)
  except (HTTPError,URLError,OSError,ValueError) as e:
   failures.append({'url':url,'error':str(e)});print(f'UNAVAILABLE {url}: {e}',flush=True)
  time.sleep(.08)
 result={'schema_version':1,'base_url':ORIGIN,'started_at':started,'captured_at':datetime.now(timezone.utc).isoformat(),'file_count':len(files),'total_bytes':total,'files':sorted(files,key=lambda f:f['path']),'edges':edges,'failures':failures,'excluded_references':sorted(excluded)}
 manifest.write_text(json.dumps(result,indent=2,ensure_ascii=False)+'\n')
 print(json.dumps({'files':len(files),'bytes':total,'failures':len(failures),'manifest':str(manifest)}))
if __name__=='__main__':main()