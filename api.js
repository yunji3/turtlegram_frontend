async function handleSignin() {

    const signupData = {
        email: document.getElementById("floatingInput").value,
        password: document.getElementById("floatingPassword").value
    }

    const reponse = await fetch('http://127.0.0.1:5000/signup', {
        method: 'POST',
        body: JSON.stringify(signupData)
    }
    )
    if (reponse.status == 200) {
        window.location.replace('http://127.0.0.1:5500/login.html')
    } else {
        alert(reponse.status)
    }

}



