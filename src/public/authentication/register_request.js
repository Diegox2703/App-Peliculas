const registerForm = document.querySelector('.register-form')

async function sendRequest (e) {
    e.preventDefault()

    const {user, email, number, password} = e.target.elements

    const res = await fetch('http://localhost:3000/register', {
        method: 'POST',
        body: JSON.stringify({
            user: user.value,
            email: email.value,
            number: parseInt(number.value),
            password: password.value
        }),
        headers: {'Content-Type': 'application/json'}
    })
    const resJson = await res.json()
    if (resJson.status === 'Error') document.querySelector('.error-message').innerHTML = resJson.errorMessage[0].message || resJson.errorMessage
    else window.location.href = resJson.route
}

registerForm.addEventListener('submit', sendRequest)