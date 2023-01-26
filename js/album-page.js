const url="https://striveschool-api.herokuapp.com/api/deezer/album/"

const params = new URLSearchParams(location.search)
const id = params.get("id")
console.log(id)



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
  }
  row.classList.add("selected")
  currentSong=allSongs[index];
  console.log("current song",currentSong)
  createPlayBar();
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
       let tr
       let music=[]
       console.log(music)
       for(i=0;i<artist.tracks.data.length;i++){
          allSongs.push(artist.tracks.data[i]);
        
         tr=document.createElement("tr")
         tr.setAttribute("onclick",`selectRowAlbum(this,${i})`)
         let track=artist.tracks.data[i]
         let duration=track.duration
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
   

        searchQuery=track.artist.id;
        tr.innerHTML=`
        <th scope="row" class="play-list-text">${i+1}</th>
        <td class="white-text no-space-left">${track.title}
       <p class="play-list-text"><a href="artist.html?id=${searchQuery}" style="color:#6c6c6c; text-decoration:none">${track.artist.name}</a></p></td>
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
}

 




window.onload=getAlbum(id)




