const { spawn } = require('child_process');
const path = require('path');

const backendPath = path.join(__dirname, 'ZUS backend');
const frontendPath = path.join(__dirname, 'ZUS frontend');

console.log('Starting ZUS Backend and Frontend...\n');

const backend = spawn('npm', ['run', 'dev'], {
  cwd: backendPath,
  shell: true,
  stdio: 'inherit'
});

const frontend = spawn('npm', ['run', 'dev'], {
  cwd: frontendPath,
  shell: true,
  stdio: 'inherit'
});

backend.on('error', (err) => {
  console.error('Backend error:', err);
});

frontend.on('error', (err) => {
  console.error('Frontend error:', err);
});

process.on('SIGINT', () => {
  backend.kill();
  frontend.kill();
  process.exit();
});

process.on('SIGTERM', () => {
  backend.kill();
  frontend.kill();
  process.exit();
});



