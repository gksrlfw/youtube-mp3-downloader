
// music player
const musicTitle = document.querySelector('#music-title');
const imageTitle = document.querySelector('#image-title');
const list = document.querySelector('.list');
const PLAY = "./playerImage/Play.png";
const PRE = "./playerImage/Pre.png";
const NEXT = "./playerImage/Next.png";
const PAUSE = "./playerImage/pause.png";

// audio 폴더에 들어있는 노래를 list에 추가한다
const addList = () => {
    let musicLists = [];
    fs.readdir('./audio/', (err, musicList) => {
        if(err) console.error(err);
        else {
            musicList.forEach((music, i) => {
                musicLists.push(music);
                const li = document.createElement('li');
                li.textContent = music;
                list.appendChild(li);
            });
        }
    });
    return musicLists;
}

const musicPlayer = () => {

    // TODO : 비동기 처리
    let musicLists = addList();     // title.mp3
    let title;
    let imageLists;
    setTimeout(() => {
        musicLists = musicLists.map((v, i) => { return `./audio/${v}`; });          // ./audio/title.mp3
        title = musicLists.map((v, i) => { return v.split('/')[2].split('.')[0] }); // title
        imageLists = title.map((v, i) => { return `./image/${v}.jpg`; });

        let play_btn = document.querySelector("#play");
        let prev_btn = document.querySelector("#pre");
        let next_btn = document.querySelector("#next");
        let range = document.querySelector("#range");
        let play_img = document.querySelector("#play_img");
        let time = document.querySelector(".time");

        let currentTime = 0;
        let isPlaying = false;
        let song = new Audio();
        let currentMusic = 0;

        song.src = musicLists[currentMusic];
        musicTitle.textContent = title[currentMusic];
        
        // TODO : 배열에서 확인하는게 아니라 폴더를 확인해서 해당 사진이 있는지 없는지 확인해야 할듯.. 근데 그러면 또 비동기 처리해야되네..
        if(imageLists.includes(`./image/${title[currentMusic]}.jpg`)) imageTitle.src = `./image/${title[currentMusic]}.jpg`;
        else imageTitle.src = "https://i.pinimg.com/originals/b4/75/00/b4750046d94fed05d00dd849aa5f0ab7.jpg";
        highlight(title[currentMusic], musicLists, currentMusic);

        // 리스트를 클릭하면 해당 노래를 실행한다
        const allLists = document.querySelectorAll('li');
        allLists.forEach((li) => {
            li.addEventListener('click', (e) => {
                let targetTitle = e.target.textContent;
                song.src = `./audio/${targetTitle}`;
                musicTitle.textContent = targetTitle.split('.')[0];
                if(imageLists.includes(`./image/${musicTitle.textContent}.jpg`)) imageTitle.src = `./image/${musicTitle.textContent}.jpg`;
                else imageTitle.src = "https://i.pinimg.com/originals/b4/75/00/b4750046d94fed05d00dd849aa5f0ab7.jpg";
                highlight(musicTitle.textContent);
                song.play();
                isPlaying = true;
                currentMusic = title.indexOf(targetTitle.split('.')[0]);    // currentMusic에 클릭한 노래의 인덱스를 넣는다
                // TODO : song의 메타정보가 로딩이 안되서 이게 안먹힘;;;... 일단 이렇게 하자
                setTimeout(() => {
                    range.max = song.duration;
                }, 1000);
                play_img.src = PAUSE;
            });
        });

        // << 버튼을 클릭할 때
        prev_btn.addEventListener('click', () => {
            if(currentMusic === 0) currentMusic = musicLists.length;
            song.src = musicLists[--currentMusic];
            musicTitle.textContent = title[currentMusic];
            if(imageLists.includes(`./image/${title[currentMusic]}.jpg`)) imageTitle.src = `./image/${title[currentMusic]}.jpg`;
            else imageTitle.src = "https://i.pinimg.com/originals/b4/75/00/b4750046d94fed05d00dd849aa5f0ab7.jpg";   
            highlight(title[currentMusic]);
            song.play();
            isPlaying = true;
            range.max = song.duration;
            play_img.src = PAUSE;
        });

        // >> 버튼을 클릭할 때
        next_btn.addEventListener('click', () => {
            if(currentMusic === musicLists.length-1) currentMusic = -1;
            song.src = musicLists[++currentMusic];
            musicTitle.textContent = title[currentMusic];
            if(imageLists.includes(`./image/${title[currentMusic]}.jpg`)) imageTitle.src = `./image/${title[currentMusic]}.jpg`;
            else imageTitle.src = "https://i.pinimg.com/originals/b4/75/00/b4750046d94fed05d00dd849aa5f0ab7.jpg";
            highlight(title[currentMusic]);
            song.play();
            isPlaying = true;
            range.max = song.duration;
            play_img.src = PAUSE
        });

        // play 버튼을 클릭할 때 -> 노래가 종료되었을 때의 설정도 같이 해주어야 한다
        play_btn.addEventListener('click', () => {
            if(!isPlaying) {
                song.play();
                isPlaying = true;
                range.max = song.duration;
                play_img.src = PAUSE;
                console.log(song,song.duration);
            }
            else {
                song.pause();
                isPlaying = false;
                play_img.src = PLAY;
            }
        });
        song.addEventListener('ended', () => {
            song.currentTime = 0
            song.pause();
            isPlaying = false;
            range.value = 0;
            // play_img.src = PLAY;
            if(currentMusic === musicLists.length-1) currentMusic = -1;
            song.src = musicLists[++currentMusic];
            musicTitle.textContent = title[currentMusic];
            if(imageLists.includes(`./image/${title[currentMusic]}.jpg`)) imageTitle.src = `./image/${title[currentMusic]}.jpg`;
            else imageTitle.src = "https://i.pinimg.com/originals/b4/75/00/b4750046d94fed05d00dd849aa5f0ab7.jpg";
            highlight(title[currentMusic]);
            song.play();
            isPlaying = true;
            play_img.src = PAUSE;
            setTimeout(() => {
                range.max = song.duration;                
            }, 1000);
        });
        song.addEventListener('timeupdate', () => {
            range.value = song.currentTime;
            currentTime = Math.floor(song.currentTime);
            let currentMin = Math.floor(currentTime/60);
            let currentSec = currentTime%60;
            time.textContent = `${currentMin} : ${currentSec}`;
        });
        range.addEventListener('change', () => {
            song.currentTime = range.value;
        });
    }, 1000);
}

// 실행중인 노래에 색칠해준다
const highlight = (title) => {
    title = `${title}.mp3`;
    const allLists = document.querySelectorAll('li');
    allLists.forEach((el, i) => {
        if(el.textContent === title) {
            el.style.backgroundColor = "yellow";
            return;
        }
        if(el.style.backgroundColor) el.removeAttribute("style");
    });
}
module.exports = musicPlayer;