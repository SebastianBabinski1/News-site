import styles from "./style.module.scss";
import './styles/styles.scss'
import { handleCounterChange, handleLibrarySavingClick, handleButtonText } from "./utils";
import { getArticle } from "./getArticle"
import libraryButton from "./utils/libraryButton/libraryButton";
import articleWrapper from "./utils/articleWrapper/articleWrapper";

export interface Article {
  id: number;
  title: string;
  newsSite: string;
  publishedAt: string;
  summary: string;
  url: string;
  imageUrl: string;
}

const navigation = document.getElementById("navigation") as HTMLFormElement
navigation.classList.add(styles.navigation)

const navigationArticles = document.getElementById("navigationArticles") as HTMLFormElement
navigationArticles.classList.add(styles.navigationArticles)

const form = document.getElementById("form") as HTMLFormElement
form.classList.add(styles.form)

const formInput = document.getElementById("formInput") as HTMLFormElement
formInput.classList.add(styles.formInput)

const formLabel = document.getElementById("formLabel") as HTMLFormElement
formLabel.classList.add(styles.formLabel)

const formButton = document.getElementById("formButton") as HTMLFormElement
formButton.classList.add(styles.formButton)

const content = document.getElementById("content") as HTMLDivElement

let totalArticles = 0
let numberOfFetchingArticles = 15

const getArticles = async (numberOfArtiles: number = numberOfFetchingArticles) => {
  try {
    const response = await fetch(`https://api.spaceflightnewsapi.net/v3/articles?_limit=${numberOfArtiles}&&_start=${totalArticles}`)
    const data: Article[] = await response.json()

    data.map((item) => {
      const article = articleWrapper(item)

      const button = libraryButton(item.id)

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

  if (formInput.value === '') {
    alert('Fetching articles must be greather than 0');

  } else {
    const inputValue = parseInt(formInput.value)
    numberOfFetchingArticles = inputValue
    formInput.value = ''
  }
}

window.addEventListener('scroll', () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement
  if (clientHeight + scrollTop >= scrollHeight) {
    getArticles()
  }
})

form.addEventListener('submit', handleSubmit)
