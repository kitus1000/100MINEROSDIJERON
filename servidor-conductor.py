# Servidor Wi-Fi Remoto para Conductor - 100 MINEROS DIJERON (GRUPO BACIS)
# Permite controlar el juego desde tu celular conectado a la misma red Wi-Fi.

import http.server
import socketserver
import json
import socket
import urllib.parse

PORT = 8000

# Estado global sincronizado
game_state = {
    "round": 1,
    "question": None,
    "revealedIndexes": [],
    "lastCommand": None
}

class MiningGameHandler(http.server.SimpleHTTPRequestHandler):
    def do_POST(self):
        global game_state
        content_length = int(self.headers.get('Content-Length', 0))
        body = self.rfile.read(content_length)
        data = json.loads(body.decode('utf-8'))

        if self.path == '/update-state':
            game_state["question"] = data.get("question")
            game_state["round"] = data.get("round", 1)
            game_state["revealedIndexes"] = data.get("revealedIndexes", [])
            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self.end_headers()
            self.wfile.write(b'{"status":"ok"}')
            return

        elif self.path == '/remote-command':
            game_state["lastCommand"] = data
            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self.end_headers()
            self.wfile.write(b'{"status":"ok"}')
            return

        self.send_response(404)
        self.end_headers()

    def do_GET(self):
        global game_state
        if self.path == '/get-state':
            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps(game_state).encode('utf-8'))
            return

        elif self.path == '/poll-command':
            cmd = game_state["lastCommand"]
            game_state["lastCommand"] = None
            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps(cmd if cmd else {}).encode('utf-8'))
            return

        return super().do_GET()

def get_local_ip():
    s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    try:
        s.connect(('8.8.8.8', 80))
        ip = s.getsockname()[0]
    except Exception:
        ip = '127.0.0.1'
    finally:
        s.close()
    return ip

local_ip = get_local_ip()

print("="*65)
print("  ⛏️  SERVIDOR REMOTO DE CONDUCTOR - 100 MINEROS DIJERON  ⛏️")
print("="*65)
print(f" 📺 EN LA PANTALLA PRINCIPAL (TV / Proyector) abre:")
print(f"    http://localhost:{PORT}/index.html\n")
print(f" 📱 EN TU CELULAR O TABLETA (Misma red Wi-Fi) abre:")
print(f"    http://{local_ip}:{PORT}/conductor.html")
print("="*65)
print("¡Todo listo! Presiona Ctrl+C en esta terminal para detener.")

with socketserver.TCPServer(("", PORT), MiningGameHandler) as httpd:
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nServidor detenido.")
