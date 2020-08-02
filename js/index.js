const fs = require('fs');

let percent = require('./js/downloader').per;
const downloader = require('./js/downloader').crawler;
const changeMetadata = require('./js/controlMetadata');
const imageDownloader = require('./js/imageDownloader');
// const lyricsCrawler = require('./js/lyricsCrawler');
const printLog = require('./js/printLog.js');
const musicPlayer = require('./js/player');


let convert = document.querySelector('#convert');
let findLyrics = document.querySelector('#find_lyrics');
let reset = document.querySelector('#reset');
let findAuto = document.querySelector('#find-auto');
let checkExecute = false;


musicPlayer();        // music
checkCreateFolder();  // create folder

findAuto.addEventListener('click', async (e) => {
    e.preventDefault();
    let urlTag = document.querySelector('#url');
    let titleTag = document.querySelector('#title');
    let artistTag = document.querySelector('#artist');
    let albumTag = document.querySelector('#album');
    let lyricTag = document.querySelector('#lyric');
    let genreTag = document.querySelector('#genre');
    let artist = artistTag.value || ' ';
    let title = titleTag.value;
    const autoFindUrl = require('./js/autoFindUrl.js');
    // const containerForSong = await autoFindUrl('i am better off', 'wildson');
    const containerForSong = await autoFindUrl(title, artist);
    console.log(containerForSong);
    urlTag.value = containerForSong[0];
    albumTag.value = containerForSong[1];
    lyricTag.value = containerForSong[3];
    genreTag.value = containerForSong[2];
});




// reset
// reset.addEventListener('click', (e) => {
//   location.reload();
//   console.log(percent);
//   console.log('Comp');
// });

// mp4 to mp3
convert.addEventListener('click', async (e) => {
    e.preventDefault();
    if(checkExecute) return alert('Plz retry when prev file finished.');
    checkExecute = true;
    let urlTag = document.querySelector('#url');
    let titleTag =  document.querySelector('#title');
    let artistTag = document.querySelector('#artist');
    let albumTag =  document.querySelector('#album');
    let imageTag =  document.querySelector('#image');
    let lyricTag =  document.querySelector('#lyric');
    let genreTag =  document.querySelector('#genre');


    let url = urlTag.value;
    let artist = artistTag.value || ' ';
    let title = titleTag.value;
    let image = imageTag.value || 'DO NOT ADD';
    let album = albumTag.value || title;
    let lyric = lyricTag.value || 'ADD LYRICS';
    let genre = genreTag.value || ' ';
    // 입력창 초기화
    urlTag.value = '';
    artistTag.value = '';
    titleTag.value = '';
    albumTag.value = '';
    imageTag.value = '';
    lyricTag.value = '';
    genreTag.value = '';
    urlTag.focus();
    let percentLength = 0;
    let cnt = -1;

    // todo: 비동기 처리
    // 동기로 하는 방법 뒤져도 모르겠음...
    if(!downloader(url, title) !== 'error') {
      if(image !== 'DO NOT ADD') imageDownloader(image, `./image/${title}.jpg`);
      let check = setInterval(() => {
          if(cnt>=3 && percent.length === percentLength) {
            deleteFile('video', title, 'mp4');
            checkExecute = false;
            clearInterval(check);
            return alert('에러가 발생했어염!! 껏다 키는게 정신건강에 이롭습니당~');
          }
          else {
            console.log('per: ', percent);
            printLog(percent.slice(percentLength, percent.length), title, artist, ++cnt); 
            percentLength = percent.length;
            if(Number(percent[percentLength-1])>=99) {
              percentLength = 0;
              cnt = -1;
              percent.push(' ');
              checkExecute = false;
              if(image !== 'DO NOT ADD') changeMetadata(`./audio/${title}.mp3`, title, artist, album, lyric, `./image/${title}.jpg`, genre);
              else changeMetadata(`./audio/${title}.mp3`, title, artist, album, lyric, '');     
              printLog(percent.slice(length, percent.length), title, artist, cnt); 
              deleteFile('video', title, 'mp4');
              //deleteFile('image', title, 'jpg');
              return clearInterval(check);
            }
          }
      }, 2000);
    }
});



// delete file
function deleteFile(folder, title, extension) {
  fs.unlinkSync(`./${folder}/${title}.${extension}`, (err) => {
    if(err) console.error(err);
    else console.log(`done unliked ./${folder}/${title}.${extension}`);
  });
}

// check folder
function checkCreateFolder () {
  fs.readdir('video', err => {
      if(err) {
        console.error('Create folder for video!!');
        fs.mkdirSync('video');
      }
  });

  fs.readdir('audio', err => {
      if(err) {
        console.error('Create folder for audio!!');
        fs.mkdirSync('audio');
      }
  });

  fs.readdir('image', err => {
    if(err) {
      console.error('Create folder for image!!');
      fs.mkdirSync('image');
    }
  });
}


// find Lyrics
// findLyrics.addEventListener('click', async (e) => {
//     e.preventDefault();
//     let artist = document.querySelector('#artist');
//     let title =  document.querySelector('#title');
//     let lyric =  document.querySelector('#lyric');
//     lyric.value = await lyricsCrawler(title.value, artist.value);
// });
