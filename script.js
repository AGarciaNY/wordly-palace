window.addEventListener("DOMContentLoaded", () => {
    //dom Elements
    let nameOfWord = document.getElementById("nameOfWord")
    let defination = document.getElementById("defination")
    let pronounceW = document.getElementById("pronounce")
    let audioBtn = document.getElementById("audiobtn")
    let arrayOfW = document.getElementById("arrayOfWords")
    let showing = document.getElementById("discription")

    let dialogBox=document.getElementById("dialog-box")
    let img=document.getElementById("img")


    //styling
    img.style.display="none";
    dialogBox.style.display="none";

    // fetch("https://random-word-api.herokuapp.com/All").then(res => res.json())
    // .then(data => console.log(data[0]))
    //varibles
    let url = "https://random-words-with-pronunciation.p.rapidapi.com/word?rapidapi-key=d90feb3493msh188349b87904e98p1e8634jsne0ad3411d51a"
        fetch("https://random-words-with-pronunciation.p.rapidapi.com/word?rapidapi-key=d90feb3493msh188349b87904e98p1e8634jsne0ad3411d51a")
        .then(res => res.json()).then(json => {
            // console.log(json)
            let word = `${json[0].word}`
            nameOfWord.innerText = `${json[0].word}`
            defination.innerText = `Definition: ${json[0].definition}`
             pronounceW.innerText = `Pronunciation: ${json[0].pronunciation}`
             let word2 = `${json[0].word}`
    //Event listener for adding the speech
        audioBtn.addEventListener("click", () => {
            speaks = [
                {
                  "name": "Alex",
                  "lang": "en-US"
                }
            ]
         const msg = new SpeechSynthesisUtterance();
            msg.volume = 1; 
            msg.rate = 1; 
            msg.pitch = 1.5; 
            msg.text  = `${json[0].word}` ;
        speechSynthesis.speak(msg);
        })
        })
        function fetch20Times() {
            for(let i = 1; i <= 20; i++) {
             fetch("https://api.api-ninjas.com/v1/randomword/?key=puHp1RTi4iddWO3YYmNuXQ==lTdWygeqoi5P3jQz").then(res => res.json()).then(data => {
                // console.log(data)
                let randomW = document.createElement("button")
                arrayOfW.appendChild(randomW)
                randomW.innerText = `${data.word}`
                randomW.style.marginTop = `${Math.random() * 10}px`
                randomW.style.marginLeft = `${Math.random() * 10}px`
                let word = `${data.word}`
              // eventlistener for when the button is clicked
                randomW.addEventListener("click", () => {
                  arrayOfW.innerText = "";
                  fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
                  .then(res => res.json()).then(data2 => {
                    console.log(data2)

                    dialogBox.innerHTML=`You selected ${word}! Click Next!`
                    img.style.display="block";
                    dialogBox.style.display="block";


                   
                    //  let name = document.createElement("p")
                    //  let meaning = document.createElement("p")
                    //  let example = document.createElement("p")
                    //  showing.append(name,meaning,example)
                    //  name.innerText = `Word: ${data2.word}`
                    //  meaning.innerText = `Meaning: ${data2.results[0].definition} `
                    //  example.innerText = `Pronunciation: ${data2.pronunciation.all}`
                    
                  })
                })
              });
            }
          }
          fetch20Times()
    })  

    //submit event listener
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
//tired mood array with random songs
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


// fetch('https://deezerdevs-deezer.p.rapidapi.com/search?q=eminem', options)
// 	.then(response => response.json())
// 	.then(response => window.open(response.data[9].preview))
// 	.catch(err => console.error(err));


    })  
