// 구글에서 검색하여 가져와준다

const puppeteer = require('puppeteer');

const autoFindUrl = async (title, artist) => {
    try {
        const browser = await puppeteer.launch({ headless: false });
        const page = await browser.newPage();
        await page.goto('https://google.com');

        await page.click('input[title="검색"]');
        await page.type('input[title="검색"]', `${title} ${artist}`);
        // await page.type('input[title="검색"]', `i feel serene`);
        await page.click('input[title="검색"]');
        await page.waitFor(1000);

        await page.click('input[value="Google 검색"]');
        await page.waitForNavigation({
            waitUntil: 'networkidle2'
        });
        
        await page.evaluate(() => { if(document.querySelector('.ujudUb.WRZytc a')) document.querySelector('.ujudUb.WRZytc a').click();})   // 더보기
        const containerForSong = await page.evaluate(() => {
            let searchUrl;
            let searchAlbum;
            let searchGenre;
            let searchLyricsArray;
            let searchLyrics;
            if(document.querySelector('.twQ0Be a')) searchUrl = document.querySelector('.twQ0Be a').href || "Do not find";
            else searchUrl='';
            if(document.querySelector('div[data-attrid="kc:/music/recording_cluster:first album"]')) searchAlbum = document.querySelector('div[data-attrid="kc:/music/recording_cluster:first album"]').textContent.split(':')[1] || "Do not find";
            else searchAlbum='';
            if(document.querySelector('div[data-attrid="kc:/music/recording_cluster:skos_genre"]')) searchGenre = document.querySelector('div[data-attrid="kc:/music/recording_cluster:skos_genre"]').textContent.split(':')[1] || "Do not find";
            else searchGenre='';
            if(document.querySelectorAll('div.ujudUb')) {
                searchLyricsArray = Array.from(document.querySelectorAll('div.ujudUb')).slice(1) || "Do not find";
                // textContent로 하면 span 사이에 줄바꿈이 안되는데 innerText는 되네??
                if(searchLyricsArray) {
                    searchLyricsArray.forEach((lyric, i) => {
                        searchLyrics += lyric.innerText;
                    });
                }
            }
            else searchLyrics='';
            const containerForSong = [searchUrl, searchAlbum, searchGenre, searchLyrics];
            return containerForSong;
        });
        console.log(containerForSong);
        return containerForSong;
    }
    catch(e) {
        console.error(e);
    }
};
// autoFindUrl();

module.exports = autoFindUrl;