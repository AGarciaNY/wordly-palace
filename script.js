
    let submit=document.getElementById("submit")
    let next=document.getElementById("next")
    let img=document.getElementById("img")
   
    submit.addEventListener('click', function (event) {
        const addComment = document.forms["comment-form"]
        addComment.hidden = true
        event.preventDefault()
    const value = addComment.querySelector(`input[type="text"]`).value
    newarr.push(value)
    addComment.querySelector(`input[type="text"]`).value = ""
    })

    //Mood meter elements
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

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'a814b05c93msh2cd39afebec73fap1d509cjsnb19622b7a4fa',
		'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com'
	}
};
// fetch('https://deezerdevs-deezer.p.rapidapi.com/search?q=eminem', options)
// 	.then(response => response.json())
// 	.then(response => window.open(response.data[9].preview))
// 	.catch(err => console.error(err));


    