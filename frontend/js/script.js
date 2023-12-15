window.onload = () => {loadTasks()};
if(!sessionStorage.getItem('username')){
    window.location.href = './frontend/pages/login.html'
}
const usernameTitle = document.getElementById('welcome-name');

usernameTitle.innerText = sessionStorage.getItem('username')
/*const showAllButton = document.getElementById('showAllButton')
const showPendentsButton = document.getElementById('showPendentsButton')
showPendentsButton.addEventListener('click', ()=>{
    ShowPendentTasks()
})*/

const filterButtonsHTML = document.getElementsByClassName('filter-button')

const filterButtons = [...filterButtonsHTML] 
filterButtons[0].addEventListener('click', (event) => {
    filterButtons.forEach(element => {element.classList.remove('active')})
    event.target.classList.add('active')
    loadTasks()
})
filterButtons[1].addEventListener('click', (event) => {
    filterButtons.forEach(element => {element.classList.remove('active')})
    event.target.classList.add('active')
    loadTasks()
})
filterButtons[2].addEventListener('click', (event) => {
    filterButtons.forEach(element => {element.classList.remove('active')})
    event.target.classList.add('active')
    loadTasks()
})




const logoutDiv = document.querySelector('#logout-div');
logoutDiv.addEventListener('click', () => {
    sessionStorage.removeItem('username')
    location.reload();
})

const addForm = document.querySelector('.add-form');
addForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    event.target.style.zIndex = '-1'
    console.log(event.target)
    const task_name = document.getElementById('task-input');
    await createTask(task_name.value)
    
    task_name.value = ''
    event.target.style.zIndex = '1'
})


async function fetchGetTasks(id){
    let tasks = {} 
    await fetch(`https://api-tarefas-rp0k.onrender.com/tasks/${id}`)
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
    const boxFilters = document.querySelector('.box-filters')
    let tasks;
    boxFilters.style.display = 'none'
    boxTasks.innerHTML = ''
    const id = sessionStorage.getItem('id');
    if(filterButtons[0].classList.contains('active')){
        tasks = await fetchGetTasks(id);

    } else if(filterButtons[1].classList.contains('active')){
        tasks = await fetchPendentTasks(id);

    } else if(filterButtons[2].classList.contains('active')){
        tasks = await fetchCompletedTasks(id);
    }

   
   
    tasks.map((task) => {
        
        createTaskDiv(task);
    })
    boxFilters.style.display = 'flex'
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
    const {task_name, task_id, task_status} = task
    const boxTasks = document.querySelector('.box-tasks');
    const taskDiv = createElement('div');
    taskDiv.classList.add('task')

    const divTaskName = createElement('div');
    divTaskName.classList.add('div-task-name')

    const divTaskButtons = createElement('div');
    divTaskButtons.classList.add('div-task-buttons')
    const tagP =  createElement('p', task_name);

    const buttonEdit = createElement('button', '',  `<span class="material-symbols-outlined">edit</span>`)
    const buttonDelete = createElement('button', '',  `<span class="material-symbols-outlined">delete</span>`)
    const buttonDone = createElement('button', '',  `<span class="material-symbols-outlined">done</span>`)

    
    if(task_status == 'concluido'){
        taskDiv.classList.add('checked')
    }

    if(task_status ==  'pendente'){
        taskDiv.classList.remove('checked')
    }


    buttonEdit.addEventListener('click', async () => {
        buttonDelete.style.display = 'none'
        buttonEdit.style.display = 'none'
    
        await editTask(divTaskName ,task_name, divTaskButtons, task_status, task_id)
    
    })

    buttonDelete.addEventListener('click', async () => {
    await deleteTask(task_id)
    })

    buttonDone.addEventListener('click', async function doneHandler(){
        let newStatus = ''
        
        if(task_status == 'concluido'){
            newStatus = 'pendente'
        }

        if(task_status ==  'pendente'){
            newStatus = 'concluido'
        }
        
        const body = {task_name, task_status: newStatus}
        await fetchUpdateTask(body, task_id)
        loadTasks()
        
    })


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
    await fetch('https://api-tarefas-rp0k.onrender.com/tasks', {
        method: 'post',
        headers: {
            'Content-Type': "application/json",
        },
        body: JSON.stringify(task)
    })

    loadTasks()
}

async function fetchUpdateTask(body, id){
    await fetch(`https://api-tarefas-rp0k.onrender.com/tasks/${id}`, {
        method: 'put',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    })
}

async function fetchDeleteTask(id){
    await fetch(`https://api-tarefas-rp0k.onrender.com/tasks/${id}`, {
        method: 'delete',
    })
}

async function editTask(divTaskName, task_name, divTaskButtons, task_status, task_id){
    divTaskName.innerHTML = ''
    const taskNameInput = createElement('input')
    taskNameInput.value = task_name;
    divTaskName.appendChild(taskNameInput);
    taskNameInput.focus()
    divTaskButtons.innerHTML = '';
    const buttonDone = createElement('button', '',  `<span class="material-symbols-outlined">done</span>`)
    divTaskButtons.appendChild(buttonDone)

    await buttonDone.addEventListener('click', async () => {
        const body = {
            task_name: taskNameInput.value,
            task_status,
        }
        await fetchUpdateTask(body, task_id)
        loadTasks()
    })
}

async function deleteTask(id){
    await fetchDeleteTask(id)
    loadTasks()
}

async function fetchPendentTasks(id){
    
    const tasksPromise = await fetch(`https://api-tarefas-rp0k.onrender.com/tasks/pendents/${id}`)
    
    const tasks = await tasksPromise.json();
    
    return tasks
}

async function fetchCompletedTasks(id){
    
    const tasksPromise = await fetch(`https://api-tarefas-rp0k.onrender.com/tasks/completed/${id}`)
    
    const tasks = await tasksPromise.json();
    
    return tasks
}

