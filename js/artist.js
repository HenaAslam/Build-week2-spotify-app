const url="https://striveschool-api.herokuapp.com/api/deezer/search?q="
let searchQuery = "pink+floyd"
//const params = new URLSearchParams(location.search);

const getArtist = async()=>{
    try{
        let res = await fetch(url+searchQuery, {
            method: 'GET',
        })
        if(res.ok){
            res = await res.json();
            console.log(res.data)
            renderPage(res.data);
        }
    }catch(error){
        console.log(error);
    }
}
const mainContent = document.getElementById("main-content")
const renderPage = (songs) =>{
    console.log("Poopy")
    mainContent.innerHTML =`
    <div>
        <div id="carouselExampleSlidesOnly" class="carousel slide" data-ride="carousel">
            <div class="carousel-inner">
                <div class="carousel-item active">
                <img class="d-block artist-cover" src="${songs[0].album.cover_big}" alt="First slide">
                </div>
            </div>
        </div>
        <div class="container artist-top">
            <div class="row">
                <div class="col">
                    <p>Verified Artist<p>
                </div>
            </div>
        </div>
    </div>
`
}

window.onload=()=>{
    getArtist();
}