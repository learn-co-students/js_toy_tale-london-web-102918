const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const toysUrl = 'http://localhost:3000/toys'
const toyList = document.getElementById('toy-collection')
const addNewToyForm = document.querySelector(".add-toy-form")
const nameInput = document.querySelector("[name='name']")
const imgInput = document.querySelector("[name='image']")
const state = {
  toys: []
}
let addToy = false

// YOUR CODE HERE

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    addNewToyForm.addEventListener('submit', handleEdit)
  } else {
    toyForm.style.display = 'none'
  }
})

function handleEdit(event) {
  event.preventDefault()
  fetch(toysUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        "name": nameInput.value,
        "image": imgInput.value,
        "likes": 0
      })
    }).then(res => res.json())
    .then(res => {
      renderSingleToy(res)
      //reset the form and hide it
      nameInput.value = ''
      imgInput.value = ''
      addToy = false
      toyForm.style.display = 'none'
    })
}

function renderSingleToy(toy) {
  const toyEl = document.createElement('div')
  toyEl.className = 'card';
  toyEl.innerHTML = `
      <h2>${toy.name}</h2> 
      <img src="${toy.image}" class="toy-avatar"/>
      <p>${toy.likes} Likes </p>
      <button class="like-btn">  Like  </button>
      `
  toyBtn = toyEl.querySelector('.like-btn')
  toyBtn.addEventListener('click', () => handleLikeClick(toy.id))
  toyEl.id = `toy-${toy.id}`
  toyList.appendChild(toyEl)
}

function handleLikeClick(toyId) {
  let toy = state.toys[getToyIndexById(toyId)]
  const incrementedLikes = toy.likes + 1;

  fetch(`${toysUrl}/${toy.id}`, {
      method: 'PATCH',
      headers: {
        "Content-type": "application/json",
        "Accept": 'application/json'
      },
      body: JSON.stringify({
        likes: incrementedLikes
      })
    })
    .then(resp => resp.json())
    .then(rerenderToy)
}

const getToyIndexById = (id) => {
  return state.toys.findIndex((currentToy) => {
    return id === currentToy.id
  })
}

function rerenderToy(toy) {
  // find toy that needs updating
  // change that toy object
  // put it back into the array
  const toyIndexToUpdate = getToyIndexById(toy.id)
  state.toys[toyIndexToUpdate] = toy
  const toyEl = document.querySelector(`#toy-${toy.id} p`);
  toyEl.innerText = `${toy.likes} Likes`
}

function fetchToys() {
  fetch(`${toysUrl}`)
    .then(response => response.json())
    .then(toys => {
      state.toys = toys
      renderToys(toys)
    })
}

function renderToys(toys) {
  toys.forEach(renderSingleToy)
}

fetchToys()