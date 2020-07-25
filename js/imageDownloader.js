const fs = require('fs')
const request = require('request');

function imageDownloader(url, path) {
    var requestOptions = { 
        method: "GET" ,
        uri: url,
        headers: { "User-Agent": "Mozilla/5.0" } ,
        encoding: null 
    }; 
    
    request(requestOptions).pipe(fs.createWriteStream(path));
}

module.exports = imageDownloader;


// 일렉트론에서만 안됨.. 왜지??
//const axios = require('axios');
// const fs = require('fs');
// async function imageDownloader(url, path) {
//     const axios = require('axios');
//     const fs = require('fs')
//     const imageDownloader = async (url, path) => {
//         let image = await axios.get(url, {
//             responseType: 'arraybuffer'
//         });
//         fs.writeFileSync(path, image.data);
//     }
//     console.log("Completed");
// }