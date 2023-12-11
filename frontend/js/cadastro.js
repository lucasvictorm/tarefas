const cadastroForm = document.getElementById('cadastro-form');

const errorMessage = (message) => {
    const errorDiv = document.querySelector('.error-div');
    console.log(errorDiv)
    errorDiv.innerHTML = `<p>${message}</p>`;
    errorDiv.classList.add('active');
}

const fetchCadastro = async(username, password, name) => {

    const response = await fetch('http://localhost:3000/login/',{
       method: 'post',
       headers: {
           'Content-Type': 'application/json',
       },
       body: JSON.stringify({username, password, name})
   })
   
   const newUser = await response.json()
   return newUser;
}

const cadastrar = async (event) => {
    event.preventDefault()
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

    window.location.href = '../index.html'
}


cadastroForm.addEventListener('submit', cadastrar)

