const backend_base_url = "http://127.0.0.1:5000"
const frontend_base_url = "http://127.0.0.1:5500"

async function handleSignin() {

    const signupData = {
        email: document.getElementById("floatingInput").value,
        password: document.getElementById("floatingPassword").value
    }

    const reponse = await fetch(`${backend_base_url}/signup`, {
        method: 'POST',
        body: JSON.stringify(signupData)
    }
    )

    console.log(reponse)

    if (reponse.status == 200) {
        window.location.replace(`${frontend_base_url}/login.html`)
    } else {
        alert(reponse.status)
    }
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
    console.log(reponse)
    reponse_json = await reponse.json()
    console.log(reponse_json)
    localStorage.setItem("token", reponse_json.token)

    if (reponse.status == 200) {
        alert('로그인 완료')
        window.location.replace(`${frontend_base_url}/index.html`);
    } else {
        alert('아이디나 비밀번호가 옳지 않습니다.')
    }
}


async function getName() {

    const reponse = await fetch(`${backend_base_url}/getuserinfo`, {
        headers: {
            'Authorization': localStorage.getItem("token")
        }
    })

    if (reponse.status == 200) {
        reponse_json = await reponse.json()
        console.log(reponse_json)
        return reponse_json
    }
    else {
        return null
    }

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

function logout() {
    localStorage.removeItem("token")
    window.location.replace(`${frontend_base_url}/`);
}

function articleDetail(article_id) {
    console.log(article_id)
    const url = `${frontend_base_url}/article_detail.html?id=${article_id}`
    location.href = url

}

async function getArticleDetail(article_id) {
    const reponse = await fetch(`${backend_base_url}/article/${article_id}`, {
        method: "GET"
    }
    )
    reponse_json = await reponse.json()
    console.log(reponse_json)

    return reponse_json.article

}

async function patchArticle(article_id, title, content) {
    const articleData = {
        "title": title,
        "content": content
    }

    const reponse = await fetch(`${backend_base_url}/article/${article_id}`, {
        headers: {
            'Authorization': localStorage.getItem("token")
        },
        method: "PATCH",
        body: JSON.stringify(articleData)
    }
    )

    if (reponse.status == 200) {
        reponse_json = await reponse.json()
        return reponse_json
    } else {
        alert(reponse.status)
    }
}

async function deleteArticle() {
    const reponse = await fetch(`${backend_base_url}/article/${article_id}`, {
        headers: {
            'Authorization': localStorage.getItem("token")
        },
        method: "DELETE"
    }
    )

    if (reponse.status == 200) {
        window.location.replace(`${frontend_base_url}/`);

    } else {
        alert(reponse.status)
    }
}
