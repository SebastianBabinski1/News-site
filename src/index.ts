import styles from "./style.module.scss";
import { handleCounterChange, handleClick, handleButtonText } from "./utils";
import { getArticle } from "./getArticle"

export interface Article {
  id: number;
  title: string;
  newsSite: string;
  publishedAt: string;
  summary: string;
  url: string;
  imageUrl: string;
}

const form = document.getElementById("form") as HTMLFormElement
const content = document.getElementById("content") as HTMLDivElement
const input = document.getElementById("input") as HTMLInputElement

let totalArticles = 0
let numberOfFetchingArticles = 15

const getArticles = async (numberOfArtiles: number = numberOfFetchingArticles) => {
  try {
    const response = await fetch(`https://api.spaceflightnewsapi.net/v3/articles?_limit=${numberOfArtiles}&&_start=${totalArticles}`)
    const data: Article[] = await response.json()

    data.map((item) => {
      const article = document.createElement('div');

      article.classList.add(`${styles.article}`)
      article.innerHTML = getArticle(item)

      const button = document.createElement('button')

      button.id = (item.id).toString()
      button.innerText = handleButtonText(item.id)
      button.addEventListener('click', () => handleClick(item.id)
      )

      article.appendChild(button)
      content.appendChild(article)
    })

    totalArticles += numberOfArtiles

    handleCounterChange(totalArticles)

  } catch (error) {
    console.log(error)
  }
}

window.onload = () => getArticles()

const handleSubmit = (event: SubmitEvent) => {
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
