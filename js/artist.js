let currentURL = document.URL;
let artistURL = "https://striveschool-api.herokuapp.com/api/deezer/artist/"
let artistId = location.search.slice(2);
const searchUrl="https://striveschool-api.herokuapp.com/api/deezer/search?q="
let searchQuery;
//const params = new URLSearchParams(location.search);
let topAlbums = [];
let topAlbumsTitles=[];

const getArtistData = async()=>{
    try {
        let res = await fetch(artistURL+artistId)
        if(res.ok){
            res = await res.json();
            console.log(res);
            let artistName=res.name;
            artistName = artistName.replaceAll(' ', '+')
            searchQuery=artistName.toLowerCase();
            getArtist()
        }
    }catch(error){
        console.log(error);
    }
}
const getArtist = async()=>{
    try{
        let res = await fetch(searchUrl+searchQuery, {
            method: 'GET',
        })
        if(res.ok){
            res = await res.json();
            console.log(res.data);
            getTopAlbums(res.data)
            renderPage(res.data);
        }
    }catch(error){
        console.log(error);
    }
}

const getTopAlbums=(songs)=>{
    songs.forEach(song =>{
        if(topAlbumsTitles.indexOf(song.album.title)===-1){
            topAlbums.push({
                title:song.album.title,
                image:song.album.cover_medium,
                artist:song.artist.name,
                id:song.album.id
            })
            topAlbumsTitles.push(song.album.title);
        }
    })
}
let rows;
const selectRow=(row)=>{
    rows = document.getElementsByTagName("tr");
    
    for(let i=0;i<rows.length;i++){
        rows[i].classList.remove("selected");
    }
    row.classList.add("selected")
}
const mainContent = document.getElementById("main-content");
const renderPage = (songs) =>{
    mainContent.innerHTML =`
        <div class="top-cover">
            <div id="carouselExampleSlidesOnly" class="carousel slide" data-ride="carousel">
                <div class="carousel-inner">
                    <div class="carousel-item active">
                    <img class="d-block artist-cover" src="${songs[0].artist.picture_big}" alt="First slide">
                    </div>
                </div>
            </div>
            <div class="container artist-top">
                <div class="row">
                    <div class="col">
                        <p id="verified"><img class="verified-icon" src="./assets/icons/verified-removebg-preview.png">Verified Artist<p>
                        <h1 class="artist-name">${songs[0].artist.name}</h1>
                        <p id="monthly-listeners">100,000,000 monthly listeners</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="container-fluid">
            <div class="row artist-top-row">
                <div class="col-1">
                    <img class="artist-play" src="./assets/icons/play-circle-fill.svg">
                </div>
                <div class="col-1">
                <button type="button" class="btn">Follow</button>
                </div>
                <div class="col-1">
                    <p>...</p>
                </div>
            </div>
            <br>
            <div class="row">
                <div class="col-lg-8 col-xl-8 col-12">
                    <h4>Popular</h4>
                    <table class="table table-borderless">
                        <tr class="hidden">
                            <th style="width: 10%"></th>
                            <th style="width: 60%"></th>
                            <th style="width: 15%"></th>
                            <th style="width: 15%"></th>
                        </tr>
                        <tbody id="table-contents">
                        </tbody>
                    </table>
                </div>
                <div class="col-4 artist-pick-container d-none d-lg-block">
                    <h4>Artist Pick</h4>
                    <div class="artist-pick">
                        <div>
                            <img class="artist-pick-image" src="${songs[0].album.cover_medium}">
                        </div>
                        <div class="artist-pick-text">
                            <p class="grey-text text-gotham-light">Posted by ${songs[0].artist.name}</p>
                            <div class="artist-pick-line-height">
                                <p><strong>${songs[0].artist.name} Best Of</strong></p>
                                <p class="grey-text text-gotham-light">Playlist</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row"><div class="col"><h4>Discography</h4></div></div>
            <div class="row" id="discography">
            </div>
        </div>
    `
    tableContents = document.getElementById("table-contents");
    for(let i=0;i<5;i++){
        tableContents.innerHTML+=`
        <tr onclick="selectRow(this)">
            <th scope="row" class="grey-text align-middle">${i}</th>
            <td><img class="table-image" src=${songs[i].album.cover_small}>${songs[i].title}</td>
            <td class="grey-text align-middle">100,000</td>
            <td class="grey-text align-middle">${parseInt(songs[i].duration/60)}:${songs[i].duration%60}</td>
      </tr>
        `
    }
    discography = document.getElementById("discography")
    let arr=topAlbums.slice(0,6);
    discography.innerHTML+=``
    arr.forEach(element => {
        discography.innerHTML+=`
            <div class="discography-card col-lg-2 col-md-4 col-6 mb-5">
                <div class="card" style="position:relative" >
                    <a href='./album-page.html?id=${element.id}'>
                        <img src="${element.image}" class="card-img-top mt-2 mb-2 px-2" alt="...">
                        
                        <div class="play-btn d-none d-lg-block">
                            <div class="triangle"></div>
                        </div>
                    
                    </a>
                    <div class="card-body d-flex flex-column justify-content-center">
                        <h5 class="card-title text-white">${element.title}</h5>
                        <a href='./referencetopassartistid.html?id=${element.artist.id}'>
                            <span class="card-text text-white" >${element.artist}</span>
                        </a>
                    </div>
                </div>
            </div>
        `
    })
}
getArtistData();