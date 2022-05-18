function handleArticleCreate() {
    console.log("게시글생성")
    const title = document.getElementById("article_title").value
    const content = document.getElementById("article_content").value


    postArticle(title, content)
}