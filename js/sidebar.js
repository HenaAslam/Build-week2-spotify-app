playlists = [
    "playlist 1",
    "playlist 2",
    "playlist 3",
    "playlist 4",
    "playlist 5",
    "playlist 6",
    "playlist 7",
    "playlist 8",
    "playlist 9",
    "playlist 10",
    "playlist 11",
    "playlist 12",
    "playlist 13",
    "playlist 14",
    "playlist 14",
    "playlist 14",
    "playlist 14",
    "playlist 14",
    "playlist 14",
    "playlist 14",
    "playlist 14",
    "playlist 14",
    "playlist 14",
    "playlist 14",
    "playlist 14",
    "playlist 14",
    "playlist 14",
    
]
let aside = document.getElementsByTagName('aside')[0];

aside.innerHTML=`
<div class="side-wrapper">
    <img src="./assets/icons/logo-spotify.png" alt="" class="spotify-image"/>
    <p class="top-of-sidebar"><img src="./assets/icons/house-door-fill.svg" class="left-icons"/>Home</p>
    <p class="top-of-sidebar"><img src="./assets/icons/search.svg" alt="" class="left-icons"/>Search</p>
    <p class="top-of-sidebar"><img src="./assets/icons/library.png" class="left-icons"/>Your Library</p>
    <br>
    <p><img src="./assets/icons/plus-square.svg" class="left-icons"/>Create Playlist</p>
    <p><img src="./assets/icons/chat-heart-fill.svg" class="left-icons"/>Liked Songs</p>
    <hr class="aside-hr">
    <div id="playlist-wrapper">
        <div id="top-playlists"></div>
    </div>
</div>
`;

let topPlaylists = document.getElementById("top-playlists");

for(let i=0;i<playlists.length;i++){
    topPlaylists.innerHTML+=`<p>${playlists[i]}</p>`
}