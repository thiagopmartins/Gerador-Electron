let fs = require('fs');

try { fs.writeFileSync('./myfile.txt', content, 'utf-8'); }
catch(e) { alert('Failed to save the file !'); }