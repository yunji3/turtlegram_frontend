const backend_base_url = "http://127.0.0.1:5000"
const frontend_base_url = "http://127.0.0.1:5500"

async function handleSignin() {

    const signupData = {
        email: document.getElementById("floatingInput").value,
        password: document.getElementById("floatingPassword").value
    }

    // if (signupData.email == "") {
    //     alert('이메일을 입력해주세요')
    // }
    // else if (signupData.password == "") {
    //     alert('패스워드를 입력해주세요')
    // }

    const reponse = await fetch(`${backend_base_url}/singup`, {
        method: 'POST',
        body: JSON.stringify(signupData)
    }
    )
    if (reponse.status == 200) {
        window.location.replace(`${frontend_base_url}/login.html`)
    } else {
        alert(reponse.status)
    }

}



async function handlelogin() {

    const loginData = {
        email: document.getElementById("floatingInput").value,
        password: document.getElementById("floatingPassword").value
    }

    const reponse = await fetch(`${backend_base_url}/login`, {
        method: 'POST',
        body: JSON.stringify(loginData)
    })
    reponse_json = await reponse.json()
    console.log(reponse_json)
    localStorage.setItem("token", reponse_json.token)

}


async function getName() {

    const reponse = await fetch(`${backend_base_url}/getuserinfo`, {
        headers: {
            'Authorization': localStorage.getItem("token")
        }
    })
    reponse_json = await reponse.json()
    console.log(reponse_json)

    const username = document.getElementById("username")
    username.innerText = reponse_json.email
}
