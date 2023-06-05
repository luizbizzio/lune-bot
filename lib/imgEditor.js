const cvs = require('canvas');
cvs.registerFont('./fonts/CedarvilleCursive-Regular.ttf', { family: "Cedarville Cursive" });
const fs = require('fs');

const limit = 25;

const createMemeImg = async(_up, _down, _img, client, message, { mess, lang }) => {
  try {
    const img = await cvs.loadImage(_img);
    const canvas = cvs.createCanvas(img.width, img.height);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);

    if (_up.split('').length > limit) return client.reply(message.from, mess[lang].maxText(limit)+' (superior)', message.id);
    if (_down.split('').length > limit) return client.reply(message.from, mess[lang].maxText(limit)+' (inferior)', message.id);

    var fSize = 200;
    ctx.textAlign    = 'center'
    ctx.textBaseline = 'middle';
    ctx.fillStyle    = '#ffffff';
    do {
      fSize--;
      ctx.font = fSize+"px Serpentine Sans Icg";
    } while(ctx.measureText(_up.toUpperCase()).width > canvas.width-30);
    ctx.fillText(_up.toUpperCase(), img.width / 2, img.height / 3.70);

    var fSize = 200;
    ctx.textAlign    = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle    = '#ffffff';
    do {
      fSize--;
      ctx.font = fSize+"px Serpentine Sans Icg";
    } while(ctx.measureText(_down.toUpperCase()).width > canvas.width-30 && fSize > 50);
    ctx.fillText(_down.toUpperCase(), img.width / 2, img.height / 1.24);

    var outBuffer = canvas.toBuffer('image/png');
    var imageB64 = 'data:image/png;base64,' + outBuffer.toString('base64');
    await client.sendFile(message.from, imageB64, 'unknow.png', '', message.id);
    fs.unlinkSync(_img);
  } catch (e) {
    console.log(e);
    client.reply(message.from, mess[lang].somethingWentWrong(), message.id);
  };
};

const createGamerImg = async(_name, client, message, { mess, lang }) => {
  try {
    const _img = "./media/gamer/"+Math.floor(Math.random() * 24 + 1)+".jpeg"
    const img = await cvs.loadImage(_img);
    const canvas = cvs.createCanvas(img.width, img.height);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);

    if (_name.split('').length > limit) return client.reply(message.from, mess[lang].maxText(limit), message.id);

    var fSize = 200;

    ctx.textAlign    = 'center'
    ctx.textBaseline = 'middle';
    ctx.fillStyle    = '#ffffff';
    ctx.strokeText = '#000000'; 

    if (_name.length > 10) {
      do {
        fSize--;
        ctx.font = fSize+"px Serpentine Sans Icg";
      } while(ctx.measureText(_name.toUpperCase()).width > 700);
    } else {
      ctx.font = "100px Serpentine Sans Icg";
    };

    ctx.fillText(_name.toUpperCase(), img.width / 2, img.height / 1.24);

    var outBuffer = canvas.toBuffer('image/png');
    var imageB64 = 'data:image/png;base64,' + outBuffer.toString('base64');
    await client.sendFile(message.from, imageB64, 'gamer.png', '', message.id);
  } catch (e) {
    console.log(e);
    client.reply(message.from, mess[lang].somethingWentWrong(), message.id);
  };
};


const createTtpImg = async(_text, client, message, { mess, lang }) => {
  try {
    const canvas = cvs.createCanvas(500, 500);
    const ctx = canvas.getContext('2d');
    
    var fontsize = 350;
  
    do {
      fontsize--;
      ctx.font = fontsize+"px Bungee"
    } while(ctx.measureText(_text).width > canvas.width)

    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 15;
    ctx.strokeText(_text, canvas.width / 2, canvas.height / 2);
    ctx.fillStyle = '#ffffff';
    ctx.fillText(_text, canvas.width / 2, canvas.height / 2);

    var outBuffer = canvas.toBuffer('image/png');
    var imageB64 = 'data:image/png;base64,' + outBuffer.toString('base64');
    await client.sendImageAsStickerAsReply(message.from, imageB64, message.id, mess[lang].stickerMetadataImg(true));
  } catch (e) {
    console.log(e);
    client.reply(message.from, mess[lang].somethingWentWrong(), message.id);
  };
};

const createWrite = async(_text, client, message, { mess, lang }) => {
  try {
    if (_text.split('').length > 1500) return client.reply(message.from, mess[lang].maxText(1500), message.id);
    var spacement = ' ';
    for (let i = 0; i < _text.split(' ').length; i++) {
      if (_text.split(' ')[i].length > 47) {
        spacement = '';
      };
    }
    var jumpNumber = 39.2;
    var maxSize = 220;
    var minSizeX = 169;
    var minSizeY = 185;

    const _img = "./media/write/write.jpeg";
    const img = await cvs.loadImage(_img);
    const canvas = cvs.createCanvas(img.width, img.height);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);

    ctx.globalAlpha = 1;
    ctx.fillStyle = 'black';
    ctx.font = `27px Cedarville Cursive`;

    text = _text;

    var ad = 0;
    function add(text) {
      arr = [];
      tt = text.split('\n');
      for (let i = 0; i < tt.length; i++) {
        if (i > 0) {
          ad = ad + jumpNumber;
        };
        text = tt[i];
        while (ctx.measureText(text).width > canvas.width-maxSize) {
          text = text.split(spacement);
          arr.push(text[text.length-1]);
          text.pop();
          text = text.join(spacement);
        };
        ctx.fillText(text, minSizeX, minSizeY+40+ad);
        if (arr.length > 0) {
          ad = ad + jumpNumber;
          add(arr.reverse().join(spacement));
        };
      };
    };
    add(text);

    var outBuffer = canvas.toBuffer('image/png');
    var imageB64 = 'data:image/png;base64,' + outBuffer.toString('base64');
    await client.sendFile(message.from, imageB64, 'write.png', '', message.id);
  } catch (e) {
    client.reply(message.from, mess[lang].somethingWentWrong(), message.id);
  }
};

module.exports = {
  createMemeImg,
  createGamerImg,
  createTtpImg,
  createWrite
};