import importlib.util,unittest
from pathlib import Path
spec=importlib.util.spec_from_file_location('capture',Path(__file__).resolve().parents[1]/'scripts/capture.py')
c=importlib.util.module_from_spec(spec);spec.loader.exec_module(c)
class CaptureTests(unittest.TestCase):
 def test_scope(self):
  for url in ('https://other.example/x.js','/%61pi/private','/%2e%2e/x','/a%5cb','#board'):
   self.assertIsNone(c.normalize(url,c.ORIGIN))
 def test_vite_paths(self):
  self.assertEqual(c.normalize('assets/en-hash.js',c.ORIGIN+'assets/app.js'),c.ORIGIN+'assets/en-hash.js')
  refs=c.discover(b'const deps=["assets/en-hash.js"]; import("./stage-hash.js");','application/javascript')
  self.assertIn('assets/en-hash.js',refs);self.assertIn('./stage-hash.js',refs)
 def test_fallback(self):
  self.assertFalse(c.valid_response(c.ORIGIN+'missing.js','application/javascript',b'<!--err--><html>missing</html>'))
  self.assertTrue(c.valid_response(c.ORIGIN,'text/html',b'<html>course</html>'))
 def test_safe_paths_and_queries(self):
  with self.assertRaises(ValueError):c.local_path(c.ORIGIN+'%2e%2e/key')
  self.assertNotEqual(c.local_path(c.ORIGIN+'x?v=1'),c.local_path(c.ORIGIN+'x?v=2'))
if __name__=='__main__':unittest.main()
