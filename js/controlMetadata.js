
// 기본적으로 mp3의 메타데이터는 id3라는 메타데이터 포맷을 사용하여 정보를 저장한다
const nodeID3 = require('node-id3');

// add title, artist, album, lyric and image
function changeMetadata(path, title, artist, album, lyric, imagePath, genre) {
    let songTags = {
        title: title,
        artist: artist,
        album: album,
        unsynchronisedLyrics: {
            language: "kor",
            text: lyric,
        },
        image: imagePath,
        genre: genre
    }
    // TODO : 비동기 처리
    // write보다 writeFile이 더 빠르다.. 비동기 처리 못하겠음..
    nodeID3.write(songTags, path, (err) => {
        if(err) console.error(err);
        else console.log('Completed to add metadata');
    });
    if(imagePath !== '') {
        setTimeout(() => {
            let data = nodeID3.read(path);
            fs.writeFile(imagePath, data.image.imageBuffer, 'binary', (err) => {
                if(err) console.error(err);
                else console.log('Completed to add image');
            });
        }, 1500);
    }
}

  
module.exports = changeMetadata;


// ffmpeg에서 제공하는 메타데이터는 ffmetadata로 제어할 수 있다. 근데 가사는 못넣는다
// const ffmetadata = require('ffmetadata');
  // Read song.mp3 metadata
// function changeMetadata(path, title, artist) {
//     console.log("제발~~~");

//     let data = {
//         title: title,
//         artist: artist,
//         unsynchronisedLyrics: artist,
//     };
//     ffmetadata.write(path, data, (err) => {
//         if(err) console.error(err);
//         else {
//             console.log("Completed changed!!");    
//             console.log(data);
//         }
//     });
//     ffmetadata.read(path, (err, data) => {
//         if (err) console.error("Error reading metadata", err);
//         else console.log(data);
//     });
// }

// function changeMetadata(path, title, artist, album, lyric) {
//     return new Promise( (res, rej) => {
//         let data = nodeID3.read(path);
//         console.log(data, data.unsynchronisedLyrics);
//         let songTags = {
//             title: title,
//             artist: artist,
//             album: album,
//             unsynchronisedLyrics: {
//                 language: "kor",
//                 text: lyric,
//             },
//         }
//         nodeID3.write(songTags, path);
//         data = nodeID3.read(path);
//         res(data);
//         console.log(data, data.unsynchronisedLyrics);
//     });
// }
