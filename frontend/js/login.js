const loginForm = document.getElementById('login-form');

loginForm.addEventListener('submit', async (event) => {
    event.preventDefault()
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    let login = {}
    await fetch('http://localhost:3000/login/entrar/', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({username, password}),
    }).then(async(res)=>{
        const resposta = await res.json()
        return resposta;
    }).then((data) => {
        login = data;
    })


    if(login.user){
        sessionStorage.setItem('username', login.user.user_name)
        sessionStorage.setItem('id', login.user.user_id)
        window.location.href = '../index.html'
    }else{
        errorMessage(login.message)
    }
    
    
})

const errorMessage = (message) => {
    const errorDiv = document.querySelector('.error-div');
    console.log(errorDiv)
    errorDiv.innerHTML = `<p>${message}</p>`;
    errorDiv.classList.add('active');
}