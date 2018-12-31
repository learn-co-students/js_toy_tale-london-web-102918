const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const toyCollection = document.querySelector('#toy-collection')
const newToyName = document.querySelector('input[name=name]')
const newToyImage = document.querySelector('input[name=image]')
const createToyBtn = document.querySelector('input[name=submit')
const addToyForm = document.querySelector('.add-toy-form')

let addToy = false

// YOUR CODE HERE

addBtn.addEventListener('click', (newToy) => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    // submit listener here
  } else {
    toyForm.style.display = 'none'
  }
})


// OR HERE!
const toyApi = `http://localhost:3000/toys`

const fetchToys = () => {
fetch(toyApi)
  .then(res => res.json())
  .then((toys) => renderAllToys(toys));
}

const renderAllToys = (toys) => {
toys.forEach((toy) => {
renderSingleToy(toy)
})
}

const renderSingleToy = (toy) => {
const toyCard = document.createElement('div')
const toyLikesButton = document.createElement('button')
toyCard.className = "card"
toyCard.innerHTML =
`
    <h2>${toy.name}</h2>
    <img src=${toy.image}" class="toy-avatar" />
    <button class="like-btn">Like <3</button>
    <p id="likes-${toy.id}">${toy.likes} likes</p>
  `

toyLikesButton.id = toy.id
toyLikesButton.className = "like-btn"
toyLikesButton.innerText = "Like <3"

toyCollection.appendChild(toyCard)
}

// addBtn.addEventListener('submit', (event) => newToy(event));




const newToy = (event) => {
  event.preventDefault()
    fetch(toyApi, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: "application/json"
},
body: JSON.stringify({
  name: newToyName.value,
  image: newToyImage.value,
  likes: 0
})
}).then(res => res.json())
  .then(addToyForm.reset())
}

addToyForm.addEventListener('submit', newToy)

fetchToys()
