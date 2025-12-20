const modal = document.getElementById('modal');
const nameInput = document.getElementById('name-input');
const emailInput = document.getElementById('email-input');
const passwordInput = document.getElementById('password-input');
const roleInput = document.getElementById('role-input');
const form = document.querySelector('form');
function openModal(){
    modal.style.display = 'block'
}

function closeModal(){
    modal.style.display = 'none'
}

form.addEventListener('submit', async function(e){
    e.preventDefault()
    const name = nameInput.value
    const email = emailInput.value
    const password = passwordInput.value
    const role = roleInput.value

    const response = await fetch('http://localhost:8000/create-user', {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({name , email, password, role})
    })
    const data = await response.json();
    if(data.status === 'false'){
        return alert(`❌ ${data.err} ❌`)
    }
    alert(data.message)
    nameInput.value = ""
    emailInput.value = ""
    passwordInput.value = ""
    roleInput.value = ""
    closeModal()
})