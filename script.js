import serverData from './serverData.js';

//console.log(serverData.getAccountData('Ag', 'cat1'))
let makeAccount = document.getElementById('makeAccount')
makeAccount.addEventListener('click', () => {
  serverData.creatAccount('test', 'p', 'p')
});