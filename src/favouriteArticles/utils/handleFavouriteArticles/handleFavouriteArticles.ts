import { Article } from "../../.."
import { url } from "../../../utils"
import sortingButton from "../sortingButton/sortingButton"
import styles from '../../../style.module.scss'
import buttonStyles from './handleFavouriteArticles.module.scss'
import libraryButton from "../../../utils/libraryButton/libraryButton"
import articleWrapper from "../../../utils/articleWrapper/articleWrapper"


const handleFavouriteArticles = () => {
  const navigation = document.getElementById("navigation") as HTMLFormElement
  navigation.classList.add(styles.navigation)

  const navigationArticles = document.getElementById("navigationArticles") as HTMLFormElement
  navigationArticles.classList.add(styles.navigationArticles)

  const buttons = document.getElementById("buttons") as HTMLButtonElement
  buttons.classList.add(buttonStyles.buttons)

  const content = document.getElementById("content") as HTMLDivElement
  content.classList.add(styles.content)

  const articlesIds = localStorage.getItem('ids') as string
  const parsedArticlesIds: number[] = JSON.parse(articlesIds)

  const areArticlesIdsStored = !!parsedArticlesIds

  const publishedDateSortingButton = sortingButton('publishedDate')
  const titleSortingButton = sortingButton('title')
  buttons.appendChild(publishedDateSortingButton)
  buttons.appendChild(titleSortingButton)

  if (areArticlesIdsStored) {
    parsedArticlesIds.forEach(async (id) => {

      const response = await fetch(`${url}/${id}`)
      const data: Article = await response.json()

      const article = articleWrapper(data)

      const button = libraryButton(id)

      button.addEventListener('click', () => {
        content.removeChild(article)
      }
      )
      article.appendChild(button)
      content.appendChild(article)
    })
  } else {

    const paragraph = document.createElement('p')
    paragraph.innerText = "Your library is empty"
    content.appendChild(paragraph)
    console.log('123')
  }
}

export default handleFavouriteArticles
