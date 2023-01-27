let currentSong;
let currentSongIndex;
let shuffleAlbumIndex;
let album=[];
let shuffleAlbum=[];
let shuffle = false;
let queueOfSongs=[];
let songIsPlaying=false;
let audio=new Audio()
let play=document.querySelectorAll("#play")

let currentVolume=0
let isPaused = false;
let sec=0




let playUrl="https://striveschool-api.herokuapp.com/api/deezer/search?q=pink+floyd"


getSongs = async()=>{
    try{
        let res = await fetch(playUrl, {
            method: 'GET',
        })
        if(res.ok){
            res = await res.json();
            currentSong=res.data[0];
            currentSongIndex = 0;
            album = res.data;
            console.log(album[0].preview)
            
            createPlayBar();
        }
    }catch(error){
        console.log(error);
    }
}


nextSong=()=>{
    sec=0

    if(shuffle){
        shuffleAlbumIndex+=1;
        currentSong = shuffleAlbum[shuffleAlbumIndex];
        queueOfSongs.push(currentSong);
       
    }else{
        currentSongIndex+=1;
        currentSong = album[currentSongIndex];
        queueOfSongs.push(currentSong);
   
        let cover=document.getElementById("current-album-cover")
      
        if(songIsPlaying==true){
       
      playSong()
      playOrPauseSong(`<img src="./assets/icons/play-circle-fill.svg>` )
setVolume()
console.log(currentSong.album.cover_small)

        } 
    }
    createPlayBar();
}

previousSong=()=>{
    sec=0
    if(shuffle){
        if(queueOfSongs.length===0){}
        else{
            shuffleAlbumIndex-=1;
            currentSong = queueOfSongs[queueOfSongs.length-1];
            queueOfSongs.pop();
           
        }
    }else{
        if(currentSongIndex===0){}
        else{
            currentSongIndex-=1;
            currentSong = album[currentSongIndex];
            queueOfSongs.pop();
            if(songIsPlaying==true){
                sec=0
            playSong()
            playOrPauseSong(`<img src="./assets/icons/play-circle-fill.svg>` )
        
            }
        
        }

    }
    createPlayBar();
}
function timeConvert(duration){
    var hrs = ~~(duration / 3600);
    var mins = ~~((duration % 3600) / 60);
    var secs = ~~duration % 60;
  
    var ret = "";
  
    if (hrs > 0) {
        ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
    }
  
    ret += "" + mins + ":" + (secs < 10 ? "0" : "");
    ret += "" + secs;
  return ret
  }
createPlayBar= ()=>{
    let playBar = document.getElementById("play-bar");
   let length=currentSong.duration
 let timed= timeConvert(length)
    playBar.innerHTML =`
    <div class="container-fluid">
        <div class="row" id="play-bar-content"></div>
    </div>
    `
    let playBarContent = document.getElementById("play-bar-content");
    playBarContent.innerHTML=`
    <div class="col-3 song-and-artist-play-bar">
        <img src=${currentSong.album.cover_small} id="current-album-cover">
        <div class="song-and-artist-play">
            <p class="current-song-text">${currentSong.title}</p>
            <p class="current-artist-text play-list-text" >${currentSong.artist.name}</p>
        </div>
        <img src="./assets/icons/suit-heart.svg" class="play-bar-icons heart-down">
    </div>
    <div class="col-5 middle-of-play-bar">
        <div class="song-icons d-flex justify-content-center">
            <img src="./assets/icons/shuffle.svg" class="play-bar-icons play-bar-icons-big" id="shuffle-icon" onclick="toggleShuffle()">
            <img src="./assets/icons/skip-backward.svg" class="play-bar-icons play-bar-icons-big play" onclick="previousSong(this)">
            <img src="./assets/icons/play-circle-fill.svg" class="play-bar-icons play-button" id="play" onclick="playOrPauseSong(this)">
            <img src="./assets/icons/skip-forward.svg" class="play-bar-icons play-bar-icons-big" onclick="nextSong(this)">
            <img src="./assets/icons/arrow-counterclockwise.svg" class="play-bar-icons play-bar-icons-big" onclick="reset()">
        </div>
        <div class="play-line-div">
            <p>0:00</p>
            <input class="volume-line" type="range" min="0" max="30" value="0" id="volume-line" onchange="changeTime()">

            <p>${timed}<p>
        </div>
    </div>
    <div class="col-2 volume align-items-center d-flex right">
        <div>
            <img src="./assets/icons/playlist.png" class="play-bar-icons">
            <img src="./assets/icons/pc-display.svg" class="play-bar-icons">
            <img src="./assets/icons/volume-up.svg" class="play-bar-icons" onclick=muteSound()>
        </div>
        <input class="volume-line" type="range" min="0" max="100" value="50" id="slider" onchange="setVolume()">
        
    </div>
`
}

playOrPauseSong= (img)=>{
    if(img.src.includes("/assets/icons/play-circle-fill.svg")){
        img.src="./assets/icons/pause-circle-fill.svg"
    isPaused=false
        playSong()
        setVolume()
        count()
     
    }else{
       
        img.src="./assets/icons/play-circle-fill.svg"
        pauseSong()
        
    }
}
const playSong=()=>{
    songIsPlaying=true
    audio.src=currentSong.preview
    
    audio.currentTime=sec
  
    
    isPaused = false
    
if(audio.currentTime!==0){
     audio.play()

}else{
    audio.play()
}
  
}
const pauseSong=()=>{
    songIsPlaying=false
    audio.src=currentSong.preview
    isPaused = true
    audio.volume=currentVolume
    
    audio.pause()
    
    console.log(audio.currentTime)
}

function count(){
   
    let time=document.querySelector(".play-line-div p")
   

   const timer = setInterval(function() {
        if(!isPaused) {
            if(sec<30){
            sec++;
            time.innerText =`` +timeConvert(sec);
            let line=document.getElementById("volume-line")
            line.value=sec
          
        } else{
            clearInterval(timer)
            console.log("kj")
        }
}}, 1000)
   
} 

function setVolume(){
    let volume=document.querySelector("#slider")

    currentVolume=volume.value/100
    audio.volume=currentVolume
    console.log(currentVolume)
} 

function reset(){

 sec=0
 audio.currentTime=sec
}

function changeTime(){
    let line=document.getElementById("volume-line")
    let sliderPostion=line.value
    sec=sliderPostion
    audio.currentTime=sec
    console.log(sec)

}


// const muteSound= ()=>{
//     if(currentVolume==0.5){
//         audio.src=currentSong.preview
//         currentVolume=0
//         audio.volume=currentVolume
//    console.log(audio.volume)
    
//     }else if(currentVolume==0){
//         currentVolume=0.5
//       audio.volume=currentVolume
     
//       console.log(audio.volume)
    
//     }
// }
toggleShuffle=()=>{
    let shuffleIcon= document.getElementById("shuffle-icon");
    if(shuffle){
        shuffle=false;
        shuffleIcon.classList.remove("shuffle-on")
    }else{
        shuffleAlbum=shuffleArray(album);
        shuffle=true;
        shuffleIcon.classList.add("shuffle-on")
    }
}

shuffleArray = ()=>{
    shuffleAlbum();
}
changeTime()
setVolume()
console.log(currentVolume)
getSongs();