let albumArray=[]


const goodMorning=(array)=>{
    let rowNode=document.getElementById("goodmorning")
    let arr=array.slice(5,15)
    arr.forEach(element => {
        rowNode.innerHTML+=     `<a href='./referencetopassalbumid.html?id=${element.album.id}'>
        <div class="col">
        <div class="media mb-4" >
        <img src="${element.album.cover_small}"  alt="...">
        <div class="media-body ">
    <h5 class="mt-3 mb-3 ml-1 ">${element.title}</h5>
            </div>
            </div>
            </div>
            </a>`

        
    });
   
}


const recentlyPlayed=(array)=>{
    let rowNode=document.getElementById('recentlyplayed')
    let arr=array.slice(0,5)
    arr.forEach(element => {
        rowNode.innerHTML+=`
        <div class="col mb-5">
        <div class="card h-100" style="position:relative" >
        <a href='./referencetopassalbumid.html?id=${element.album.id}'>
           <img src="${element.album.cover_medium}" class="card-img-top mt-2 mb-2 px-2" alt="...">
          
           <div class="play-btn d-none d-lg-block">
              <div class="triangle"></div>
          </div>
         
        
           <div class="card-body d-flex flex-column justify-content-center">
              <h5 class="card-title text-white">${element.title}</h5>
             </a>

             <a href='./referencetopassartistid.html?id=${element.artist.id}'>
              <span class="card-text text-white" >${element.artist.name}</span>
              </a>
          
            </div>
          </div>
          </div>
          </a>
          `
    });
 
}
const showstoTry=(array)=>{
    let rowNode=document.getElementById("showstotry")
 let arr=array.slice(15,20)
    arr.forEach(element => {
        rowNode.innerHTML+=`
        <div class="col mb-5">
        <div class="card h-100" style="position:relative" >
        <a href='./referencetopassalbumid.html?id=${element.album.id}'>
           <img src="${element.album.cover_medium}" class="card-img-top mt-2 mb-2 px-2" alt="...">
          
           <div class="play-btn d-none d-lg-block">
              <div class="triangle"></div>
          </div>
         
        
           <div class="card-body d-flex flex-column justify-content-center">
              <h5 class="card-title text-white">${element.title}</h5>
             </a>

             <a href='./referencetopassartistid.html?id=${element.artist.id}'>
              <span class="card-text text-white" >${element.artist.name}</span>
              </a>
          
            </div>
          </div>
          </div>
          </a>
          `
    });
 
}
// 

//     arr.forEach(element => {
//         rowNode.innerHTML+=`<a href='./referencetopassalbumid.html?id=${element.album.id}'>
//         <div class="col pb-0  mb-0">
//         <div class="card pb-5" style="position:relative" >
//            <img src="${element.album.cover_medium}" class="card-img-top mt-2 mb-2 px-2 pb-5" alt="...">
//            <div class="play-btn d-none d-lg-block">
//               <div class="triangle"></div>
//           </div>
//            <div class="card-body d-flex flex-column justify-content-center">
//               <h5 class="card-title">${element.title}</h5>
             
//               <span class="card-text">${element.artist.name}</span>
              
          
//             </div>
//           </div>
//           </div>
//           </a>
//           `
//     });
 
// }

  
   



const fetchSongs=(search)=>{

    fetch('https://striveschool-api.herokuapp.com/api/deezer/search?q='+search)
	.then(response => response.json())
	.then((jsonResponse) => {
        const {data}=jsonResponse
        albumArray=data
        console.log(albumArray)
        recentlyPlayed(data)
        goodMorning(data)
        showstoTry(data)

    }
    )
	.catch(err => console.error(err));
}


fetchSongs("rock")


const userInfo=()=>{
    let node=document.getElementById("user-info")
    node.innerHTML+=`<div class="arrows">
                <i class="bi bi-chevron-left mr-2" ></i>
                <i class="bi bi-chevron-right ml-2" ></i>
    </div>
    <span class="badge badge-pill badge-dark truncate pt-1" >
    <img src="https://pbs.twimg.com/media/EFIv5HzUcAAdjhl.png">
    Diego 'ziba' Babababaa    </span>
    `
}
userInfo()
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
