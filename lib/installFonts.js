const { isOs } = require('./checkos');
const { exec } = require('child_process');
const fontList = require('font-list');

var iswin = isOs('win32');

fontList.getFonts()
  .then(fonts => {
    if (iswin) {
      exec(".\\lib\\installWFonts.bat .\\fonts\\", (err) => {
        if (err !== null) return console.log(err);
        console.log('Fonts installed sucessfully.');
      });
      exec('sudo cp ./fonts/*.ttf /usr/share/fonts/truetype/', (err) => {
        if (err !== null) return console.log(err);
        console.log('Fonts installed sucessfully.');
      });
    } else {
      console.log("All fonts are already installed!");
    }
  })
  .catch(err => {
    console.log(err)
  })