// Run this script to update API URLs for production
// Usage: node update-urls.js YOUR_VERCEL_URL

const fs = require('fs');
const path = require('path');

const vercelUrl = process.argv[2];

if (!vercelUrl) {
    console.log('❌ Please provide your Vercel URL');
    console.log('Usage: node update-urls.js https://your-app.vercel.app');
    process.exit(1);
}

console.log(`🔄 Updating API URLs to: ${vercelUrl}`);

// Update script.js
const scriptPath = path.join(__dirname, 'script.js');
let scriptContent = fs.readFileSync(scriptPath, 'utf8');
scriptContent = scriptContent.replace(/http:\/\/localhost:3000/g, vercelUrl);
fs.writeFileSync(scriptPath, scriptContent);
console.log('✅ Updated script.js');

// Update admin.html
const adminPath = path.join(__dirname, 'admin.html');
let adminContent = fs.readFileSync(adminPath, 'utf8');
adminContent = adminContent.replace(/http:\/\/localhost:3000/g, vercelUrl);
fs.writeFileSync(adminPath, adminContent);
console.log('✅ Updated admin.html');

console.log('\n✅ All URLs updated!');
console.log('\nNext steps:');
console.log('1. git add .');
console.log('2. git commit -m "Update API URLs for production"');
console.log('3. git push');
