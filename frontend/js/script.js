window.onload = () => {loadTasks()};
if(!sessionStorage.getItem('username')){
    window.location.href = './pages/login.html'
}
const usernameTitle = document.getElementById('welcome-name');
usernameTitle.innerText = sessionStorage.getItem('username')

const logoutDiv = document.querySelector('#logout-div');
logoutDiv.addEventListener('click', () => {
    sessionStorage.removeItem('username')
    location.reload();
})

const addForm = document.querySelector('.add-form');
addForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const task_name = document.getElementById('task-input');
    await createTask(task_name.value)
    task_name.value = ''

})


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
    return tasks;
}

async function loadTasks(){
    const boxTasks = document.querySelector('.box-tasks');
    boxTasks.innerHTML = ''
    const id = sessionStorage.getItem('id');
    const tasks = await fetchGetTasks(id);
    tasks.map((task) => {
        createTaskDiv(task);
    })
}

function createElement(element, text = '', html = ''){
    const tag = document.createElement(element);

    if(text){
        tag.innerText = text;
    }

    if(html){
        tag.innerHTML = html;
    }
    
    return tag;
}

function createTaskDiv(task){
    const {task_name, task_id} = task
    const boxTasks = document.querySelector('.box-tasks');
    const taskDiv = createElement('div');
    taskDiv.classList.add('task')

    const divTaskName = createElement('div');
    divTaskName.classList.add('div-task-name')

    const divTaskButtons = createElement('div');
    divTaskButtons.classList.add('div-task-buttons')
    const tagP =  createElement('p', task_name);
    const buttonEdit = createElement('button', '',  `<span class="material-symbols-outlined">
    edit
</span>`)
    buttonEdit.addEventListener('click', () => {editTask(divTaskName ,task_name)})
    const buttonDelete = createElement('button', '',  `<span class="material-symbols-outlined">
    delete

</span>`)
    const buttonDone = createElement('button', '',  `<span class="material-symbols-outlined">
    done
</span>`)
    divTaskName.appendChild(tagP);
    divTaskButtons.appendChild(buttonEdit)
    divTaskButtons.appendChild(buttonDelete)
    divTaskButtons.appendChild(buttonDone)

    taskDiv.appendChild(divTaskName);
    taskDiv.appendChild(divTaskButtons)
    
    boxTasks.appendChild(taskDiv)
    
}

async function createTask(task_name){
    const options = {
        dateStyle: 'long',
        timeStyle: 'short',
    }
   
    const date = new Date(Date.now()).toUTCString();
    const task_date = new Date(date).toLocaleString('pt-br', options)
    const task_user = sessionStorage.getItem('id');
    
    const task = {task_name, task_date, task_user}
    await fetch('http://localhost:3000/tasks', {
        method: 'post',
        headers: {
            'Content-Type': "application/json",
        },
        body: JSON.stringify(task)
    })

    loadTasks()
}

async function fetchUpdateTask(body, id){
    await fetch(`http://localhost:3000/tasks/${id}`, {
        method: 'put',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    })
}

async function editTask(divTaskName, text){
    divTaskName.innerHTML = ''
    const taskNameInput = createElement('input')
    taskNameInput.value = text;
    divTaskName.appendChild(taskNameInput);
    taskNameInput.focus()
}