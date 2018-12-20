const addBtn = document.querySelector('#new-toy-btn');
const toyForm = document.querySelector('.container');
const toyCollection = document.querySelector("#toy-collection"); //Pulling toy-collection id from html document
const realForm = document.querySelector(".add-toy-form");
let addToy = false;
let url = 'http://localhost:3000/toys';


fetch(url)
.then(resp => resp.json())
.then( function(data) {
   displayToys(data)
})
//   < div class="card" >
//     <h2>Woody</h2>
//     <img src=toy_image_url class="toy-avatar" />
//     <p>4 Likes </p>
//     <button class="like-btn">Like <3</button>
// </div >

//Function to iterate over toys object
function displayToys(toys) {
  toys.forEach(renderSingleToy)
}

const renderSingleToy = (toy) => {
    //Creating a main div element for a toy
    let toyDiv = document.createElement('div');
    //Sets or eturn the class name of an element
    toyDiv.dataset.id = toy.id; //creating a dataset id for toy likes
    toyDiv.className = "card";
    let toyName = document.createElement('h2');
    // Sets or returns the text content of the specified node, and all its descendants.
    toyName.innerText = toy.name;
    let toyImage = document.createElement('img');
    toyImage.src = toy.image;
    toyImage.className = "toy-avatar";
    let toyLikes = document.createElement('p');
    toyLikes.innerText = `${toy.likes} Likes`;
    let toyButton = document.createElement('button');
    toyButton.className = "like-btn";
    toyButton.innerText = "Like <3";
    //Appending element(toyName) to existing DOM node(toyDiv) in order for it to appear
    toyDiv.appendChild(toyName)
    toyDiv.appendChild(toyImage)
    toyDiv.appendChild(toyLikes)
    toyDiv.appendChild(toyButton)

    toyCollection.appendChild(toyDiv)
  
}

function createNewToy(e){
  e.preventDefault()

  let inputs = document.querySelectorAll(".input-text");
  let name = inputs[0].value;
  let image = inputs[1].value;


let data = {
  name: name,
  image: image,
  likes:0
}

let fetchData = {
  method: 'POST',
  body: JSON.stringify(data),
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
}

  fetch(url, fetchData )
  .then(resp => resp.json())
  .then(renderSingleToy)

  
}

toyCollection.addEventListener('click', (event) => {
  console.log(event)
  let likeButton = event.target.className === "like-btn"

  if (likeButton) {
    let id = event.target.parentElement.dataset.id // Retrieves "id" of parent element of the current node
    let like = event.target.previousElementSibling  // get previous element in list
    let likeCount = parseInt(event.target.previousElementSibling.innerText); //turning likes count into number from string 

    like.innerText = `${++likeCount} likes`

    fetch(url + '/' + id, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        likes: likeCount
      })

    })
    .then(resp => resp.json())
    .then(console.log)
  }
})


addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    // submit listener here
    realForm.addEventListener('submit', createNewToy)
  } else {
    toyForm.style.display = 'none'
  }
})




