document.addEventListener('DOMContentLoaded', () => {
  const addBtn = document.querySelector('#new-toy-btn')
  const toyForm = document.querySelector('.container')
  const apiURL = 'http://localhost:3000/toys'
  const toyCollectionEl = document.getElementById('toy-collection')
  const toyNameEl = document.querySelector('input[name=name]')
  const toyImageEl = document.querySelector('input[name=image]')
  let addToy = false
  // YOUR CODE HERE

  addBtn.addEventListener('click', () => {
    // hide & seek with the form
    addToy = !addToy
    if (addToy) {
      toyForm.style.display = 'block'
      // submit listener here
    } else {
      toyForm.style.display = 'none'
    }
  })

  toyForm.addEventListener('submit', addNewToy)

  // OR HERE!

  function getToys () {
    fetch(apiURL)
      .then(response => response.json())
      .then(json => {
        renderAllToys(json)
      })
  }

  function renderAllToys (json) {
    for (const toy of json) {
      renderOneToy(toy)
    }
  }

  function renderOneToy (toy) {
    const toyDivEl = document.createElement('div')
    toyDivEl.setAttribute('class', 'card')
    toyDivEl.innerHTML = `
    <h2>${toy.name}</h2>
    <img src='${toy.image}' class='toy-avatar'>
    <p>${toy.likes} likes</p>
    `
    let likeButton = document.createElement('button')
    likeButton.setAttribute('data-id', `${toy.id}`)
    likeButton.setAttribute('class', 'like-btn')
    likeButton.innerText = 'Like<3'
    likeButton.addEventListener('click', likeToy)
    toyCollectionEl.appendChild(toyDivEl)
    toyDivEl.appendChild(likeButton)
  }

  function addNewToy (event) {
    event.preventDefault()
    const name = toyNameEl.value
    const image = toyImageEl.value
    let likes = 0
    saveNewToy(name, image)
  }

  function saveNewToy (name, image, likes = 0) {
    fetch(apiURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        image: image,
        likes: likes
      })
    }).then(renderOneToy({
      name: name,
      image: image,
      likes: likes
    }))
  }

  function likeToy (event) {
    let id = event.target.dataset.id
    let likes = event.target.previousElementSibling
    likes.innerText = `${parseInt(likes.innerText) + 1} likes`
    patchToy(id, likes.innerText)
  }

  function patchToy (id, patch) {
    fetch(`http://localhost:3000/toys/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ likes: patch })
    })
  }

  getToys()
})
