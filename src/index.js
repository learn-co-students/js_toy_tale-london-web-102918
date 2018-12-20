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

const toyURL = 'http://localhost:3000/toys'

document.addEventListener('DOMContentLoaded', () => {

  const submitNewToy = (e) => {
    e.preventDefault()
    const inputName = e.target.querySelector('input[name="name"]')
    const inputImg = e.target.querySelector('input[name="image"]')

    const newToyData = {
      name: inputName.value,
      image: inputImg.value,
      likes: 0
    }
    
    fetch(toyURL, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newToyData)
    }).then(response => response.json())
    .then(renderSingleToy)

  }

  const toyForm = document.querySelector('.add-toy-form')
  toyForm.addEventListener('submit', submitNewToy)

  fetch(toyURL)
  .then(response => response.json())
  .then(renderToys)

})

const renderToys = toys => {
  toys.forEach(renderSingleToy)
}

const renderSingleToy = toy => {
  const toyContainer = document.querySelector('#toy-collection')
  const newToy = document.createElement('div')
  newToy.className = 'card'
  newToy.innerHTML = 
  `
  <h2>${toy.name}</h2>
  <img src="${toy.image}" class="toy-avatar" />
  <p>${toy.likes} Likes </p>
  <button class="like-btn" >Like <3</button>
  `
  toyContainer.appendChild(newToy)

  const likeButton = newToy.querySelector('button')

  const addLike = (e) => {
      const toyLike = e.target.parentElement.querySelector('p')
      const addOneLike = toy.likes++
      addOneLike
  
      fetch(`${toyURL}/${toy.id}`, {
        method: 'PATCH',
        headers: {
          "Content-Type": "application/json"
        }, 
        body: JSON.stringify({
          likes: toy.likes
        })
      }).then(response => response.json())
      .then(e.target.parentElement.querySelector('p').innerHTML = `${toy.likes} Likes`)
    }
  


  likeButton.addEventListener('click', addLike)

  }



// data-id="${toy.id}"