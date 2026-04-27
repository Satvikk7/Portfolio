const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) { 
      results = results.concat(walk(file));
    } else { 
      if (file.endsWith('.jsx') || file.endsWith('.js') || file.endsWith('.css') || file.endsWith('.html')) {
        results.push(file);
      }
    }
  });
  return results;
}

const files = walk('./src').concat(['./tailwind.config.js', './index.html']);

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  
  // Replace font names and classes
  content = content.replace(/syne/g, 'outfit');
  content = content.replace(/Syne/g, 'Outfit');
  content = content.replace(/dm/g, 'inter');
  content = content.replace(/DM Sans/g, 'Inter');
  
  // Replace colors
  content = content.replace(/amber/g, 'teal');
  content = content.replace(/#f5a623/g, '#2ea3b0'); // DEFAULT amber to teal
  content = content.replace(/#c4831a/g, '#237c87'); // dim amber to dim teal
  content = content.replace(/#f5a62333/g, '#2ea3b033'); // glow
  
  fs.writeFileSync(file, content);
});
console.log('Replacements completed successfully.');
