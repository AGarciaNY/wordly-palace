window.addEventListener("DOMContentLoaded", () => {
    //dom Elements
    let nameOfWord = document.getElementById("nameOfWord")
    let defination = document.getElementById("defination")
    let pronounceW = document.getElementById("pronounce")
    let audioBtn = document.getElementById("audiobtn")
    let arrayOfW = document.getElementById("arrayOfWords")
    let showing = document.getElementById("discription")
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
                randomW.style.boxShadow = "inset 0 0 10px #000000"
              // eventlistener for when the button is clicked
                randomW.addEventListener("click", () => {
                  arrayOfW.innerText = "";
                  fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
                  .then(res => res.json()).then(data2 => {
                    console.log(data2)

                   
                     let name = document.createElement("p")
                     let meaning = document.createElement("p")
                     let example = document.createElement("p")
                     showing.append(name,meaning,example)
                     name.innerText = `Word: ${data2.word}`
                     meaning.innerText = `Meaning: ${data2.results[0].definition} `
                     example.innerText = `Pronunciation: ${data2.pronunciation.all}`
                    
                  })
                })
              });
            }
          }
          fetch20Times()
    })  