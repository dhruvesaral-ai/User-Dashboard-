const h1 = document.querySelector('h1')
const params = new URLSearchParams(window.location.search);
const value = params.get("userId");
h1.innerText = `Edit User ( ${value} )`


async function getUserById(id){
    const response = await fetch(`http://localhost:8000/user/${id}`);
    const data = await response.json();
    if(data.status === 'false'){
        return alert(`❌ ${data.err} ❌`)
    }
    console.log(data.user)
}

getUserById(value)

