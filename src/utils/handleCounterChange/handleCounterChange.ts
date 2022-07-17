import styles from './handleCounterChange.module.scss'

export const handleCounterChange = async (renderedArticles: number): Promise<void> => {
  try {
    const response = await fetch('https://api.spaceflightnewsapi.net/v3/articles/count')
    const numberOfArticles = await response.json()

    const counter = document.getElementById('counter') as HTMLDivElement

    counter.innerHTML = `
    <div class=${styles.wrapper}>
      <p class=${styles.text}>Articles:</p>
      <p class=${styles.text}>${renderedArticles}/${numberOfArticles}</p>
    </div>
    `
  }
  catch (error) {
    console.log(error);
  }
}
