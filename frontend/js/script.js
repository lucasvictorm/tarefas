if(!sessionStorage.getItem('username')){
    window.location.href = './pages/login.html'
}
console.log(sessionStorage.getItem('id'))

const usernameTitle = document.getElementById('username-title');
usernameTitle.innerText = sessionStorage.getItem('username')