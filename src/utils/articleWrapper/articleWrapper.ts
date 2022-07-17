import { Article } from '../..'
import { getArticle } from '../../getArticle'
import styles from './articleWrapper.module.scss'

const articleWrapper = (item: Article) => {
  const article = document.createElement('div')
  article.classList.add(styles.article)
  article.innerHTML = getArticle(item)

  return article
}

export default articleWrapper
