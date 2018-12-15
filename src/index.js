const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false
const apiURL = 'http://localhost:3000/toys'
const toyFormEl = document.querySelector('#toy-form')
const toyNameEl = document.querySelector('#toy-name')
const toyImageEl = document.querySelector('#toy-image')
const toyListEl = document.querySelector('#toy-collection')



// YOUR CODE HERE

function fetchToys() {
  fetch(apiURL)
    .then(response => response.json())
    .then(renderToys)
}

function renderToys(toysArray) {
  console.log(toysArray)
  toysArray.forEach(renderSingleToy)
}

function renderSingleToy(toy) {
  const toyEl = document.createElement('el')
  toyEl.innerHTML = `<div class='card'><h2>${toy.name}</h2> \n <img src='${toy.image}' class='toy-avatar'>\n <p>${toy.likes} Likes</p><button class='like-btn' data-id='${toy.id}'>Like <3</button></div>`
  toyListEl.append(toyEl)
}

function saveNewToy(e) {
  e.preventDefault()
  console.log(e)
  const name = toyNameEl.value
  const imageURL = toyImageEl.value

  renderSingleToy({
    name: name,
    image: imageURL,
    likes: 0
  })

  fetch(apiURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: name,
      image: imageURL,
      likes: 0
    })
  }).then(console.log)



  }

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    // submit listener here
    toyFormEl.addEventListener('submit', saveNewToy)
    }
    else {
    toyForm.style.display = 'none'
  }
})


function addClicksToLikes(){
  document.addEventListener('click', (e) => {
    // conditionally render the like number
    if (e.target.className === "like-btn") {
      let likeNum = e.target.previousElementSibling
      likeNum.innerText = parseInt(likeNum.innerText) + 1
      likeToy(e.target.dataset.id, parseInt(likeNum.innerText)).then(console.log)
    }
  })
}




function likeToy(toyId, data) {
  // send a patch request to server increasing a toy's like count
  return fetch(apiURL + `/${toyId}`, {
    method: 'PATCH',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({likes: data})
  }).then(res => res.json())
}

// OR HERE!
fetchToys()
addClicksToLikes()
