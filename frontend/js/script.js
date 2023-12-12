if(!sessionStorage.getItem('username')){
    window.location.href = './pages/login.html'
}

const usernameTitle = document.getElementById('welcome-name');
usernameTitle.innerText = sessionStorage.getItem('username')
window.onload = () => {loadTasks()};

const body = document.querySelector('body');


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
    const tasks = await fetchGetTasks(id);
    tasks.map((task) => {
        console.log(task.task_name)
    })
}

function createElement(element, text = '', html = ''){
    element.createElement(element);

    if(text){
        element.innerText = text;
    }

    if(html){
        element.innerHTML = text;
    }
    
    return element;
}

function createTaskDiv(taskName){
    const tagP =  createElement('p', taskName);
    const buttonEdit = createElement(button, '',  `<span class="material-symbols-outlined">
    delete
</span>`)
    
}
