
const params = new URLSearchParams(location.search)
const id = params.get("id")
console.log(id)

const getsongs=async(id)=>{
    let res=await fetch("https://striveschool-api.herokuapp.com/api/deezer/album/"+id)
    let jsonAlbums=await res.json()
    console.log(jsonAlbums.tracks.data)
}

getsongs(id)