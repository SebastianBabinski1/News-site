import styles from "./style.css";

import handleCounter from "./counter"
import getArticle from "./getArticle/getArticle"

const form = document.getElementById("form") as HTMLFormElement
const content = document.getElementById("content") as HTMLDivElement
const input = document.getElementById("input") as HTMLInputElement


let totalArticles = 0
let numberOfFetchingArticles = 15

const getArticles = async (numberOfArtiles: number = numberOfFetchingArticles) => {
  try {
    const response = await fetch(`https://api.spaceflightnewsapi.net/v3/articles?_limit=${numberOfArtiles}&&_start=${totalArticles}`)
    const data = await response.json()

    data.map(item => {
      const article = document.createElement('div');
      article.classList.add(`${styles.article}`)
      article.innerHTML = getArticle(item)
      content.appendChild(article)
    })

    totalArticles += numberOfArtiles

    handleCounter(totalArticles)

  } catch (error) {
    console.log(error)
  }
}

window.onload = () => getArticles()

const handleSubmit = (event) => {
  event.preventDefault()

  const inputValue = parseInt(input.value)
  numberOfFetchingArticles = inputValue
}

window.addEventListener('scroll', () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement
  if (clientHeight + scrollTop >= scrollHeight) {
    getArticles()
  }
})


form.addEventListener('submit', handleSubmit)
