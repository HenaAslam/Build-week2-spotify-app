let currentSong;
let currentSongIndex;
let shuffleAlbumIndex;
let album=[];
let shuffleAlbum=[];
let shuffle = false;
let queueOfSongs=[];
let songIsPlaying=false;
let audio=new Audio()
let currentVolume=0.5
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
    if(shuffle){
        shuffleAlbumIndex+=1;
        currentSong = shuffleAlbum[shuffleAlbumIndex];
        queueOfSongs.push(currentSong);
       
    }else{
        currentSongIndex+=1;
        currentSong = album[currentSongIndex];
        queueOfSongs.push(currentSong);
        console.log(currentSong)
        if(songIsPlaying==true){
        playSong()


        } 
    }
    createPlayBar();
}

previousSong=()=>{
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
            playSong()
            // img.src="./assets/icons/play-circle-fill.svg"

            }
        
        }

    }
    createPlayBar();
}

createPlayBar= ()=>{
    let playBar = document.getElementById("play-bar");
    playBar.innerHTML =`
    <div class="container-fluid">
        <div class="row" id="play-bar-content"></div>
    </div>
    `
    let playBarContent = document.getElementById("play-bar-content");
    playBarContent.innerHTML=`
    <div class="col-3 song-and-artist-play-bar">
        <img src=${currentSong.album.cover_small} id="current-album-cover">
        <div class="">
            <p>${currentSong.title}</p>
            <p class="play-list-text" >${currentSong.artist.name}</p>
        </div>
        <img src="./assets/icons/suit-heart.svg" class="play-bar-icons">
    </div>
    <div class="col-5 middle-of-play-bar">
        <div class="song-icons d-flex justify-content-center">
            <img src="./assets/icons/shuffle.svg" class="play-bar-icons play-bar-icons-big" id="shuffle-icon" onclick="toggleShuffle()">
            <img src="./assets/icons/skip-backward.svg" class="play-bar-icons play-bar-icons-big play" onclick="previousSong()">
            <img src="./assets/icons/play-circle-fill.svg" class="play-bar-icons play-button" onclick="playOrPauseSong(this)">
            <img src="./assets/icons/skip-forward.svg" class="play-bar-icons play-bar-icons-big" onclick="nextSong()">
            <img src="./assets/icons/arrow-counterclockwise.svg" class="play-bar-icons play-bar-icons-big">
        </div>
        <div class="play-line-div">
            <p>0:00</p>
            <div class="play-line"></div>
            <p>${parseInt(currentSong.duration/60)}:${currentSong.duration%60}<p>
        </div>
    </div>
    <div class="col-2 volume align-items-center d-flex right">
        <div>
            <img src="./assets/icons/playlist.png" class="play-bar-icons">
            <img src="./assets/icons/pc-display.svg" class="play-bar-icons">
            <img src="./assets/icons/volume-up.svg" class="play-bar-icons" onclick=muteSound()>
        </div>
        <div class="volume-line"></div>
        
    </div>
`
}

playOrPauseSong= (img)=>{
    if(img.src.includes("/assets/icons/play-circle-fill.svg")){
        img.src="./assets/icons/pause-circle-fill.svg"
    
        playSong()
        
    }else{
       
        img.src="./assets/icons/play-circle-fill.svg"
        pauseSong()
        
    }
}
const playSong=()=>{
    songIsPlaying=true
    audio.src=currentSong.preview
    audio.volume=currentVolume

    audio.play()
   
    // audio.loop()
    s=audio.src
    console.log(s.duration)
}
const pauseSong=()=>{
    songIsPlaying=false
    audio.src=currentSong.preview
   

    audio.pause()
}
const muteSound= ()=>{
    if(currentVolume==0.5){
        audio.src=currentSong.preview
        currentVolume=0
        audio.volume=currentVolume
   console.log(audio.volume)
    
    }else if(currentVolume==0){
        currentVolume=0.5
      audio.volume=currentVolume
      console.log(audio.volume)
      audio.play()
    }
}
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


function shuffleArray(array) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex != 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
}

getSongs();