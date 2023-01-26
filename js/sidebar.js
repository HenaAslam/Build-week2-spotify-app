playlists = [
    "Funky Heavy Bluesy",
    "Your Top Songs 2022",
    "Today's top Hits",
    "Rap Caviar ",
    "Rock Classics",
    "Focus Flow",
    "Jazz Vibes",
    "Coding Mode",
    "Jan24",
    "Jack 30th Party 2",
    "Jack 30th Party",
    "Chill Hits",
    "All Out 2010s",
    "Metal ballads",
    "New Playlist",
    "Daily Drive",
    "Your Top Songs 2022",
    "Rap Classics",
    "Install App",
    
]
let aside = document.getElementsByTagName('aside')[0];

aside.innerHTML=`
<div class="side-wrapper">
    <img src="./assets/icons/logo-spotify.png" alt="" class="spotify-image"/>
    <p class="top-of-sidebar"><img src="./assets/icons/house-door-fill.svg" class="left-icons"/>Home</p>
    <p class="top-of-sidebar" onclick="toggleSearch()"><img src="./assets/icons/search.svg" alt="" class="left-icons"/>Search</p>
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