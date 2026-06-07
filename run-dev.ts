import { spawn } from 'child_process';

const pythonPort = '8000';
const vitePort = '3000';

console.log("🚀 Starting NexusHR fullstack app in development mode...");
printLocalBanner();

// Spawn Python server
const pythonProc = spawn('python3', ['server.py', pythonPort], {
  stdio: 'inherit',
  shell: true
});

pythonProc.on('error', (err) => {
  console.error('❌ Failed starting Python process:', err);
});

// Spawn Vite Dev Server on port 3000
const viteProc = spawn('npx', ['vite', '--port', vitePort, '--host', '0.0.0.0'], {
  stdio: 'inherit',
  shell: true
});

viteProc.on('error', (err) => {
  console.error('❌ Failed starting Vite server:', err);
});

const handleExit = () => {
  console.log('\nStopping NexusHR dev instances safely...');
  pythonProc.kill();
  viteProc.kill();
  process.exit(0);
};

process.on('SIGINT', handleExit);
process.on('SIGTERM', handleExit);

function printLocalBanner() {
  console.log("=========================================");
  console.log(`  Python API listening on: http://127.0.0.1:${pythonPort}`);
  console.log(`  Frontend Vite listening on: http://0.0.0.0:${vitePort}`);
  console.log("=========================================");
}
