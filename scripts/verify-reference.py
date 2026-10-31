#!/usr/bin/env python3
"""Verify exact preserved bytes and optionally every local served URL."""
import argparse,hashlib,json
from pathlib import Path
from urllib.request import urlopen
from urllib.parse import urlsplit
from capture import valid_response
ROOT=Path(__file__).resolve().parents[1]
def main():
 ap=argparse.ArgumentParser();ap.add_argument('--url');args=ap.parse_args()
 manifest=json.loads((ROOT/'reference/manifest.json').read_text());served=0
 for record in manifest['files']:
  data=(ROOT/'reference'/record['path']).read_bytes()
  assert len(data)==record['bytes'] and hashlib.sha256(data).hexdigest()==record['sha256'],record['path']
  assert valid_response(record['url'],record['content_type'],data),record['path']
  if args.url:
   with urlopen(args.url.rstrip('/')+(urlsplit(record['url']).path or '/'),timeout=15) as response:
    assert response.read()==data,record['path'];assert response.headers['Content-Type']==record['content_type'];served+=1
 print(json.dumps({'files':len(manifest['files']),'bytes':sum(r['bytes'] for r in manifest['files']),'served':served,'recorded_capture_failures':len(manifest['failures'])}))
if __name__=='__main__':main()