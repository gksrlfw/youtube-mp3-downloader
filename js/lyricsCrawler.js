const puppeteer = require('puppeteer');

const lyricsCrawler = async (title, artist) => {
    try {
        const browser = await puppeteer.launch({ 
            headless: true, 
            args: ['--window-size=1920, 1080', '--disable-notifications']
        });
        const page = await browser.newPage();
        await page.setViewport({
            width: 1080,
            height: 1080,
        });

        await page.goto('https://naver.com/');
        // await page.type('.green_window', `케이윌 이러지마 제발`); // 검색어 입력
        await page.type('.green_window', `${artist} ${title}`); // 검색어 입력
        await page.click('#search_btn');
        await page.waitForSelector('a.btn._tail');
        await page.click('a.btn._tail');

        
        const result = await page.evaluate(() => {
            let lyrics = document.querySelector('.lyrics_area ._text').innerHTML.replace(/<br>/g, '\n');
            return lyrics;
        });
        // console.log(result);     
        return result;   
    }
    catch(e) {
        console.error(e);
    }
}

module.exports = lyricsCrawler;