//const url="https://striveschool-api.herokuapp.com/api/deezer/search?q="



const renderAlbums=(arrayOfAlbums)=>{
let rawNode=document.getElementById('recentlyplayed')
for(let i=0;1<=8;i++){
    rawNode.innerHTML="hello"
//     rawNode.innerHTML+=`<div class="card" >
//     <img src="" class="card-img-top" alt="...">
//     <div class="card-body">
//       <h5 class="card-title">Card title</h5>
//       <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
//       <a href="#" class="btn btn-primary">Go somewhere</a>
//     </div>
//   </div>`
}

}
const fetchSongs=()=>{


    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '1a0e486a8emshc09f82e64512603p1d21fbjsnd674ceee0cc4',
            'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com'
        }
    };

    

    fetch('https://striveschool-api.herokuapp.com/api/deezer/album/75621062',options)
	.then(response => response.json())
	.then((jsonResponse) => {
        console.log(jsonResponse)
        renderAlbums()
        
    }
    )
	.catch(err => console.error(err));
}


fetchSongs()
