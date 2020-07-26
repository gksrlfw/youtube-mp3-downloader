const fs = require('fs')
const request = require('request');

// todo: 비동기 처리
function imageDownloader(url, path) {
    var requestOptions = { 
        method: "GET" ,
        uri: url,
        headers: { "User-Agent": "Mozilla/5.0" } ,
        encoding: null 
    }; 
    
    request(requestOptions).pipe(fs.createWriteStream(path));
}

// function imageDownloader(url, path) {
//     return new Promise( (resolve, reject) => {
//         var requestOptions = { 
//             method: "GET" ,
//             uri: url,
//             headers: { "User-Agent": "Mozilla/5.0" } ,
//             encoding: null 
//         }; 
        
//         request(requestOptions).pipe(fs.createWriteStream(path))
//         .on('finish', (err) => {
//             if(err) console.error(err);
//             else resolve('Done image crawling!!');
//         })
//     });
    
// }



// 일렉트론에서만 안됨.. 왜지??
// const axios = require('axios');
// const fs = require('fs');

// const imageDownloader = async (url, path) => {
//     let image = await axios.get(url, {
//         responseType: 'arraybuffer'
//     });
//     fs.writeFileSync(path, image.data);
// }

module.exports = imageDownloader;