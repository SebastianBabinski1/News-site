import { Article } from "../.."
import { getArticle } from "../../getArticle"
import { handleButtonText, handleClick, url } from "../../utils"

const handleSortingButton = async (type: string, direction: string) => {
  const content = document.getElementById("content") as HTMLDivElement

  const articlesIds = localStorage.getItem('ids') as string
  const parsedArticlesIds: number[] = JSON.parse(articlesIds)

  const areArticlesIdsStored = !!parsedArticlesIds

  if (areArticlesIdsStored) {

    const getData = (): Promise<Article>[] => {

      return parsedArticlesIds.map(async (id) => {

        const response = await fetch(`${url}/${id}`)
        const article: Article = await response.json()

        return article
      })
    }

    const handleSorting = async () => {
      const articles = await Promise.all(getData())
      console.log(articles)

      switch (type) {
        case 'publishedDate':
          console.log('by publishedDate')
          const getSorted = () => {
            const articlesCopy = [...articles]

            return articlesCopy.sort((current, next) => {
              switch (direction) {
                case 'ascending':
                  return Date.parse(current.publishedAt) - Date.parse(next.publishedAt)
                case 'descending':
                  return Date.parse(next.publishedAt) - Date.parse(current.publishedAt)
                default:
                  return Date.parse(current.publishedAt) - Date.parse(next.publishedAt)
              }
            })
          }
          const sortedArticlesData = getSorted()

          content.innerHTML = ''

          sortedArticlesData.forEach(el => {
            const article = document.createElement('div')
            article.innerHTML = getArticle(el)

            const button = document.createElement('button')
            button.id = (el.id).toString()
            button.innerText = handleButtonText(el.id)
            button.addEventListener('click', () => {
              handleClick(el.id)
              content.removeChild(article)
            }
            )
            article.appendChild(button)
            content.appendChild(article)
          })
          break

        case 'title':
          console.log('by title')

          const getSortedByTitle = () => {
            const articlesSecondCopy = [...articles]
            return articlesSecondCopy.sort((current, next) => {
              switch (direction) {
                case 'ascending':
                  return parseInt(current.title) - parseInt(next.title)
                case 'descending':
                  return parseInt(next.title) - parseInt(current.title)
                default:
                  return parseInt(current.title) - parseInt(next.title)
              }
            })
          }
          const sortedArticlesDataByTitle = getSortedByTitle()

          content.innerHTML = ''

          sortedArticlesDataByTitle.forEach(el => {
            const article = document.createElement('div')
            article.innerHTML = getArticle(el)

            const button = document.createElement('button')
            button.id = (el.id).toString()
            button.innerText = handleButtonText(el.id)
            button.addEventListener('click', () => {
              handleClick(el.id)
              content.removeChild(article)
            }
            )
            article.appendChild(button)
            content.appendChild(article)
          })
          break
      }
    }
    handleSorting()


  } else {
    console.log('Nothing to sort :(')
  }
}

export default handleSortingButton
