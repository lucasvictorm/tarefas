if(!sessionStorage.getItem('username')){
    window.location.href = './pages/login.html'
}

const usernameTitle = document.getElementById('welcome-name');
usernameTitle.innerText = sessionStorage.getItem('username')

const body = document.querySelector('body');
body.addEventListener('load', loadtasks);

function fetchGetTasks(id){
    const tasks = {} 
    fetch(`http://localhost:3000/tasks${id}`)
    .then()
}