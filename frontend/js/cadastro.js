const cadastroForm = document.getElementById('cadastro-form');

const errorMessage = (message) => {
    const errorDiv = document.querySelector('.error-div');
    console.log(errorDiv)
    errorDiv.innerHTML = `<p>${message}</p>`;
    errorDiv.classList.add('active');
}

const fetchCadastro = async(username, password, name) => {

    const response = await fetch('https://api-tarefas-rp0k.onrender.com/login/',{
       method: 'post',
       headers: {
           'Content-Type': 'application/json',
       },
       body: JSON.stringify({username, password, name})
   })
   
   const newUser = await response.json()
   return newUser;
}

const cadastrar = async () => {
    
    const name = document.getElementById('name');
    const username = document.getElementById('username');
    const password = document.getElementById('password');
    const passwordRepeat = document.getElementById('password-repeat');

    if(password.value != passwordRepeat.value){
        errorMessage("As senhas não se parecem.")
        passwordRepeat.value = ''
        return
    }

    const newUser = await fetchCadastro(username.value, password.value, name.value);


    if(newUser.error){
        errorMessage(newUser.message);
        username.focus();
        return;
    }

    sessionStorage.setItem('username', name.value)
    sessionStorage.setItem('id', newUser.user.user_id)

    window.location.href = '../../index.html'
}

async function handleSubmit(event){
    event.preventDefault()
    
    console.log('kk')
    event.target.style.zIndex = '-1'
    
    await cadastrar();
    event.target.style.zIndex = '1'
    event.target.addEventListener('submit', handleSubmit)

}

cadastroForm.addEventListener('submit', handleSubmit)

