import { addImage, removeImage } from "./buttonImages"

export const handleButtonImage = (id: number): string => {

  const articlesIds = localStorage.getItem('ids')
  const areArticlesIdsStored = !!articlesIds

  if (areArticlesIdsStored) {
    const parsedArticlesIds: number[] = JSON.parse(articlesIds)

    if (parsedArticlesIds.includes(id)) {
      return removeImage
    } else {
      return addImage
    }
  } else {
    return addImage
  }
}
