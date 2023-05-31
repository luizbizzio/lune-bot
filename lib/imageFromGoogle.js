const puppeteer = require('puppeteer');
const fs = require('fs-extra');
const { mess } = require('./mess');
const { sleep } = require('./functions');

function doNothing() {
	return;
};

const get = async (query) => {
  	var puppeteerConfigs = {
    	headless: true,
		executablePath: '/usr/bin/google-chrome-stable'
  	}
	const browser = await puppeteer.launch(puppeteerConfigs);
	const page = await browser.newPage();

	
	const cookiesString = await fs.readFile('./cookies.json');
	const cookies = JSON.parse(cookiesString);
	await page.setCookie(...cookies);
	
	await page.goto(`https://www.google.com/search?q=${encodeURIComponent(query)}&rlz=1C1GGRV_enUS785US785&sxsrf=AOaemvLDYl_sPTsRGMa3nClcf0oXmMR4Qw:1637086237154&source=lnms&tbm=isch&sa=X&ved=2ahUKEwif3oa9vZ30AhXIpZUCHQ02CDIQ_AUoAXoECAIQAw&biw=397&bih=932&dpr=1&sfr=vfe`);
	
	try {
		await page.waitForSelector('img.Q4LuWd', { timeout: 10000, });
	} catch (e) {
		await browser.close();
		console.log(e);
		return "Nenhum resultado encontrado";
	}

	var images = await page.evaluate(() => {
		var images = [];
		var imgs = document.querySelectorAll('img.Q4LuWd');
		if (imgs.length < 2) return false;
		for (var i = 0; i < imgs.length; i++) {
			var img = imgs[i];
			var src = img.src;
			if (!src.includes('gstatic') && src !== '') {
				images.push(src);
			};
		};
		return images;
	});

	/*
	// Salvar cookies da página
	await sleep(30000);

	const cookies = await page.cookies();
	await fs.writeFile('./cookies.json', JSON.stringify(cookies, null, 2))
		.then(() => {
			console.log('cookies salvos');
		});
	*/

	await browser.close();

	if (!images || images.length == 0) return "Nenhum resultado encontrado";

	var imgPath = './media/' + query + '-' + Math.random().toString(36).substring(7) +  '.jpg';
	var img = images[Math.floor(Math.random() * images.length)];
	return img;
	
};

module.exports = { get };