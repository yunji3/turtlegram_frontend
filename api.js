const backend_base_url = "http://127.0.0.1:5000"
const frontend_base_url = "http://127.0.0.1:5500"

async function handleSignin() {

    const signupData = {
        email: document.getElementById("floatingInput").value,
        password: document.getElementById("floatingPassword").value
    }

    const reponse = await fetch(`${backend_base_url}/singup`, {
        method: 'POST',
        body: JSON.stringify(signupData)
    }
    )
    // if (reponse.status == 200) {
    //     alert('회원가입에 성공하였습니다!');
    //     window.location.replace(`${frontend_base_url}/login.html`)
    // } else {
    //     alert('회원가입에 실패하였습니다. 다시 시도해주세요!');
    //     alert(reponse.status)
    // }

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
    // if (response.status == 201) {
    //     alert('로그인에 성공하였습니다!');
    //     window.location.replace(`${frontend_base_url}/index.html`);
    // } else {
    //     alert('로그인에 실패했습니다. 재시도해주세요!');
    //     window.location.reload();
    // }

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

async function postArticle(title, content) {

    const articleData = {
        title: title,
        content: content
    }
    console.log(articleData)

    const reponse = await fetch(`${backend_base_url}/article`, {
        method: "POST",
        headers: {
            'Authorization': localStorage.getItem("token")
        },
        body: JSON.stringify(articleData)

    }
    )
    reponse_json = await reponse.json()
    console.log(reponse_json)

    if (reponse.status == 200) {
        window.location.replace(`${frontend_base_url}/`)
    } else {
        alert(reponse.status)
    }
}

async function getArticles() {

    const reponse = await fetch(`${backend_base_url}/article`, {
        method: "GET",

    }
    )
    reponse_json = await reponse.json()

    return reponse_json.articles
}
