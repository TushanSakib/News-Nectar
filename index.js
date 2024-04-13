const API_KEY = "c86b8071dc5b4c88a9f7efed5a2e2de1"
const url="https://newsapi.org/v2/everything?q=";

window.addEventListener("load",()=>{
    fetchNews("India")
})
function reload(){
    windows.location.reload()
}

async function fetchNews(e){
    const res = await fetch(`${url}${e}&apiKey=${API_KEY}`)
    const data = await res.json()
    bindData(data.articles)
}

function bindData(articles){
    const cardsContainer = document.getElementById("cards-container")
    const newsCardTemplate = document.getElementById("template-new-card")

    cardsContainer.innerHTML='';

    articles.forEach((article)=>{
        if(!article.urlToImage) return;
        const cardClone = newsCardTemplate.content.cloneNode(true)
        fillDataInCard(cardClone,article)
        cardsContainer.appendChild(cardClone)

    })
}

function fillDataInCard(cardClone,article){
    const newsImg = cardClone.querySelector('#news-img')
    const newsTitle = cardClone.querySelector('#news-title')
    const newsSource = cardClone.querySelector('#news-source')
    const newsDesc = cardClone.querySelector('#news-description')

    newsImg.src = article.urlToImage
    newsTitle.innerHTML = article.title 
    newsDesc.innerHTML = article.description

    const date = new Date(article.publishedAt).toLocaleString("en-US",{
        timeZone:"Asia/Jakarta"
    })

    newsSource.innerHTML = `${article.source.name} . ${date}`
    cardClone.firstElementChild.addEventListener("click",()=>{
        window.open(article.url,"_blank")
    })
}

const currSelectedNav = null

function onNavItemClick(id){
    fetchNews(id)
    const navItem = document.getElementById(id)
    currSelectedNav?.classList.remove('active')
    currSelectedNav = navItem
    currSelectedNav.classList.add('active')
}

const searchButton = document.getElementById("search-button")
const searchText = document.getElementById('search-text')

searchButton.addEventListener("click",()=>{
    const query = searchText.value
    if(!query) return;
    fetchNews(query)
    currSelectedNav?.classList.remove('active')
    currSelectedNav = null
})