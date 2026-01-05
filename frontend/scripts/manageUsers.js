const token = localStorage.getItem('token')
if(!token){
    window.location.href = 'https://userdashboardbytecodeproject.vercel.app/index.html'
}

const modal = document.getElementById('modal');
const nameInput = document.getElementById('name-input');
const emailInput = document.getElementById('email-input');
const passwordInput = document.getElementById('password-input');
const roleInput = document.getElementById('role-input');
const form = document.querySelector('form');
const container = document.getElementById('user-table-body')

function openModal(){
    modal.style.display = 'block'
}

function closeModal(){
    modal.style.display = 'none'
}

function navigate(id){
    window.location.href = `https://userdashboardbytecodeproject.vercel.app/editUser.html?userId=${id}`
}

form.addEventListener('submit', async function(e){
    e.preventDefault()
    const name = nameInput.value
    const email = emailInput.value
    const password = passwordInput.value
    const role = roleInput.value

    const response = await fetch('https://userdashboardbytecodeprojectbackend.vercel.app/create-user', {
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
    const response = await fetch('https://userdashboardbytecodeprojectbackend.vercel.app/users')
    const data = await response.json();
    if(data.status === 'false'){
        return alert(`❌ ${data.err} ❌`)
    }
    generateHtml(data.users)
}

async function deleteUser(id){
    if(!confirm('Are you sure you want to delete this user?')) return;
    
    const response = await fetch(`https://userdashboardbytecodeprojectbackend.vercel.app/delete/${id}`, {
        method: 'DELETE',
        headers: {
            'content-type': 'application/json'
        },
    })
    const data = await response.json()
    if(data.status === 'false'){
        return alert(`❌ ${data.err} ❌`)
    }
    // alert(data.message) // Optional: remove alert for smoother UX or keep it
    getAllUsers()
}


function generateHtml(arrayOfUsers){
    container.innerHTML = '';
    arrayOfUsers.forEach(user => {
        container.innerHTML += `
            <tr>
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td><span class="role-badge role-${user.role}">${user.role}</span></td>
                <td>${user.password}</td>
                <td>
                    <div class="action-btn-group">
                        <button class="edit-btn" onclick="navigate('${user._id}')">Edit</button>
                        <button class="delete-btn" onclick="deleteUser('${user._id}')">Delete</button>
                    </div>
                </td>
            </tr>
        `
    });
}

const logout = () => {
    localStorage.removeItem('token')
    window.location.href = 'https://userdashboardbytecodeproject.vercel.app/index.html'
}

getAllUsers()
