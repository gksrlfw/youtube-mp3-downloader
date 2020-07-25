const fs = require('fs');
const util = require('util');
const async = require('async');

const downloader = require('./js/downloader');
const changeMetadata = require('./js/controlMetadata');
const imageDownloader = require('./js/imageDownloader');



checkCreateFolder();

let convert = document.querySelector('#convert');
convert.addEventListener('click', async (e) => {
    e.preventDefault();
    let url = document.querySelector('#url');
    let artist = document.querySelector('#artist');
    let title =  document.querySelector('#title');
    let album =  document.querySelector('#album');
    let image =  document.querySelector('#image');
    let lyric =  document.querySelector('#lyric');

    url.value = 'https://www.youtube.com/watch?v=B9kmcigMv-M&list=RDB9kmcigMv-M&start_radio=1&t=0';
    artist.value = 'Wildson';
    title.value = 'I Am Better Off';
    album.value = 'none';
    image.value = 'https://i.ytimg.com/vi/B9kmcigMv-M/hqdefault.jpg';
    lyric.value = `When I think about the way we used to be
    When I think about the things you took from me
    I know that I am so much better
    Better off
    When I look at what I've done, now that we're apart
    When I look at what I've won, I've come so far
    I know I'm so much better off and baby you don't belong
    I could feel it in my bones
    There was something going on
    That shade of doubt
    Hangin' round
    Got old
    'Cause darling there is nothing right
    When all you seem to do is lie
    Those days are gone
    I'm walking tall
    While you're alone
    When I think about the way we used to be
    When I think about the things you took from me
    I know that I am so much better
    Better off
    When I look at what I've done, now that we're apart
    When I look at what I've won, I've come so far
    I know I'm so much better off and baby you don't belong
    Your love was cold
    Heart made of stone
    But I'm just fine
    I'm gonna shine
    I'm alright, alright, alright
    I'm celebrating
    My liberation
    I'm moving strong
    I'm moving on
    I'm alright, alright, alright
    Might be shaken, but not stirred
    Just a lesson that I've learned
    And so it goes tables turn, and you're on your own
    When I think about the way
    When I think about the way we used to be
    When I think about the things you took from me
    I know that I am so much better
    Better off
    When I look at what I've done, now that we're apart
    When I look at what I've won, I've come so far
    I know I'm so much better off and baby you don't belong
    When I think about the way, when I think about the way we used to be
    When I think about the things you took from me
    I know that I'm so much better
    Better off
    When I look at what I've done, now that we're apart
    When I look at what I've won, I've come so far
    I know I'm so much better off and baby you don't belong`
    
      
    await downloader(url.value, title.value).then((result) => {
      console.log(result);
    })
    // downloader가 완료된 후에 실행되어야 한다
    changeMetadata(`./audio/${title.value}.mp3`, title.value, artist.value, album.value, lyric.value);
    imageDownloader(image.value, `./image/${title.value}.jpg`);
    
    // url.value = '';
    // artist.value = '';
    // title.value = '';
    // album.value = '';
    // image.value = '';
    // lyric.value = '';
    // url.focus();

});


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


