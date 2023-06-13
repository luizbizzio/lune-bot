const { isOs } = require('./checkos');
const { exec } = require('child_process');

var iswin = isOs('win32');

if (iswin) {
  exec(".\\lib\\installWFonts.bat .\\fonts\\", (err) => {
    if (err !== null) return console.log(err);
    console.log('Fonts installed sucessfully.');
  });
} else {
  exec('sudo cp ./fonts/*.ttf /usr/share/fonts/truetype/', (err) => {
    if (err !== null) return console.log(err);
    console.log('Fonts installed sucessfully.');
  });
};