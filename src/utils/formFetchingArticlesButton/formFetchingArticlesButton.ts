import styles from './formFetchingArticlesButton.module.scss'

export const formFetchingArticlesButton = (numberOfArticles: string) => {

  const formFetchingArticlesButton = document.createElement('button')
  formFetchingArticlesButton.type = 'button'
  formFetchingArticlesButton.innerText = numberOfArticles
  formFetchingArticlesButton.classList.add(styles.button)
  formFetchingArticlesButton.classList.add('formFetchingArticlesButton')

  return formFetchingArticlesButton
}




