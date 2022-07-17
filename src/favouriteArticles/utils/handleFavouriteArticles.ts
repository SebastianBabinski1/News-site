import { Article } from "../.."
import { getArticle } from "../../getArticle"
import { handleButtonText, handleClick, url } from "../../utils"
import sortingButton from "../sortingButton"
import styles from '../../style.module.scss'


const handleFavouriteArticles = () => {
  const navigation = document.getElementById("navigation") as HTMLFormElement
  navigation.classList.add(styles.navigation)

  const navigationArticles = document.getElementById("navigationArticles") as HTMLFormElement
  navigationArticles.classList.add(styles.navigationArticles)

  const buttons = document.getElementById("buttons") as HTMLButtonElement
  buttons.classList.add(styles.buttons)

  const content = document.getElementById("content") as HTMLDivElement

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

      const article = document.createElement('div');
      article.classList.add(styles.article)
      article.innerHTML = getArticle(data)

      const button = document.createElement('button')
      button.id = (data.id).toString()
      button.classList.add(styles.libraryButton)
      button.innerText = handleButtonText(data.id)
      button.addEventListener('click', () => {
        handleClick(data.id)
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
