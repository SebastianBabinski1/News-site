import styles from './getArticle.module.css'

interface Props {
  title: string;
  newsSite: string;
  publishedAt: string;
  summary: string;
  url: string;
  imageUrl: string;
}

const getArticle = ({ title, newsSite, publishedAt, summary, url, imageUrl }: Props) => {
  return (
    `
      <div class=${styles.article__content}>
        <p>title: ${title}</p>
        <p>newsSite: ${newsSite}</p>
        <p>publishedAt: ${publishedAt}</p>
        <p>summary: ${summary}</p>
        <button>
          <a href=${url} target="_blank" rel="noopener noreferrer"}>Read article</a>
        </button>
      </div >
      <img class=${styles.article__image} src=${imageUrl} alt='image'>
    `
  )
}

export default getArticle
