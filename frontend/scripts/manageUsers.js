const modal = document.getElementById('modal');
const nameInput = document.getElementById('name-input');
const emailInput = document.getElementById('email-input');
const passwordInput = document.getElementById('password-input');
const roleInput = document.getElementById('role-input');
const form = document.querySelector('form');
const container = document.getElementById('user-container')

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
    getAllUsers()
})


async function getAllUsers(){
    const response = await fetch('http://localhost:8000/users')
    const data = await response.json();
    if(data.status === 'false'){
        return alert(`❌ ${data.err} ❌`)
    }
    generateHtml(data.users)
}

async function deleteUser(id){
    const response = await fetch(`http://localhost:8000/delete/${id}`, {
        method: 'DELETE',
        headers: {
            'content-type': 'application/json'
        },
    })
    const data = await response.json()
    if(data.status === 'false'){
        return alert(`❌ ${data.err} ❌`)
    }
    alert(data.message)
    getAllUsers()
}


function generateHtml(arrayOfUsers){
    container.innerHTML = '';
    arrayOfUsers.forEach(user => {
        container.innerHTML += `
                <div id="user">
                    <div class="child">
                        <p id="name">${user.name}</p>
                        <p id="email">${user.email}</p>
                    </div>
                    <div class="child">
                        <p id="role" >${user.role}</p>
                    </div>
                    <div class="child">
                        <p id="password" >${user.password}</p>
                    </div>
                    <div class="child">
                        <button id="delete-btn" onclick="deleteUser('${user._id}')">Delete</button>
                    </div>
                </div>
        `
    });
}

getAllUsers()