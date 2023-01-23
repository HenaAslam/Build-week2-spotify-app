const url="https://striveschool-api.herokuapp.com/api/deezer/album/75621062"

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'bf76d79d67mshf215999cb9177a2p1913f6jsn621459513619',
		'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com'
	}
}

const getAlbum= async ()=>{
    try{
  let res= await fetch(url,{options})
  let artist= await res.json()

 if(res.ok){
    
        console.log(artist)
        let section1=document.getElementById("top")
       console.log(artist.title)
       section1.innerHTML=`
       <div class="col-2">
       <img src="${artist.cover}" alt="">
      </div>
      <div class="col-10">
        <p>Album</p>
        <h1>${artist.title}</h1>
        <img src="${artist.cover_small}" alt="">
        <b>${artist.artist.name}</b>
        <small>${artist.release_date}</small>
        <small>${artist.tracks.data.length} songs</small>
        <small>Duration:</small>
      </div>
       `
       let tbody=document.querySelector("tbody")
       let tr
       for(i=0;i<artist.tracks.data.length;i++){
         tr=document.createElement("tr")
        tr.innerHTML=`
        <th scope="row">${i+1}</th>
        <td>${artist.tracks.data[i].title}</td>
        <td>${artist.tracks.data[i].artist.name}</td>
        <td>${artist.tracks.data[i].duration}</td>

        `
        tbody.appendChild(tr)
       }
       tbody.appendChild(tr)
        }

       
 
  }catch(err){
    console.log(err)
  }
}

 




window.onload=getAlbum()