import serverData from './serverData.js';

//console.log(serverData.getAccountData('Ag', 'cat1'))
let makeAccount = document.getElementById('makeAccount')
makeAccount.addEventListener('click', () => {
  serverData.creatAccount('test3', 'p', 'p')
});

document.getElementById('signout').addEventListener('click', () => {
  serverData.signOutNow()
});
document.getElementById('signIN').addEventListener('click', () => {
  serverData.getAccountData('test3', 'p')
});
document.getElementById('seedata').addEventListener('click', () => {
  console.log(serverData)
})

document.getElementById('getting').addEventListener('click', () => {
  serverData.getWords()
})

document.getElementById('addWords').addEventListener('click', () => {
  serverData.addNewWord('make more words')
})