const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const toysURL = 'http://localhost:3000/toys'
const toyCollection = document.getElementById('toy-collection')
let addToy = false
const newToyButton = document.querySelector('input[name=submit]')

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

function fetchToys() {
  fetch(`${toysURL}`)
  .then(response => response.json())
  .then(toys => renderToys(toys))
}

function renderToys(toysArray) {
  toysArray.forEach(renderSingleToy)
}
function renderSingleToy(toy) {
  const toyDivElement = document.createElement('div')
  const toyBtn = document.createElement('button')
  toyDivElement.className = 'card'
  toyDivElement.id = toy.id
  toyDivElement.innerHTML = `
    <h2>${toy.name}</h2>
    <img src="${toy.image}" class='toy-avatar' alt="Picture of Toy: ${toy.name}">
    <p id = likes-${toy.id}>${toy.likes} likes</p>
  `
  toyBtn.className = "like-btn"
  toyBtn.id = `${toy.id}`
  toyBtn.innerText = "Like <3"
  toyCollection.appendChild(toyDivElement)
  toyDivElement.appendChild(toyBtn)
  toyBtn.addEventListener('click', likeToy(`${toy.id}`))
}

function saveNewToy(event) {
  event.preventDefault()
  const toyName = document.querySelector('input[name=name]').value
  const toyImage = document.querySelector('input[name=image]').value
  renderSingleToy({
    name: toyName,
    image: toyImage,
    likes: 0
  })

  fetch(`${toysURL}`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: toyName,
      image: toyImage,
      likes: 0
    })
  })
}

function likeToy(id) {
  let toyLikes = document.getElementById(`likes-${id}`).innerText
  toyLikes = Number(toyLikes.split(" ")[0]) + 1
  fetch(`${toysURL}/${id}`, {
    method: 'PATCH',
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      likes: toyLikes
    })
  })
  fetchToys
}  //NEEDS INVESTIGATION FOR CORS ERROR.

newToyButton.addEventListener('click', saveNewToy)

fetchToys()
