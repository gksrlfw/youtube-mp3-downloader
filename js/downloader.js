const ytdl = require('ytdl-core');
const fs = require('fs');
const ffmpeg = require('fluent-ffmpeg');
const ffmpegPaths = require('ffmpeg-static');
ffmpeg.setFfmpegPath(ffmpegPaths);


const crawler = (url ,title) => {
  return new Promise( (resolve, reject) => {
    ytdl(url).pipe(fs.createWriteStream(`./video/${title}.mp4`));
    ffmpeg(`./video/${title}.mp4`)
    .toFormat('mp3')
    .on('progress', (progress) => {
      console.log('Processing: '+progress.percent+'% done');
    })
    .on('end', () => {
      resolve('on Done');
      // console.log('Completed');
    })
    .on('error', (err) => {
        console.log('Errer occured: ' + err.message);
        retry(title, 0);
    })
    .pipe(fs.createWriteStream(`./audio/${title}.mp3`), {end: true})
  });
}

const retry = (title, cnt) => {
    return new Promise( (resolve, reject) => {
      if(cnt>30) reject("Error occured: tried over 30 times");
      ffmpeg(`./video/${title}.mp4`)
      .toFormat('mp3')
      .on('progress', (progress) => {
        console.log('Processing: '+progress.percent+'% done');
      })
      .on('end', () => {
        resolve('on Done');
        // console.log('Completed');
        
      })
      .on('error', (err) => {
          console.log('Errer occured: ' + err.message);
          retry(title, 0);
      })
      .pipe(fs.createWriteStream(`./audio/${title}.mp3`), {end: true})
    });
}

// promise로 바꾸기 전
// const crawler = (url ,title) => {
//     ytdl(url).pipe(fs.createWriteStream(`./video/${title}.mp4`));
//     ffmpeg(`./video/${title}.mp4`)
//     .toFormat('mp3')
//     .on('progress', (progress) => {
//       console.log('Processing: '+progress.percent+'% done');
//     })
//     .on('end', () => {
//       console.log('Done');
//       return;
//     })
//     .on('error', (err) => {
//         console.log('Errer occured: ' + err.message);
//         retry(title, 0);
//     })
//     .pipe(fs.createWriteStream(`./audio/${title}.mp3`), {end: true})    
//     // .save(`./video/${title}.mp3`)
// }
    

// function retry(title, cnt) {
//     if(cnt>30) return;
//     ffmpeg(`./video/${title}.mp4`)
//         .toFormat('mp3')
//         .on('progress', (progress) => {
//           console.log('Processing: '+progress.percent+'% done');
//         })
//         .on('end', () => {
//           console.log('Done');
//         })
//         .on('error', (err) => {
//             console.log('Errer occured: ' + err.message);
//             retry(title, ++cnt);
//         })
//         .pipe(fs.createWriteStream(`./audio/${title}.mp3`), {end: true})    
//         // .save(`./video/${title}.mp3`)
// }


module.exports = crawler;