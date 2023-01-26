let albumArray=[]
var Username = sessionStorage.getItem('Username');
console.log(Username)


let profile=[{username:"hena@xyz.com", profilename:"Hena Aslam" , img:"https://i.pinimg.com/236x/ea/67/8c/ea678cff66b12a1681bfffd449851475.jpg"},
{username:"barry@xyz.com", profilename:"Barry Percy", img:"https://i.pinimg.com/736x/a9/c3/13/a9c313639a995b9fe68481b7f50919d3.jpg"},
{username:"sabin@xyz.com", profilename:"Sabin Andrei", img:"https://i.pinimg.com/564x/a9/60/8d/a9608dcfa7dd419acfddc24c169b01c1.jpg"}
]


const goodMorning=(array)=>{
    let rowNode=document.getElementById("goodmorning")
    let arr=array.slice(5,11)
    rowNode.innerHTML="";
    arr.forEach(element => {
        rowNode.innerHTML+=     `<a href='./album-page.html?id=${element.album.id}'>
        <div class="col">
        <div class="media mb-4" style="position:relative">
        <img src="${element.album.cover_small}"  alt="...">

        <div class="play-btn">
        <div class="triangle"></div>
    </div>

        <div class="media-body">
    <h5 class="mt-3 mb-3 ml-1">${element.title}</h5>
            </div>
            </div>
            </div>
            </a>`

        
    });
   
}


const recentlyPlayed=(array)=>{
    let rowNode=document.getElementById('recentlyplayed')
    let arr=array.slice(0,5)
    rowNode.innerHTML="";
    arr.forEach(element => {
        rowNode.innerHTML+=`
        <div class="col mb-5">
        <div class="card h-100" style="position:relative" >
        <a href='./album-page.html?id=${element.album.id}'>
           <img src="${element.album.cover_medium}" class="card-img-top mt-2 mb-2 px-2" alt="...">
          
           <div class="play-btn d-none d-lg-block">
              <div class="triangle"></div>
          </div>
         
        
           <div class="card-body d-flex flex-column justify-content-center">
              <h5 class="card-title text-white">${element.title}</h5>
             </a>

             <a href='./artist.html?id=${element.artist.id}'>
              <span class="card-text text-white" >${element.artist.name}</span>
              </a>
          
            </div>
        `
    });
 
}
const showstoTry=(array)=>{
    let rowNode=document.getElementById("showstotry")
    rowNode.innerHTML="";
 let arr=array.slice(15,20)
    arr.forEach(element => {
        rowNode.innerHTML+=`
        <div class="col mb-5">
        <div class="card h-100" style="position:relative" >
        <a href='./album-page.html?id=${element.album.id}'>
           <img src="${element.album.cover_medium}" class="card-img-top mt-2 mb-2 px-2" alt="...">
          
           <div class="play-btn d-none d-lg-block">
              <div class="triangle"></div>
          </div>
         
        
           <div class="card-body d-flex flex-column justify-content-center">
              <h5 class="card-title text-white">${element.title}</h5>
             </a>

             <a href='./artist.html?id=${element.artist.id}'>
              <span class="card-text text-white" >${element.artist.name}</span>
              </a>
          
            </div>
          `
    });
 
}



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

window.onload=()=>{
    fetchSongs("rock")
    userInfo()
    logout()
}
let searchDiv;
let searchInput;
const userInfo=()=>{
    let node=document.getElementById("user-info")
    let check;
     if(Username===null){
        Username="Diego 'Ziba' Bababababba"
     }
     else{
         check=profile.find((user)=>(user.username===Username))
        
     }
    node.innerHTML+=`
        <div class="m-3 row search-row d-flex align-items-center ">
            <i class="bi bi-chevron-left mr-2 p-2" onclick="backHistory()" ></i>
            <i class="bi bi-chevron-right ml-2 p-2" onclick="forwardHistory()"></i>
            <div class="input-group mb-3 search-bar hidden" id="search-bar">
                <input type="text" class="form-control search-input" placeholder="Search" aria-label="Username" aria-describedby="basic-addon1">
            </div>
    </div>

    <div class="dropdown">
    <button class="btn btn-secondary dropdown-toggle rounded-pill truncate" type="button" data-toggle="dropdown" aria-expanded="false">
    <img src=${check.img}>
    ${check.profilename}
    </button>
    <div class="dropdown-menu dropdown-menu-right">
      <a class="dropdown-item" href="#">Account</a>
      <a class="dropdown-item" href="#">Profile</a>
      <a class="dropdown-item" href="#">Settings</a>
      <a class="dropdown-item" href="#">Upgrade to Premium</a>
      <a class="dropdown-item" href="#" id="logout">Log out</a>
    </div>
  </div>



   
    `
    searchDiv = document.querySelector('#search-bar');
    searchInput =  document.querySelector(".search-input");
}

const toggleSearch=()=>{
    searchDiv.classList.remove("hidden");
    searchInput.addEventListener("keypress", function(event) {
        // If the user presses the "Enter" key on the keyboard
        if (event.key === "Enter") {
          event.preventDefault();
          console.log(searchInput.value)
          fetchSongs(searchInput.value)
        }
      });
}


//dont need this anymore
// const albumPage=(array)=>{
//     let cards=document.querySelectorAll(".card")
   
//     cards.forEach(card => {
//         card.addEventListener("click",(event)=>{
//             let val=event.target
          
//             let src=val.src

// ${Username}==="null" ? "Diego 'Ziba' Bababababba": ${Username}


const logout=()=>{
    let node=document.querySelector("#logout")
    node.addEventListener("click", ()=>{
        window.location.href="login.html"
    })
}



// const onScroll=()=>{
//     const navbar = document.querySelector("#user-info")
    
//     if (window.scrollY>0) {
//         console.log("hello")
//         navbar.classList.add('user-info');
//       } 
   
// }

// window.onscroll=onScroll()


function backHistory(){
    window.history.back()
}

function forwardHistory(){
    window.history.forward();
}