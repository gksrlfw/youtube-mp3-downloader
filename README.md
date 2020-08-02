# youtube-mp3-downloader

(해당 프로그램은 학습 목적으로 구현하였습니다. 만일 법적으로 문제의 소지가 있을 경우 알려주세요::)

유튜브 동영상을 이용하여 TITLE, ARTIST, ALBUM, LYRICS 등의 기타 메타 데이터를 포함하는 MP3 파일을 다운로드 받는 프로그램입니다.


## 사용법

1. 해당 프로그램을 다운받은 후, install 명령어를 통해 필요한 패키지를 다운로드 합니다.
```
npm install
```

2. start 명령어를 이용하여 프로그램을 실행합니다.
```
npm start
```

3. 아래와 같이 본인이 MP3로 변환하길 원하는 동영상의 url을 첨부하고 추가로 작성하고 싶은 기타 정보들을 적어줍니다.
(title, artist를 작성한 후, SEARCH 버튼을 이용하면 image url을 제외한 정보들이 자동으로 채워집니다. 해당 정보는 google에서 검색하였을 때 가장 먼저 나오는 동영상과 정보를 이용합니다)

4. convert 버튼을 누르면 변환이 됩니다.


## MP3 플레이어

PLAYER 버튼을 누르면 본인의 AUDIO 폴더안에 있는 MP3 파일들을 확인할 수 있으며, 플레이 역시 가능합니다.


## 참고
[MP3 플레이어의 소스코드 참고](https://doctorcodetutorial.blogspot.com/2020/04/make-custom-music-player-in-javascript.html)
