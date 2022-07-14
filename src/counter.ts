
const handleCounter = async (renderedArticles: number) => {

  try {
    const response = await fetch('https://api.spaceflightnewsapi.net/v3/articles/count')
    const numberOfArticles = await response.json()

    const counter = document.getElementById('counter') as HTMLDivElement

    counter.innerHTML = `<p>Rendered articles:</p><p>${renderedArticles}/${numberOfArticles}</p>`
  }
  catch (error) {
    console.log(error);

  }
}

export default handleCounter
