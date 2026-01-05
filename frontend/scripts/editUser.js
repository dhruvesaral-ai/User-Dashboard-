const h1 = document.querySelector('h1')
const nameInput = document.getElementById('name-input');
const emailInput = document.getElementById('email-input');
const passwordInput = document.getElementById('password-input');
const roleInput = document.getElementById('role-input');
const form = document.querySelector('form');

const params = new URLSearchParams(window.location.search);
const value = params.get("userId");


async function getUserById(id){
    const response = await fetch(`https://userdashboardbytecodeprojectbackend.vercel.app/user/${id}`);
    const data = await response.json();
    if(data.status === 'false'){
        return alert(`❌ ${data.err} ❌`)
    }
    h1.innerText = `Edit User ( ${data.user.name} )`
    nameInput.value = data.user.name
    emailInput.value = data.user.email
    passwordInput.value = data.user.password
    roleInput.value = data.user.role
}

form.addEventListener('submit', async function(e){
    e.preventDefault();
    const name = nameInput.value;
    const email = emailInput.value;
    const password = passwordInput.value;

    const response = await fetch(`https://userdashboardbytecodeprojectbackend.vercel.app/update/${value}`, {
        method: 'PUT',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({name , email, password})
    })
    const data = await response.json();
    if(data.status === 'false'){
        return alert(`❌ ${data.err} ❌`)
    }
    alert(data.message)
    window.location.href = 'https://userdashboardbytecodeproject.vercel.app/manageUsers.html'
})


getUserById(value)

