const token = localStorage.getItem('token')
if(token){
    window.location.href = 'https://userdashboardbytecodeproject.vercel.app/manageUsers.html'
}
const nameInput = document.getElementById('name-input');
const emailInput = document.getElementById('email-input');
const passwordInput = document.getElementById('password-input');
const form = document.querySelector('form');


form.addEventListener('submit', async function(e){
    e.preventDefault()

    const name = nameInput.value
    const email = emailInput.value
    const password = passwordInput.value

    const response = await fetch('https://userdashboardbytecodeprojectbackend.vercel.app/signup', {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({name , email, password})
    })
    const data = await response.json();
    if(data.status === 'false'){
        return alert(`❌ ${data.err} ❌`)
    }
    alert(data.message)
    localStorage.setItem('token', data.token)
    window.location.href = 'https://userdashboardbytecodeproject.vercel.app/manageUsers.html'
    nameInput.value = ""
    emailInput.value = ""
    passwordInput.value = ""
})