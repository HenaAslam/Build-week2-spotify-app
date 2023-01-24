

let albumArray=[]



const recentlyPlayed=(array)=>{
    let rowNode=document.getElementById('recentlyplayed')
    let arr=array.slice(0,5)
    

    arr.forEach(element => {
        rowNode.innerHTML+=`<a href='./referencetopassalbumid.html?id=${element.album.id}'
        <div class="col mb-2 mb-md-1">
        <div class="card" style="position:relative">
           <img src="${element.album.cover_medium}" class="card-img-top mt-2 mb-2 px-2" alt="...">
           <div class="play-btn">
              <div class="triangle"></div>
          </div>
           <div class="card-body" >
              <h5 class="card-title">${element.title}</h5>
              
          
            </div>
          </div>
          </div>
          </a>`
    });
    

        
   
    }


const goodMorning=(array)=>{
    let rowNode=document.getElementById("goodmorning")
    let arr=array.slice(5,15)
    arr.forEach(element => {
        rowNode.innerHTML+=     `<a href='./album.html?id=${element.album.id}'
        <div class="col">
        <div class="media mb-3" style="position:relative">
  <img src="${element.album.cover_small}"  alt="...">
  <div class="play-btn-media">
  <div class="triangle-media"></div>
</div>
  <div class="media-body ">
    <h5 class="mt-3 mb-3 ml-1">${element.title}</h5>
    
    
  </div>
</div>
        </div>
        </a>`

        
    });
   
}

const showstoTry=(array)=>{
    let rowNode=document.getElementById("showstotry")
    let arr=array.slice(15,20)
    arr.forEach(element => {
        rowNode.innerHTML+=`<a href='./album.html?id=${element.album.id}'
        <div class="col mb-2 mb-md-1">
        <div class="card" style="position:relative" >
           <img src="${element.album.cover_medium}" class="card-img-top mt-2 mb-2 px-2" alt="...">
           <div class="play-btn">
              <div class="triangle"></div>
            </div>
           <div class="card-body" >
              <h5 class="card-title">${element.title}</h5>
               
              
          </div>
          
          </div>
          </a>`
    });
    
}
const fetchSongs=(search)=>{


    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '1a0e486a8emshc09f82e64512603p1d21fbjsnd674ceee0cc4',
            'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com'
        }
    };

    

    fetch('https://striveschool-api.herokuapp.com/api/deezer/search?q='+search,options)
	.then(response => response.json())
	.then((jsonResponse) => {
        const {data}=jsonResponse
        albumArray=data
        console.log(data)
        recentlyPlayed(data)
        goodMorning(data)
        showstoTry(data)
       // albumPage(data)
    }
    )
	.catch(err => console.error(err));
}


fetchSongs("queen")




//dont need this anymore
// const albumPage=(array)=>{
//     let cards=document.querySelectorAll(".card")
   
//     cards.forEach(card => {
//         card.addEventListener("click",(event)=>{
//             let val=event.target
          
//             let src=val.src

//             let findAlbumId = albumArray.find((albumItem) =>
//             albumItem.album.cover_medium===src
           
//           )
//           console.log(findAlbumId.id)
//         })
      
//     });
    
// }
