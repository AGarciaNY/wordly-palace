const signUpAuthorization = function () {
    const creds = {
        client_id: `325321fbe95244a79af7e14e52867182`,
        clientSecret: `YTBmNGJlZTlhYTEyNDFhNTkxNmRhYWZkN2I3YTFlZjQ=`,
        redirectUri: `https%3A%2F%2Fcarmensalas14.github.io%2Fvybe-app%2Fapp.html`,
        scope: `user-read-private%20user-library-read%20user-read-email%20playlist-modify-public`
    }
    let authorizationReq = `https://accounts.spotify.com/authorize?client_id=${creds.client_id}&redirect_uri=${creds.redirectUri}&response_type=token&&scope=${creds.scope}`
    window.location = authorizationReq;
}

// const encodedParams = new URLSearchParams();
// encodedParams.append("text", `${h2.innerHTML}`);

// const url = 'https://text-sentiment.p.rapidapi.com/analyze';

// const options = {
//   method: 'POST',
//   headers: {
//     'content-type': 'application/x-www-form-urlencoded',
//     'X-RapidAPI-Key': 'a814b05c93msh2cd39afebec73fap1d509cjsnb19622b7a4fa',
//     'X-RapidAPI-Host': 'text-sentiment.p.rapidapi.com'
//   },
//   body: encodedParams
// };
const params = new URLSearchParams(window.location.hash);
const accessToken = params.get("#access_token");
console.log(accessToken)
const playButtonDiv = document.getElementById("playButtonDiv")

// Getting user's Spotify ID
const getUserId = async function () {
    const response = await fetch('https://api.spotify.com/v1/me', {
        headers: {
            'Authorization': 'Bearer ' + accessToken
        }
    });
    const json = await response.json()
    const id = await json.id
    return id
};

// getting user's first 50 saved tracks
const getUserSavedTracks = async function () {
    const response = await fetch('https://api.spotify.com/v1/me/tracks?offset=0&limit=50', {
        headers: {
            'Authorization': 'Bearer ' + accessToken
        }
    });
    const json = await response.json()
    return json
};

// getting user library response array
const getTrackItems = async function () {
    const data = await getUserSavedTracks();
    const items = await data.items
    return items
};

// get track ID
const getUserTrackId = async function () {
    const data = await getUserSavedTracks();
    const items = await data.items
    return items.map(item => item.track.id)
};

// get track URI 
const getUserTrackURI = async function () {
    const data = await getUserSavedTracks();
    const items = await data.items
    return items.map(item => item.track.uri)
};

//create new playlist for filtered saved tracks
const createPlaylist = async function (name) {
    const user_id = await getUserId();
    const playlist = await fetch(`https://api.spotify.com/v1/users/${user_id}/playlists`, {
        method: 'POST',
        body: JSON.stringify({
            name: name,
        }),
        headers: {
            'Authorization': 'Bearer ' + accessToken,
            'Content-Type': 'application/json',
        }
    });
    const emptyPlaylist = await playlist.json()
    const playlistID = await emptyPlaylist.id
    return playlistID
};

// Generate Playlist with added tracks function  
const generatePlaylist = async function (name, trackItems) {

    const playlist_id = await createPlaylist(name);

    playButtonDiv.innerHTML = `<iframe src="https://open.spotify.com/embed/playlist/${playlist_id}" width="500" height="1000" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>`

    // ADD TRACKS TO PLAYLIST 
    return fetch(`https://api.spotify.com/v1/playlists/${playlist_id}/tracks`, {
        method: 'POST',
        body: JSON.stringify({
            uris: trackItems
        }),
        headers: {
            'Authorization': 'Bearer ' + accessToken,
            'Content-Type': 'application/json'
        }
    });
}

// GET TRACK ENEGRY LEVELS 
const trackAudioFeat = async function () {
    const data = await getUserTrackId()
    const dataArray = []
    for (let i = 0; i < data.length; i++) {
        dataArray.push(data[i])
    }
    const dataString = dataArray.join(',')

    const response = await fetch(`https://api.spotify.com/v1/audio-features/?ids=${dataString}`, {
        headers: {
            'Authorization': 'Bearer ' + accessToken
        }
    });
    const json = await response.json();
    return json.audio_features.map(track => track.energy)
}

// function that creates object for main data
const getMainData = async function () {
    const track_items = await getTrackItems();
    const track_uri = await getUserTrackURI();
    const track_energy = await trackAudioFeat();

    return {
        'items': track_items,
        'track_uri': track_uri,
        'track_energy': track_energy,
    }

}

const happy = document.getElementById('happy');
const tired = document.getElementById('tired');
const sad = document.getElementById('sad');

// Event listeners for ENERGY BUTTONS
happy.addEventListener('click', async(e) => {
    e.preventDefault();
  

    const data = await getMainData();
    let happyArr = []
    for (let i = 0; i < data.items.length; i++) {
        if (data.track_energy[i].toPrecision(2) <= .33) {
            happyArr.push(data.track_uri[i])
        }
    }
    const happySong = () => happyArr[Math.floor(Math.random() * happyArr.length)]
    console.log(happyArr)
    var audio = new Audio(happySong);
audio.play();

});

tired.addEventListener('click', async(e) => {
    e.preventDefault();
  

    const data = await getMainData();
    let tiredArr = []
    for (let i = 0; i < data.items.length; i++) {
        if (data.track_energy[i].toPrecision(2) > .34 && data.track_energy[i].toPrecision(2) <= .66) {
            tiredArr.push(data.track_uri[i])
        }
    }
    const tiredSong = () => tiredArr[Math.floor(Math.random() * tiredArr.length)]
    console.log(tiredArr)
    var audio2 = new Audio(tiredSong);
audio2.play();
});

sad.addEventListener('click', async(e) => {
    e.preventDefault();
   

    const data = await getMainData();
    let sadArr = []
    for (let i = 0; i < data.items.length; i++) {
        if (data.track_energy[i].toPrecision(2) > .67 && data.track_energy[i].toPrecision(2) <= 1.0) {
            sadArr.push(data.track_uri[i])
        }
    }
    const sadSong = () => sadArr[Math.floor(Math.random() * sadArr.length)]
    console.log(sadArr)
    var audio3 = new Audio(sadSong);
audio3.play();

});
