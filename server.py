import http.server
import socketserver
import json
import os
import sys
import subprocess
import urllib.request
import urllib.error
import mimetypes

# Load local environment variables from .env if present
env_file_path = os.path.join(os.path.dirname(__file__), '.env')
if os.path.exists(env_file_path):
    with open(env_file_path, 'r', encoding='utf-8') as f:
        for line in f:
            line = line.strip()
            if line and not line.startswith('#'):
                parts = line.split('=', 1)
                if len(parts) == 2:
                    key = parts[0].strip()
                    val = parts[1].strip().strip('"').strip("'")
                    os.environ[key] = val

PORT = int(sys.argv[1]) if len(sys.argv) > 1 else int(os.environ.get("PORT", "3000"))
GEMINI_API_KEY = os.environ.get("GEMINI_API_KEY", "")

class CustomAPIHandler(http.server.BaseHTTPRequestHandler):
    
    def end_headers(self):
        # Apply standard CORS headers to permit frictionless frontend queries
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
        super().end_headers()

    def do_OPTIONS(self):
        self.send_response(200)
        self.end_headers()

    def do_POST(self):
        if self.path == '/api/run-python':
            self.handle_run_python()
        elif self.path == '/api/generate-python-script':
            self.handle_generate_script()
        else:
            self.send_error(404, "API endpoint not found")

    def do_GET(self):
        # In production or standard standalone mode, this serves local static assets
        # In dev mode, Vite will proxy api routes here, and vite itself hosts assets on 3000.
        clean_path = self.path.split('?')[0]
        
        # Deny directory traversal attacks
        if '..' in clean_path:
            self.send_error(403, "Access Denied")
            return

        dist_dir = os.path.join(os.getcwd(), 'dist')
        
        # If accessing the root or a folder, assume index.html
        local_file = os.path.join(dist_dir, clean_path.lstrip('/'))
        if os.path.isdir(local_file) or clean_path == '/':
            local_file = os.path.join(dist_dir, 'index.html')

        # If a requested path doesn't point to an actual file (like SPA paths "/employees"),
        # serve the index.html so the client-side router takes over.
        if not os.path.exists(local_file) or not os.path.isfile(local_file):
            local_file = os.path.join(dist_dir, 'index.html')

        # If index.html still doesn't exist, we might not have built yet
        if not os.path.exists(local_file):
            self.send_response(404)
            self.send_header('Content-Type', 'text/plain')
            self.end_headers()
            self.wfile.write(b"Static assets have not been compiled yet. Run 'npm run build' first.")
            return

        # Determine MIME type
        mime_type, _ = mimetypes.guess_type(local_file)
        if not mime_type:
            mime_type = 'application/octet-stream'

        try:
            with open(local_file, 'rb') as f:
                content = f.read()
            self.send_response(200)
            self.send_header('Content-Type', mime_type)
            self.send_header('Content-Length', str(len(content)))
            self.end_headers()
            self.wfile.write(content)
        except Exception as e:
            self.send_response(500)
            self.send_header('Content-Type', 'text/plain')
            self.end_headers()
            self.wfile.write(f"Internal server error reading static assets: {e}".encode('utf-8'))

    def handle_run_python(self):
        try:
            content_length = int(self.headers.get('Content-Length', 0))
            post_data = self.rfile.read(content_length)
            req_body = json.loads(post_data.decode('utf-8'))

            code = req_body.get("code", "")
            employees = req_body.get("employees", [])

            if not code:
                self.send_json_response({"error": "No Python code provided."}, status=400)
                return

            # Prepare executable Python code preloaded with employee dataset
            prepped_code = f"""
import json, os, sys

# Automatically inject employees DB from environment
try:
    raw_data = os.environ.get('NEXUS_EMPLOYEE_DATA', '[]')
    employees = json.loads(raw_data)
except Exception as e:
    employees = []
    print(f"Error initializing employees dataset: {{e}}", file=sys.stderr)

# Ensure stdout uses UTF-8 encoding
if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

# User Script Runs Here:
{code}
"""

            # Environment containing employee dataset
            env = os.environ.copy()
            env['NEXUS_EMPLOYEE_DATA'] = json.dumps(employees)

            # Spawn Python subprocess to isolate execution and prevent memory leakage
            proc = subprocess.run(
                [sys.executable or "python3", "-c", prepped_code],
                capture_output=True,
                text=True,
                env=env,
                timeout=12
            )

            response_payload = {
                "stdout": proc.stdout or "No printable output produced on standard out.",
                "stderr": proc.stderr or "",
                "isSimulated": False
            }

            self.send_json_response(response_payload)

        except subprocess.TimeoutExpired:
            self.send_json_response({
                "stdout": "",
                "stderr": "Execution Error: Script exceeded runtime timeout of 12 seconds."
            }, status=504)
        except Exception as e:
            self.send_json_response({
                "stdout": "",
                "stderr": f"Server Side Executor Error: {str(e)}"
            }, status=500)

    def handle_generate_script(self):
        try:
            content_length = int(self.headers.get('Content-Length', 0))
            post_data = self.rfile.read(content_length)
            req_body = json.loads(post_data.decode('utf-8'))

            prompt = req_body.get("prompt", "")
            if not prompt:
                self.send_json_response({"error": "No prompt provided."}, status=400)
                return

            if not GEMINI_API_KEY:
                self.send_json_response({
                    "error": "GEMINI_API_KEY environment variable is not defined. Please add your key in Settings > Secrets."
                }, status=500)
                return

            # Construct Gemini rest query prompt
            ai_instructions = f"""You are an expert Talent Analytics and Workforce Data Scientist who writes high-quality Python code.
The user wants to analyze their workforce database with questions/goals: "{prompt}"

We have preloaded the dataset into the local Python variable 'employees' (a python list of dictionaries list[dict]).
Each employee dictionary in 'employees' lists:
- 'id': string, e.g. "EMP001"
- 'firstName': string, e.g. "Sarah"
- 'lastName': string, e.g. "Chen"
- 'email': string, e.g. "sarah.chen@amdox.com"
- 'role': string, e.g. "Senior Software Engineer"
- 'department': string, e.g. "Engineering"
- 'status': 'Active' | 'On Leave' | 'Terminated' | 'Onboarding'
- 'dateJoined': string (YYYY-MM-DD e.g. "2021-03-15")
- 'performanceScore': number, range 1 to 5 e.g. 4.8
- 'attritionRisk': 'Low' | 'Medium' | 'High'
- 'salary': number, e.g. 125000
- 'location': string, e.g. "Bangalore, IN" or "Seattle, WA"

Generate a Python script to answer this analytic request. It MUST directly process the preloaded 'employees' list (do not read other files or create empty dicts). Print the results clearly with elegant summaries, emojis, or simple bar-charts drawn in terminal-ascii style!

Please return your response in a structured JSON schema containing:
1. 'code': The complete, copyable, executable Python script.
2. 'explanation': A simple, highly conversational explanation of how the script addresses raw data.
"""

            # Build Gemini API POST payload
            gemini_payload = {
                "contents": [{
                    "parts": [{
                        "text": ai_instructions
                    }]
                }],
                "generationConfig": {
                    "responseMimeType": "application/json",
                    "responseSchema": {
                        "type": "object",
                        "properties": {
                            "code": {"type": "string", "description": "The complete executable python script referencing 'employees'"},
                            "explanation": {"type": "string", "description": "A simple explanation of how the script solves their request"}
                        },
                        "required": ["code", "explanation"]
                    }
                }
            }

            url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent?key={GEMINI_API_KEY}"
            
            # URLLib HTTP request
            req = urllib.request.Request(
                url,
                data=json.dumps(gemini_payload).encode('utf-8'),
                headers={
                    'Content-Type': 'application/json',
                    'User-Agent': 'aistudio-build'
                },
                method='POST'
            )

            with urllib.request.urlopen(req) as resp:
                gemini_res = json.loads(resp.read().decode('utf-8'))
                
            try:
                # Extracts generated text block
                text_block = gemini_res["candidates"][0]["content"]["parts"][0]["text"]
                parsed_script_data = json.loads(text_block)
                self.send_json_response(parsed_script_data)
            except (KeyError, IndexError, json.JSONDecodeError) as parse_err:
                self.send_json_response({
                    "error": f"Failed parsing structured JSON from Gemini. Raw response: {gemini_res}"
                }, status=502)

        except urllib.error.HTTPError as he:
            err_body = he.read().decode('utf-8') if he else "Unknown Connection Error"
            self.send_json_response({
                "error": f"Gemini API request failed: {he.reason} - {err_body}"
            }, status=502)
        except Exception as e:
            self.send_json_response({
                "error": f"Generation exception occurred: {str(e)}"
            }, status=500)

    def send_json_response(self, data, status=200):
        try:
            content = json.dumps(data).encode('utf-8')
            self.send_response(status)
            self.send_header('Content-Type', 'application/json')
            self.send_header('Content-Length', str(len(content)))
            self.end_headers()
            self.wfile.write(content)
        except Exception as e:
            print(f"Error responding to endpoint requests: {e}", file=sys.stderr)

class ThreadingHTTPServer(socketserver.ThreadingMixIn, http.server.HTTPServer):
    # Permits serving concurrent browser and proxy requests efficiently
    allow_reuse_address = True

if __name__ == '__main__':
    print(f"⚡ Launching NexusHR Python Backend Server on Port {PORT}...")
    server = ThreadingHTTPServer(('0.0.0.0', PORT), CustomAPIHandler)
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\nShutting down Python server...")
        server.shutdown()
