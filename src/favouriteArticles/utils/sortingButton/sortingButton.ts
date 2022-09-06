import handleSortingButton from "../handleSorting/handleSorting";
import styles from './sortingButton.module.scss';

const sortingButton = (sortingType: string): HTMLElement => {

  const button = document.createElement('button')
  button.classList.add(styles.button)
  const text = sortingType === 'publishedDate' ? 'By publication date' : 'By title'
  button.innerText = `${text}: ascending`

  let isAscending = true

  button.addEventListener('click', () => {
    const direction = isAscending ? "ascending" : "descending"
    handleSortingButton(sortingType, direction)
    isAscending = !isAscending
    button.innerText = isAscending ? `${text}: ascending` : `${text}: descending`
  })

  return button
}

export default sortingButton
