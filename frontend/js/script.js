if(!sessionStorage.getItem('username')){
    window.location.href = './pages/login.html'
}

const usernameTitle = document.getElementById('welcome-name');
usernameTitle.innerText = sessionStorage.getItem('username')

const body = document.querySelector('body');
//body.addEventListener('load', loadtasks);

async function fetchGetTasks(id){
    let tasks = {} 
    await fetch(`http://localhost:3000/tasks/${id}`)
    .then(async (res) => {
        return await res.json()
    })
    .then((data) => {
        tasks = data
    })
    .catch(err => console.log(err))
    console.log(tasks)
    return tasks;
}

async function loadTasks(){
    const id = sessionStorage.getItem('id');
    await fetchGetTasks(id)
}

loadTasks()