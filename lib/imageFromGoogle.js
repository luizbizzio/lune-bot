const puppeteer = require('puppeteer');
const fs = require('fs-extra');
const config = require('../settings/config.json');
const { isOs, checkOs } = require('./checkos');
const { sleep } = require('./functions.js');

const get = async (query) => {
	try {
		var puppeteerConfigs = {
			headless: "new",
		};
		if (!isOs('win32')) {
			puppeteerConfigs.executablePath = config.executablePath;
		};
		const browser = await puppeteer.launch(puppeteerConfigs);
		const page = await browser.newPage();

		const cookies = JSON.parse(fs.readFileSync('./settings/cookies.json'));
		await page.setCookie(...cookies);

		await page.goto(`https://www.google.com/search?q=${encodeURIComponent(query)}&rlz=1C1GGRV_enUS785US785&sxsrf=AOaemvLDYl_sPTsRGMa3nClcf0oXmMR4Qw:1637086237154&source=lnms&tbm=isch&sa=X&ved=2ahUKEwif3oa9vZ30AhXIpZUCHQ02CDIQ_AUoAXoECAIQAw&biw=397&bih=932&dpr=1&sfr=vfe`);

		try {
			await page.waitForSelector('img.Q4LuWd', { timeout: 10000, });
		} catch (e) {
			await browser.close();
			return "No results found";
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

		await browser.close();

		if (!images || images.length == 0) return "No results found";

		var img = images[Math.floor(Math.random() * images.length)];
		return img;
	} catch (e) {
		return "No results found";
	}
};

module.exports = { get };