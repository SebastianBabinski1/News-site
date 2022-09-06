import styles from "./style.module.scss";
import './styles/styles.scss'
import { handleCounterChange } from "./utils";
import libraryButton from "./utils/libraryButton/libraryButton";
import articleWrapper from "./utils/articleWrapper/articleWrapper";
import { formFetchingArticlesButton } from "./utils/formFetchingArticlesButton/formFetchingArticlesButton";

export interface Article {
  id: number;
  title: string;
  newsSite: string;
  publishedAt: string;
  summary: string;
  url: string;
  imageUrl: string;
}

const root = document.getElementById("root") as HTMLFormElement
root.classList.add(styles.root)

const navigation = document.getElementById("navigation") as HTMLFormElement
navigation.classList.add(styles.navigation)

const navigationArticles = document.getElementById("navigationArticles") as HTMLFormElement
navigationArticles.classList.add(styles.navigationArticles)

const navigationLibrary = document.getElementById("navigationLibrary") as HTMLFormElement
navigationLibrary.classList.add(styles.navigationLibrary)

const form = document.getElementById("form") as HTMLFormElement
form.classList.add(styles.form)

const formFetchingArticlesButtonsWrapper = document.createElement('div')

const button5 = formFetchingArticlesButton('5')
const button10 = formFetchingArticlesButton('10')
const button20 = formFetchingArticlesButton('20')
const button50 = formFetchingArticlesButton('50')

button5.addEventListener('click', () => { handleSubmitByButton(button5.innerText) })
button10.addEventListener('click', () => { handleSubmitByButton(button10.innerText) })
button20.addEventListener('click', () => { handleSubmitByButton(button20.innerText) })
button50.addEventListener('click', () => { handleSubmitByButton(button50.innerText) })


formFetchingArticlesButtonsWrapper.append(button5, button10, button20, button50)

form.appendChild(formFetchingArticlesButtonsWrapper)

const formInput = document.getElementById("formInput") as HTMLFormElement
formInput.classList.add(styles.formInput)

const formLabel = document.getElementById("formLabel") as HTMLFormElement
formLabel.classList.add(styles.formLabel)

const formButton = document.getElementById("formButton") as HTMLFormElement
formButton.classList.add(styles.formButton)

const content = document.getElementById("content") as HTMLDivElement
content.classList.add(styles.content)

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

const handleSubmitByButton = (numberOfArticles: string) => {

  const inputValue = parseInt(numberOfArticles)
  numberOfFetchingArticles = inputValue
  formInput.value = ''
}

window.addEventListener('scroll', () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement
  if (clientHeight + scrollTop >= scrollHeight) {
    getArticles()
  }
})

form.addEventListener('submit', handleSubmit)
