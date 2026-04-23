#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const isProduction = process.env.NODE_ENV === 'production';
const mode = isProduction ? 'production' : 'development';
const selectedFile = isProduction
  ? path.resolve(__dirname, 'src/services/services.admin.js')
  : path.resolve(__dirname, 'src/services/services.admin.dev.js');
const devFile = path.resolve(__dirname, 'src/services/services.admin.dev.js');
const prodFile = path.resolve(__dirname, 'src/services/services.admin.js');

console.log('[verify-services] NODE_ENV=', process.env.NODE_ENV || 'undefined');
console.log('[verify-services] webpack mode=', mode);
console.log('[verify-services] selected file=', path.basename(selectedFile));
console.log('[verify-services] full path=', selectedFile);
console.log('[verify-services] dev exists=', fs.existsSync(devFile));
console.log('[verify-services] prod exists=', fs.existsSync(prodFile));
console.log('[verify-services] selected exists=', fs.existsSync(selectedFile));

if (fs.existsSync(devFile)) {
  console.log('[verify-services] dev file size=', fs.statSync(devFile).size);
}

if (fs.existsSync(prodFile)) {
  console.log('[verify-services] prod file size=', fs.statSync(prodFile).size);
}

if (!fs.existsSync(devFile) || !fs.existsSync(prodFile) || !fs.existsSync(selectedFile)) {
  process.exit(1);
}

console.log('[verify-services] verification passed');