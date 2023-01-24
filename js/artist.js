const url="https://striveschool-api.herokuapp.com/api/deezer/search?q="
let searchQuery = "taylor+swift"
//const params = new URLSearchParams(location.search);

const getArtist = async()=>{
    try{
        let res = await fetch(url+searchQuery, {
            method: 'GET',
        })
        if(res.ok){
            res = await res.json();
            console.log(res.data);
            renderPage(res.data);
        }
    }catch(error){
        console.log(error);
    }
}
const mainContent = document.getElementById("main-content")
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
                        <p>Verified Artist<p>
                        <h1 class="artist-name">${songs[0].artist.name}</h2>
                        <p>100,000,000 monthly listeners</p>
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
                <div class="col-8">
                    <h2>Popular</h2>
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
                <div class="col-4 artist-pick-container">
                    <h2>Artist Pick</h2>
                    <div class="artist-pick">
                        <div>
                            <img src="${songs[0].album.cover_medium}">
                        </div>
                        <div>
                            <p>Posted by ${songs[0].artist.name}</p>
                            <p><strong>${songs[0].artist.name} Best Of</strong></p>
                            <p>Playlist</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `
    tableContents = document.getElementById("table-contents")
    for(let i=0;i<5;i++){
        tableContents.innerHTML+=`
        <tr>
        <th scope="row">${i}</th>
        <td>${songs[i].title}</td>
        <td>100,000</td>
        <td>3:40</td>
      </tr>
        `
    }
}

window.onload=()=>{
    getArtist();
    getSongs();
}