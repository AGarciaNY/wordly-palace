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
  accountName:null,
  getAccountData(userName, password) {
    this.accountReference = ref(db, `accounts/${userName}`);
    onValue(this.accountReference, (snap) => {
      if (snap.val()) {
        console.log(snap.val().password);
        if (password === snap.val().password) {
          this.isLogedIn = true
          this.accountData = snap.val()
          console.log(snap.val());
          this.isLogedIn = true;
          return 'successful logedin'
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
        console.log(snap.val())
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
          // this.accountData = snap.val().name;
          setTimeout(()=>{
            console.log(snap.val())
          },2000)
          console.log('account was created', this.isLogedIn)
        } else {
          console.log('password did not match', this.isLogedIn)
        }
      }
    });
  }
}

export default serverData