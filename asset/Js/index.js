const form = document.querySelector('#searchfrm')
const imgDiv = document.querySelector('#imagecontainer')

form.addEventListener('submit', async e => {
  e.preventDefault()
  const query = form.elements.yo.value
  const config = { params: { q: query } }
  const res = await axios.get('https://api.tvmaze.com/search/shows?q=', config)
  if (imgDiv.childNodes.length !== 0) {
    removeAllChildNodes(imgDiv)
  }
  setTimeout(() => {
    imgCreate(res.data)
  }, 0)
  form.elements.yo.value = ''
})

function removeAllChildNodes (parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild)
  }
}

const imgCreate = shows => {
  for (result of shows) {
    if (result.show.image.medium) {
      const data = {
        image: result.show.image.medium,
        name: result.show.name,
        language: result.show.language,
        genres: result.show.genres,
        status: result.show.status,
        link: result.show.url
      }
      document.querySelector('.card-title').innerHTML = data.name
      document.querySelector('#lang').innerHTML = data.language
      document.querySelector('#sat').innerHTML = data.status
      document.querySelector('#gen').innerHTML = ` ${data.genres}`
      document.querySelector('.links').setAttribute('href', data.link)
      console.log(result)
      const img = document.querySelector('.card-img-top')
      img.src = data.image
      const card = document.querySelector('#main-card')
      const clone = card.cloneNode(true)
      imgDiv.append(clone)
      clone.classList.remove('dis-non')
    }
  }
}
