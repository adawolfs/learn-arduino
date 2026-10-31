#!/usr/bin/env python3
"""Serve only manifest-listed preservation files on loopback; no remote proxy."""
import argparse,json
from http.server import BaseHTTPRequestHandler,ThreadingHTTPServer
from pathlib import Path
from urllib.parse import urlsplit,unquote
ROOT=Path(__file__).resolve().parents[1]
CSP="default-src 'self' data: blob:; script-src 'self' 'unsafe-inline' 'unsafe-eval' blob:; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:; font-src 'self' data:; connect-src 'self' data: blob:; worker-src 'self' blob:; media-src 'self' data: blob:; object-src 'none'; frame-src 'self' blob:; form-action 'none'; base-uri 'self'"
class Handler(BaseHTTPRequestHandler):
 def do_HEAD(self):self.serve(False)
 def do_GET(self):self.serve(True)
 def serve(self,body):
  u=urlsplit(self.path)
  if u.scheme or u.netloc or '\\' in unquote(u.path) or '..' in unquote(u.path).split('/'):
   self.send_error(400);return
  route=u.path+('?' +u.query if u.query else '')
  record=self.server.routes.get(route) or self.server.routes.get(u.path)
  if not record:self.send_error(404,'Not captured; no remote fallback');return
  f=(self.server.root/record['path']).resolve()
  if not f.is_relative_to(self.server.root):self.send_error(403);return
  try:data=f.read_bytes()
  except OSError:self.send_error(404);return
  self.send_response(200);self.send_header('Content-Type',record['content_type']);self.send_header('Content-Length',str(len(data)))
  self.send_header('Cache-Control','no-store');self.send_header('Content-Security-Policy',CSP);self.send_header('X-Content-Type-Options','nosniff');self.send_header('Referrer-Policy','no-referrer');self.end_headers()
  if body:
   try:self.wfile.write(data)
   except (BrokenPipeError,ConnectionResetError):pass
 def log_message(self,fmt,*args):print(fmt%args,flush=True)
def main():
 ap=argparse.ArgumentParser();ap.add_argument('--port',type=int,default=5232);args=ap.parse_args()
 root=(ROOT/'reference/site').resolve();manifest=json.loads((ROOT/'reference/manifest.json').read_text())
 routes={}
 for record in manifest['files']:
  route=urlsplit(record['url']).path or '/'
  routes[route]={'path':record['path'].removeprefix('site/'),'content_type':record['content_type']}
  if route.endswith('/') and route!='/':routes[route.rstrip('/')]=routes[route]
 http=ThreadingHTTPServer(('127.0.0.1',args.port),Handler);http.root=root;http.routes=routes
 print(f'Arduino immutable preservation: http://127.0.0.1:{args.port}/#board',flush=True);http.serve_forever()
if __name__=='__main__':main()