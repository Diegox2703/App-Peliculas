const loginForm = document.querySelector('.login-form')

async function sendRequest (e) {
    e.preventDefault()

    const {user, password} = e.target.elements
    
    const res = await fetch('http://localhost:3000/login', {
        method: 'POST',
        body: JSON.stringify({
            user: user.value,
            password: password.value
        }),
        headers: {'Content-type': 'application/json'}
    })
    const resJson = await res.json()
    if (resJson.status === 'Error') document.querySelector('.error-message').innerHTML=resJson.errorMessage[0].message || resJson.errorMessage
    else window.location.href = resJson.route
}

loginForm.addEventListener('submit', sendRequest)