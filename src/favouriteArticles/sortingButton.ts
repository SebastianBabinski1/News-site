import handleSortingButton from "./utils/handleSorting"

const sortingButton = (sortingType: string): HTMLElement => {

  const button = document.createElement('button')

  button.innerText = `${sortingType}: ascending`

  let isAscending = true

  button.addEventListener('click', () => {
    const direction = isAscending ? "ascending" : "descending"
    handleSortingButton(sortingType, direction)
    isAscending = !isAscending
    button.innerText = isAscending ? `${sortingType}: ascending` : `${sortingType}: descending`
  })

  return button
}

export default sortingButton
