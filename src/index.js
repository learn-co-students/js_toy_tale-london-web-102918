const toysURL = 'http://localhost:3000/toys'
const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const newToyName = toyForm.querySelector('input[name=name]')
const newToyImage = toyForm.querySelector('input[name=image]')
const createToyBtn = toyForm.querySelector('input[name=submit]')
const toyCollectionDiv = document.getElementById('toy-collection')
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

// fetch all toys
const fetchToys = () => {
  fetch(toysURL)
    .then(response => response.json())
    .then((toys) => renderAllToys(toys))
}

// render a single toy
const renderSingleToy = (toy) => {
  const toyCardDiv = document.createElement('div')
  const toyLikesBtn = document.createElement('button')
  toyCardDiv.className = 'card'
  toyCardDiv.innerHTML = `
    <h2>${toy.name}</h2>
    <img src="${toy.image}" class='toy-avatar' alt="Image for ${toy.name}.">
    <p id="likes-${toy.id}">${toy.likes} likes</p>
  `
  toyLikesBtn.id = toy.id
  toyLikesBtn.className = "like-btn"
  toyLikesBtn.innerText = "Like <3"
  toyLikesBtn.addEventListener('click', (event) => likeToy(event, toy))
  toyCollectionDiv.appendChild(toyCardDiv)
  toyCardDiv.appendChild(toyLikesBtn)
}
// render all the toys
const renderAllToys = (toys) => {
  toys.forEach((toy) => {
    renderSingleToy(toy)
  });
}

// create a new toy
const saveNewToy = (event) => {
  event.preventDefault()
  fetch(toysURL, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      "name": newToyName.value,
      "image": newToyImage.value,
      "likes": 0
    })
  })
    .then(response => response.json())
    .then((toy) => {
      renderSingleToy(toy)
      toyForm.reset()
    })
}

// increase likes on a toy
const likeToy = (event, toy) => {
  console.log(event.target.id);

  let increasedLikes = ++toy.likes
  fetch(`${toysURL}/${toy.id}`, {
    method: 'PATCH',
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      "likes": increasedLikes
    })
  })
    .then(response => response.json())
    .then((updatedToy) => {
      let toyLikes = document.getElementById(`likes-${updatedToy.id}`)
      toyLikes.innerText = `${updatedToy.likes} likes`
    })


}

// call initial fetch function
fetchToys()

toyForm.addEventListener('submit', saveNewToy)