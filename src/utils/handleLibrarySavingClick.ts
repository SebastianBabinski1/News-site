import { addImage, removeImage } from "./buttonImages"

export const handleLibrarySavingClick = (id: number): void => {
  const parsedId = id.toString()
  const button = document.getElementById(parsedId) as HTMLButtonElement

  const articlesIds = localStorage.getItem('ids')
  const areArticlesIdsStored = !!articlesIds

  if (areArticlesIdsStored) {
    const parsedArticlesIds: number[] = JSON.parse(articlesIds)

    if (parsedArticlesIds.includes(id)) {
      const filteredTable = parsedArticlesIds.filter((el) => el !== id)

      localStorage.setItem('ids', JSON.stringify(filteredTable))

      button.innerHTML = addImage
    } else {
      parsedArticlesIds.push(id)
      localStorage.setItem('ids', JSON.stringify(parsedArticlesIds))

      button.innerHTML = removeImage
    }
  } else {
    localStorage.setItem('ids', JSON.stringify([id]))

    button.innerHTML = removeImage

  }
  console.log(localStorage)
}
