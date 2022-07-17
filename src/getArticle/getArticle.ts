import { Article } from '..'
import styles from './getArticle.module.scss'

export const getArticle = ({ title, newsSite, publishedAt, summary, url, imageUrl }: Article) => {
  const shortSummary = summary.substring(0, 200);
  const shortPublishingDate = publishedAt.substring(0, 10)
  return `
        <div class=${styles.content}>
          <p class=${styles.title}>${title}</p>
          <p>${shortSummary}</p>
          <p class=${styles.publishedAt}>${newsSite}, ${shortPublishingDate}</p>
          <button class=${styles.button}>
            <a href=${url} target="_blank" rel="noopener noreferrer"}>Read article >> </a>
          </button>
        </div >
        <img class=${styles.image} src=${imageUrl} alt='image'>
      `
}
