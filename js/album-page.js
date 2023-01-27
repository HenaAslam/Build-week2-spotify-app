const url="https://striveschool-api.herokuapp.com/api/deezer/album/"

const params = new URLSearchParams(location.search)
const id = params.get("id")
console.log(id)

let tr

let allSongs=[]
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'bf76d79d67mshf215999cb9177a2p1913f6jsn621459513619',
		'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com'
	}
}
const selectRowAlbum=(row, index)=>{
  rows = document.getElementsByTagName("tr");
  
  for(let i=0;i<rows.length;i++){
      rows[i].classList.remove("selected");
      try{rows[i].children[1].classList.add("white-text");}
      catch(error){
        console.log(error);
      }
  }
  row.classList.add("selected")
  row.children[1].classList.remove("white-text");
  currentSong=allSongs[index];
  console.log("current song",currentSong)
  createPlayBar();
  playSong();
}
toggleSearch = ()=>{}
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
function timeConvert2(duration){
  var hrs = ~~(duration / 3600);
  var mins = ~~((duration % 3600) / 60);


  var ret = "";

  if (hrs > 0) {
      ret += "" + hrs + " hr " + (mins < 10 ? "0" : "");
  }

  ret += "" + mins+" min";

return ret
}


const getAlbum= async (id)=>{
    try{
  let res= await fetch(url+id,{options})

 if(res.ok){
    let time=0
    let artist= await res.json();
    console.log("artist->",artist);
       let tbody=document.querySelector("tbody")
       
      
       for(i=0;i<artist.tracks.data.length;i++){
          allSongs.push(artist.tracks.data[i]);
        
         tr=document.createElement("tr")
         tr.setAttribute("onclick",`selectRowAlbum(this,${i})`)
         let track=artist.tracks.data[i]
         let duration=track.duration
        allSongs.push(track.preview)
        
         let mins=timeConvert(duration)
        //  tr.onclick=function play(){
        //   let audio=new Audio()
        //   audio.src=track.preview
        //   music.push(audio)
          // music[0].play()
        //   if(music!=[]){
        //     music[0].pause()
        //     music.unshift(audio)  
        //     music[0].play()
        //     console.log(music[0])
        //   }
        //  }
        // let rows;
        // const selectRow=(row, index)=>{
        //     rows = document.getElementsByTagName("tr");
            
        //     for(let i=0;i<rows.length;i++){
        //         rows[i].classList.remove("selected");
        //     }
        //     row.classList.add("selected")
        //     currentSong=allSongs[index];
        //     createPlayBar();
        // }

      //   tr.onclick = (this)=>{
      // for(i=0;i<tr.length;i++){
      //  tr[i].classList.remove("selected")
      // }
      // tr.classList.add("selected")
      // currentSong=allSongs[i]
      // createPlayBar()
      //}

        searchQuery=track.artist.id;
     
        tr.innerHTML=`
        <th scope="row" class="play-list-text">${i+1}</th>
        <td class="white-text no-space-left">
        <div class="d-flex">
        <img class="table-image" src=${track.album.cover_small}>
      <div class="d-flex flex-column"> <span> ${track.title}</span>
       <a href="artist.html?id=${searchQuery}"><p class="play-list-text light-text">${track.artist.name}</p></a>
       </div>
       </div>
       </td>
        <td></td>
        <td class="play-list-text">${mins}</td>

        `
        

      
        console.log(track.preview.duration)
    
  time+=artist.tracks.data[i].duration

        tbody.appendChild(tr)
       }
     
       let albumTime=timeConvert2(time)
       let section1=document.getElementById("section1")
    
       let fullDate=artist.release_date
       let year=fullDate.substring(0,4)
       section1.innerHTML=`
       <div class="col-sm-12 col-md-4 col-lg-2">
       <img class="mt-3" src="${artist.cover_medium}" alt="">
      </div>
      <div class="col-sm-12 col-md-8 col-lg-9">
        <h3 class="white-text">Album</h3>
        <h1 class="white-text">${artist.title}</h1>
        <img class="small" src="${artist.cover_small}" alt="">
       <a href="artist.html?id=${artist.artist.id}"><b>${artist.artist.name}</b></a>
        <small class="play-list-text">•${year}</small>
        <small class="play-list-text">•${artist.tracks.data.length} songs,</small>
        <small class="play-list-text">Duration:${albumTime}</small>
      </div>
       ` 
       console.log(artist.artist.name)

   
  
      }
  }catch(err){
    console.log(err)
  }
  likeBtn()

}


function likeBtn(){
  let node=document.querySelector('svg:nth-of-type(1)')
  let path=node.childNodes[1]
  node.addEventListener("click",()=>{
    
    let attributeValue = path.getAttribute("d");
    if(attributeValue.startsWith("m8")){
      path.setAttribute("d","M4 1c2.21 0 4 1.755 4 3.92C8 2.755 9.79 1 12 1s4 1.755 4 3.92c0 3.263-3.234 4.414-7.608 9.608a.513.513 0 0 1-.784 0C3.234 9.334 0 8.183 0 4.92 0 2.755 1.79 1 4 1z")
   }
    unLikeBtn()
  })
}
function unLikeBtn(){
  let node=document.querySelector('svg:nth-of-type(1)')
  let path=node.childNodes[1]
  node.addEventListener("click",()=>{
 
    let attributeValue = path.getAttribute("d");
    if(attributeValue.startsWith("M4")){
      path.setAttribute("d","m8 6.236-.894-1.789c-.222-.443-.607-1.08-1.152-1.595C5.418 2.345 4.776 2 4 2 2.324 2 1 3.326 1 4.92c0 1.211.554 2.066 1.868 3.37.337.334.721.695 1.146 1.093C5.122 10.423 6.5 11.717 8 13.447c1.5-1.73 2.878-3.024 3.986-4.064.425-.398.81-.76 1.146-1.093C14.446 6.986 15 6.131 15 4.92 15 3.326 13.676 2 12 2c-.777 0-1.418.345-1.954.852-.545.515-.93 1.152-1.152 1.595L8 6.236zm.392 8.292a.513.513 0 0 1-.784 0c-1.601-1.902-3.05-3.262-4.243-4.381C1.3 8.208 0 6.989 0 4.92 0 2.755 1.79 1 4 1c1.6 0 2.719 1.05 3.404 2.008.26.365.458.716.596.992a7.55 7.55 0 0 1 .596-.992C9.281 2.049 10.4 1 12 1c2.21 0 4 1.755 4 3.92 0 2.069-1.3 3.288-3.365 5.227-1.193 1.12-2.642 2.48-4.243 4.38z")
    }
  })
}
 window.onload=getAlbum(id)


