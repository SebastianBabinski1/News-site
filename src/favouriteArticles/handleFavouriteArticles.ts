import { Article } from ".."
import { getArticle } from "../getArticle"
import { handleButtonText, handleClick, url } from "../utils"


const handleFavouriteArticles = () => {
  const content = document.getElementById("content") as HTMLDivElement

  const articlesIds = localStorage.getItem('ids')
  const areArticlesIdsStored = !!articlesIds

  if (areArticlesIdsStored) {
    const parsedArticlesIds: number[] = JSON.parse(articlesIds)

    parsedArticlesIds.forEach(async (id) => {

      const response = await fetch(`${url}/${id}`)
      const data: Article = await response.json()

      const article = document.createElement('div');
      article.innerHTML = getArticle(data)

      const button = document.createElement('button')
      button.id = (data.id).toString()
      button.innerText = handleButtonText(data.id)
      button.addEventListener('click', () => handleClick(data.id))
      article.appendChild(button)

      content.appendChild(article)
    })
  }
}

export default handleFavouriteArticles
