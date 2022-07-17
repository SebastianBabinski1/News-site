import { Article } from "../../.."
import { url } from "../../../utils"
import styles from "../../../style.module.scss";
import libraryButton from "../../../utils/libraryButton/libraryButton";
import articleWrapper from "../../../utils/articleWrapper/articleWrapper";
import { compareAscending, compareDescending } from "./filters";


const handleSortingButton = async (type: string, direction: string) => {
  const navigation = document.getElementById("navigation") as HTMLFormElement
  navigation.classList.add(styles.navigation)

  const navigationArticles = document.getElementById("navigationArticles") as HTMLFormElement
  navigationArticles.classList.add(styles.navigationArticles)

  const buttons = document.getElementById("buttons") as HTMLFormElement
  buttons.classList.add(styles.buttons)

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
            const article = articleWrapper(el)

            const button = libraryButton(el.id)

            button.addEventListener('click', () => {
              content.removeChild(article)
            }
            )
            article.appendChild(button)
            content.appendChild(article)
          })
          break

        case 'title':
          const getSortedByTitle = () => {
            const articlesSecondCopy = [...articles]

            switch (direction) {
              case 'ascending':
                return articlesSecondCopy.sort(compareAscending)
              case 'descending':
                return articlesSecondCopy.sort(compareDescending)
              default:
                return articlesSecondCopy.sort(compareAscending)
            }
          }
          const sortedArticlesDataByTitle = getSortedByTitle()

          content.innerHTML = ''

          sortedArticlesDataByTitle.forEach(el => {
            const article = articleWrapper(el)

            const button = libraryButton(el.id)

            button.addEventListener('click', () => {
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
