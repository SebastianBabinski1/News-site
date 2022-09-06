import { handleButtonImage } from "../handleButtonImage";
import { handleLibrarySavingClick } from "../handleLibrarySavingClick"
import styles from "./libraryButton.module.scss";

const libraryButton = (id: number): HTMLButtonElement => {
  const button = document.createElement('button')

  button.id = (id).toString()
  button.classList.add(styles.libraryButton)
  button.innerHTML = handleButtonImage(id)
  button.addEventListener('click', () => handleLibrarySavingClick(id)
  )

  return button
}

export default libraryButton
