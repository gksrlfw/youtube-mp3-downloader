const ytdl = require('ytdl-core');
const fs = require('fs');
const ffmpeg = require('fluent-ffmpeg');
const ffmpegPaths = require('ffmpeg-static');

ffmpeg.setFfmpegPath(ffmpegPaths);

var per = [];
// todo: 비동기 처리
const crawler = async (url ,title) => {
    // per = [];
    console.log('downloaer 실행')
    ytdl(url).pipe(fs.createWriteStream(`./video/${title}.mp4`));
    ffmpeg(`./video/${title}.mp4`)
    .toFormat('mp3')
    .on('progress', (progress) => {
      console.log('Processing: '+progress.percent+'% done');
      if(progress.percent)
      per.push(progress.percent);
    })
    .on('end', () => {
      console.log('Done');
    })
    .on('error', (err) => {
        console.log('Errer occured: ' + err.message);
        retry(title, 0);
    })
    .pipe(fs.createWriteStream(`./audio/${title}.mp3`), {end: true})    
}
    

const retry = (title, cnt) => {
    if(cnt>30) return;
    ffmpeg(`./video/${title}.mp4`)
        .toFormat('mp3')
        .on('progress', (progress) => {
          console.log('Processing: '+progress.percent+'% done');
          if(typeof progress.percent == "undefined") retry(title, 0);
          per.push(progress.percent);
        })
        .on('end', () => {
          console.log('Done!!!');
          if(Number(per[per.length-1])<99) retry(title, 0);
        })
        .on('error', (err) => {
            console.log('Errer occured: ' + err.message);
            retry(title, ++cnt);
        })
        .pipe(fs.createWriteStream(`./audio/${title}.mp3`), {end: true})    
}

function checkError(per) {
  for(let i=per.length-1; i>=per.length-4; i--) {
    if(per[i]!==per[i-1]) return false;
  }
  return true;
}

function checkError2(per, ans) {
  return per[per.length-1] === ans;
}
module.exports = { crawler: crawler, per: per };