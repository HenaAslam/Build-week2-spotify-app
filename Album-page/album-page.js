const url="https://striveschool-api.herokuapp.com/api/deezer/album/75621062"

const queryString = window.location.search
const urlParams = new URLSearchParams(queryString)
console.log(urlParams)
const id = urlParams.get("id")
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


const getAlbum= async ()=>{
    try{
  let res= await fetch(url,{options})
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
          if(musicPlaying=[]){
          musicPlaying.push(audio)
          musicPlaying[0].play()
          console.log(musicPlaying)
         } else if(musicPlaying!=[]){
          musicPlaying[0].pause()
        
          musicPlaying.splice(0,audio)
        
          musicPlaying[0].play()
          console.log(musicPlaying)

          
         }
          
         
        }
     
        
        tr.innerHTML=`
        <th scope="row">${i+1}</th>
        <td >${track.title}
        <p>${track.artist.name}</p></td>
        <td></td>
        <td>${mins}</td>

        `
        allSongs.push(track.preview)

  time+=artist.tracks.data[i].duration

        tbody.appendChild(tr)
       }
       console.log(allSongs)
       let albumTime=timeConvert2(time)
       let section1=document.getElementById("top")
    
       let fullDate=artist.release_date
       let year=fullDate.substring(0,4)
       section1.innerHTML=`
       <div class="col-3">
       <img class="mx-5 mt-3 img-fluid" src="${artist.cover_medium}" alt="">
      </div>
      <div class="col-9 mt-5">
        <h3>Album</h3>
        <h1>${artist.title}</h1>
        <img src="${artist.cover_small}" alt="">
        <b>${artist.artist.name}</b>
        <small>•${year}</small>
        <small>•${artist.tracks.data.length} songs,</small>
        <small>Duration:${albumTime}</small>
      </div>
       `
   
        }

       
 
  }catch(err){
    console.log(err)
  }
}

 




window.onload=getAlbum()