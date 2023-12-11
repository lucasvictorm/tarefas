if(!sessionStorage.getItem('username')){
    window.location.href = './pages/login.html'
}

const usernameTitle = document.getElementById('username-title');
usernameTitle.innerText = sessionStorage.getItem('username')