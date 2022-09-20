import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.3/firebase-app.js";
import { getDatabase, onValue, ref, set } from "https://www.gstatic.com/firebasejs/9.9.3/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyDUExCTxTDwGP2V9sRnXZMc4T7qYs_dnsM",
  authDomain: "webschool-8b1b8.firebaseapp.com",
  databaseURL: "https://webschool-8b1b8.firebaseio.com",
  projectId: "webschool-8b1b8",
  storageBucket: "webschool-8b1b8.appspot.com",
  messagingSenderId: "39115618234",
  appId: "1:39115618234:web:571207b2d86e3774d7cf83"
};
let app = initializeApp(firebaseConfig);
let db = getDatabase();

let serverData = {
  wordOfTheDay: '',
  isLogedIn: false,
  accountData: null,
  accountReference: null,
  accountName: null,
  getAccountData(userName, password) {
    this.accountReference = ref(db, `accounts/${userName}`);
    onValue(this.accountReference, (snap) => {
      if (snap.val()) {
        console.log(snap.val().password);
        if (password === snap.val().password) {
          this.isLogedIn = true
          this.accountData = snap.val()
          this.isLogedIn = true;
          console.log(snap.val());
          console.log(this.accountData);
          return 'successfully logged in'
        } else {
          console.log('wrong password');
        }
      } else {
        console.log('invaled Username');
      }
    });
  },
  creatAccount(userName, password, confirmpassword) { 
    this.accountReference = ref(db, `accounts/${userName}`);
    onValue(this.accountReference, (snap) => {
      if (snap.val()) {
        console.log("user name taken", this.isLogedIn)
        // console.log(snap.val())
      } else {
        if (password === confirmpassword) {
          this.isLogedIn = true;
          set(this.accountReference, {
            password: password,
            name: userName,
            lookedupwords: {
              0: "irony",
              1: true,
              2: false,
            }
          });
          onValue(this.accountReference, (snap2) => {
            this.accountData = snap2.val();
            this.accountName = snap2.val().name;
          })
          console.log('account was created', this.isLogedIn)
        } else {
          console.log('password did not match', this.isLogedIn)
        }
      }
    });
  },
  signOutNow() { 
    this.isLogedIn = false;
    this.accountData = null;
    this.accountReference = null;
    this.accountName = null;
  },
  getWords() { 
    console.log(this.accountData.lookedupwords);
    return this.accountData.lookedupwords;
  },
  addNewWord(wordToAdd){ 
    if (!this.accountData.lookedupwords.includes(wordToAdd)) { 
      this.accountData.lookedupwords.push(wordToAdd)
      console.log()
      set(this.accountReference, {
        password: this.accountData.password,
        name: this.accountData.name,
        lookedupwords: this.accountData.lookedupwords
      })
    }
  }
}

export default serverData;

// import serverData from './serverData.js';

// //console.log(serverData.getAccountData('Ag', 'cat1'))
// let makeAccount = document.getElementById('makeAccount')
// makeAccount.addEventListener('click', () => {
//   serverData.creatAccount('test4', 'p', 'p')
// });

// document.getElementById('signout').addEventListener('click', () => {
//   serverData.signOutNow()
// });
// document.getElementById('signIN').addEventListener('click', () => {
//   serverData.getAccountData('test3', 'p')
// });
// document.getElementById('seedata').addEventListener('click', () => {
//   console.log(serverData)
// })

// document.getElementById('getting').addEventListener('click', () => {
//   serverData.getWords()
// })

// document.getElementById('addWords').addEventListener('click', () => {
//   serverData.addNewWord('there')
// })