const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
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


// OR HERE!

const toyApi = "http://localhost:3000/toys"
const toyCollection = document.querySelector('#toy-collection')
const toyNameElement = document.querySelector('input[name=name]')
const toyImageElement = document.querySelector('input[name=image]')
const toyFormElement = document.querySelector('.add-toy-form')

toyFormElement.addEventListener('submit', saveNewToy)

//fetch toys from toy api and parse JSON
function fetchToys() {
  fetch(toyApi)
    .then(response => response.json())
    .then(renderToys)
}

//render each toy from the toy array
function renderToys(toyArray) {
  console.log(toyArray)

  toyArray.forEach(renderSingleToy)
}

//add toy info to toy-collection 
function renderSingleToy(toy) {
  // const toyElement = document.createElement('li')
  toyCollection.innerHTML += `
    <div class="card">
      <h2>${toy.name}</h2>
      <img src="${toy.image}" class="toy-avatar">
      <p>${toy.likes}</p>
      <button class="like-btn">Like <3</button>
    </div>
  `
}

//save new toy to collection
function saveNewToy(event) {
  event.preventDefault()
  console.log(event)
  const name = toyNameElement.value
  const imageURL = toyImageElement.value
  renderSingleToy({
    name: name,
    image: imageURL,
    likes: 0
  })

  fetch(toyApi, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name,
      image: imageURL,
      likes: 0
    })
  }).then(console.log)
}

//increase a toy's likes
function addLikes() {
  document.addEventListener('click', (event) => {
    if (event.target.className === "like-btn") {
      let likeNum = event.target.previousElementSibling
      likeNum.innerText = parseInt(likeNum.innerText) + 1
      likeToy(event.target.dataset.id, parseInt(likeNum.innerText)).then(console.log)
    }
  })
}

function likeToy(id, data) {
  return fetch(toyApi + `/${id}`, {
    method: 'PATCH',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({likes: data})
  }).then(response => response.json())
}

fetchToys()
addLikes()