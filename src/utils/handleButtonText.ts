import { ButtonText } from "./handleLibrarySavingClick"

export const handleButtonText = (id: number): string => {

  const articlesIds = localStorage.getItem('ids')
  const areArticlesIdsStored = !!articlesIds

  if (areArticlesIdsStored) {
    const parsedArticlesIds: number[] = JSON.parse(articlesIds)

    if (parsedArticlesIds.includes(id)) {
      return ButtonText.REMOVE
    } else {
      return ButtonText.ADD
    }
  } else {
    return ButtonText.ADD
  }
}
