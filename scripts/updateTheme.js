import fs from 'fs';
import path from 'path';

const dir = './src';

const replacements = [
  { search: /var\(--color-primary-pink\)/g, replace: 'var(--color-primary-green)' },
  { search: /var\(--color-soft-rose\)/g, replace: 'var(--color-soft-sage)' },
  { search: /var\(--color-hover-accent\)/g, replace: 'var(--color-accent-green)' },
  { search: /var\(--color-floral-bg\)/g, replace: 'var(--color-premium-bg)' },
  { search: /bg-floral-gradient/g, replace: 'bg-botanical-gradient' },
  { search: /pink-100/g, replace: 'green-100' },
  { search: /pink-200/g, replace: 'green-900' },
  { search: /pink-500/g, replace: 'green-700' },
  { search: /rose-100/g, replace: 'green-100' },
  { search: /fill="#E91E63"/g, replace: 'fill="#0B2B1B"' },
  { search: /to-\[#FF80AB\]/g, replace: 'to-[#1E5631]' },
];

function processDirectory(directory) {
  const files = fs.readdirSync(directory);
  for (const file of files) {
    const fullPath = path.join(directory, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDirectory(fullPath);
    } else if (fullPath.endsWith('.jsx') || fullPath.endsWith('.js') || fullPath.endsWith('.json')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let newContent = content;
      for (const r of replacements) {
        newContent = newContent.replace(r.search, r.replace);
      }
      if (newContent !== content) {
        fs.writeFileSync(fullPath, newContent);
        console.log('Updated: ' + fullPath);
      }
    }
  }
}

processDirectory(dir);
