import { Article } from "../.."
import { getArticle } from "../../getArticle"
import { handleButtonText, handleClick, url } from "../../utils"
import sortingButton from "../sortingButton"


const handleFavouriteArticles = () => {
  const buttons = document.getElementById("buttons") as HTMLButtonElement
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
      article.innerHTML = getArticle(data)

      const button = document.createElement('button')
      button.id = (data.id).toString()
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
