const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false
const toyCollection = document.querySelector('#toy-collection');
const addToyForm = document.querySelector('.add-toy-form')


// Load all event listeners
function loadEventListener() {

  // DOM Load event
  document.addEventListener('DOMContentLoaded', fetchToys);
  // Add Toy event
  addToyForm.addEventListener('submit', addNewToy)
  // Add Likes Event
  document.addEventListener('click', (e) => {
    console.log(e.target.dataset.id)
    if (e.target.className === 'like-btn') {
      const id = e.target.dataset.id
      const toyEl = document.getElementById(`card-${id}`)
      const toyLikes = toyEl.querySelector(".toy-likes")

      let numLikes = Number(toyLikes.innerText.split(' ')[0]);
      
      fetch(`http://localhost:3000/toys/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({likes: numLikes += 1})
      })
      .then(response => response.json())
      .then(toyLikes.innerText = `${numLikes} Likes`)
    }
  })
}


// Add a toy
function addNewToy(e) {
  e.preventDefault()
  const toyName = document.querySelector("#toyname").value
  const toyImg = document.querySelector("#toyimg").value

  fetch("http://localhost:3000/toys", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: toyName, 
      image: toyImg,
      likes: 0}) 
  })
  .then(response => response.json())
  .then(response => renderSingleToy(response))
}

// Fetch request for Toys
function fetchToys() {
  fetch("http://localhost:3000/toys")
    .then(response => response.json())
    .then(toysArray => {
      renderToys(toysArray)
  })
}

function renderToys(toysArray) {
  toysArray.forEach(toy => renderSingleToy(toy))
}

function renderSingleToy(toy) {
  // create element
  const toyDivEl = document.createElement('div')
  toyDivEl.className = 'card'
  toyDivEl.id = `card-${toy.id}`

  toyDivEl.innerHTML = `
    <h2>${toy.name}</h2>
    <img class='toy-avatar' src='${toy.image}' />
    <p class="toy-likes">${toy.likes} Likes</p>
    <button data-id=${toy.id} class='like-btn'>Like</button>
  `
  toyCollection.appendChild(toyDivEl)
}

function likeToy(toyLikesEl) {
  const numLikes = Number(toyLikesEl.innerText.split(' ')[0]);
  toyLikesEl.innerText = `${numLikes + 1} Likes`;

} 

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

loadEventListener()



