#!/usr/bin/env node

const { spawn } = require('child_process');
const path = require('path');

const mode = process.argv[2] || 'mobile';
const port = process.argv[3] || (mode === 'tv' ? '5174' : '5173');

console.log(`🚀 Starting PhotoTV in ${mode} mode on port ${port}`);

// Set environment variables
const env = { ...process.env };

if (mode === 'tv') {
  console.log('📺 TV Mode enabled');
  console.log(`   Open: http://localhost:${port}?tv=true`);
} else {
  console.log('📱 Mobile Mode');
  console.log(`   Open: http://localhost:${port}`);
}

// Spawn the vite dev server
const viteProcess = spawn('npm', ['run', 'dev', '--', '--port', port], {
  env,
  stdio: 'inherit',
  cwd: path.dirname(__dirname)
});

viteProcess.on('close', (code) => {
  console.log(`\nDev server exited with code ${code}`);
});

// Handle Ctrl+C
process.on('SIGINT', () => {
  console.log('\n🛑 Shutting down dev server...');
  viteProcess.kill('SIGINT');
});
