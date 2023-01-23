//const url="https://striveschool-api.herokuapp.com/api/deezer/search?q="

const fetchSongs=()=>{


    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '1a0e486a8emshc09f82e64512603p1d21fbjsnd674ceee0cc4',
            'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com'
        }
    };

    

    fetch('https://deezerdevs-deezer.p.rapidapi.com/album',options)
	.then(response => response.json())
	.then(jsonResponse => console.log(jsonResponse))
	.catch(err => console.error(err));
}
fetchSongs()