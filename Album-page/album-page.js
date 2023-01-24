const url="https://striveschool-api.herokuapp.com/api/deezer/album/"

const params = new URLSearchParams(location.search)
const id = params.get("id")
console.log(id)


console.log(id)
let allSongs=[]
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'bf76d79d67mshf215999cb9177a2p1913f6jsn621459513619',
		'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com'
	}
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


const getAlbum= async (albumID=id)=>{
    try{
  let res= await fetch(url+albumID,{options})
  let artist= await res.json()

 if(res.ok){
    let time=0
        console.log(artist)
      
       let tbody=document.querySelector("tbody")
       let tr
       for(i=0;i<artist.tracks.data.length;i++){
       
        let musicPlaying=[]
         tr=document.createElement("tr")
         
         let track=artist.tracks.data[i]
         let duration=track.duration
         let mins=timeConvert(duration)
         tr.onclick=function play(){
          let audio=new Audio()
          audio.src=track.preview
          audio.play()
          
         
        }
        tr.innerHTML=`
        <th scope="row" class="play-list-text">${i+1}</th>
        <td class="white-text no-space-left">${track.title}
        <p class="play-list-text">${track.artist.name}</p></td>
        <td></td>
        <td class="play-list-text">${mins}</td>

        `
        allSongs.push(track.preview)
        console.log(allSongs)
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
        <b>${artist.artist.name}</b>
        <small class="play-list-text">•${year}</small>
        <small class="play-list-text">•${artist.tracks.data.length} songs,</small>
        <small class="play-list-text">Duration:${albumTime}</small>
      </div>
       ` 
   
  
      }
  }catch(err){
    console.log(err)
  }
}

 




window.onload=getAlbum(id)