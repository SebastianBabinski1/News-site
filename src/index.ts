import getArticle from "./getArticle"

const form = document.getElementById("form") as HTMLFormElement
const content = document.getElementById("content") as HTMLDivElement
const input = document.getElementById("input") as HTMLInputElement

const getArticles = async (numberOfArtiles: number = 1) => {

  try {
    const response = await fetch(`https://api.spaceflightnewsapi.net/v3/articles?_limit=${numberOfArtiles}`)
    const data = await response.json()

    const articles = data.map(item => getArticle(item))

    content.innerHTML = articles
  } catch (error) {
    console.log(error)
  }
}

window.onload = () => getArticles()

const handleSubmit = (event) => {
  event.preventDefault()

  const inputValue = input.value

  getArticles(parseInt(inputValue))
}

form.addEventListener('submit', handleSubmit)
