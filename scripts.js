const cards = [
    {image: "./img/björk.png", type: "bjork"},
    {image: "./img/masterofpuppets.jpeg", type: "metallica"},
    {image: "./img/darkside.jpeg", type: "darkside"},
    {image: "./img/heroes.jpeg", type:"bowie"},
    {image: "./img/björk.png", type: "bjork"},
    {image: "./img/masterofpuppets.jpeg", type: "metallica"},
    {image: "./img/darkside.jpeg", type: "darkside"},
    {image: "./img/heroes.jpeg", type:"bowie"}
]

const memoryContainer = document.querySelector('.memoryContainer');
const startButton = document.querySelector('.startButton');
const resetButton = document.querySelector('.resetButton')

/**
 * Shuffles array in place.
 * @param {Array} a items An array containing the items.
 */
function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

// Helper function to prevent XSS injections
// Creates an HTML element from string
function stringToHTML (str) {
    const div = document.createElement("div");
    div.innerHTML = str;
    return div.firstChild;
  };

// This function creates an image tag from the cards array
function createCard(image, type) {
    return `<div class="memoryCard" data-framework="${type}"><img class="frontFace" src="${image}">
            <img class="backFace" src="https://www.dtgmart.com/wp-content/uploads/2015/05/bright-foil-red-heat-transfer-vinyl.jpg">
    </div>`
}

// This function generates the cards from the cards array to the DOM and appends it to the memoryContainer
function generateCards() {
    cards.forEach((card) => {
        const image = createCard(card.image, card.type);
        memoryContainer.appendChild(stringToHTML(image));
    })
}

// This generates the cards to the DOM on load
generateCards(); 

// First shuffles the cards array
// Then disables the startbutton after clicked once
function startGame() {
    shuffle(cards); //Shuffles the cards everytime the start button is pressed
    startButton.removeEventListener('click', startGame);
}

startButton.addEventListener('click', startGame);
resetButton.addEventListener('click', startGame);

const memoryCards = document.querySelectorAll('.memoryCard');

let hasFlippedCard = false;
let firstCard, secondCard;

function flipCard() {

    this.classList.toggle('flip') 

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
    } else {
        hasFlippedCard = false;
        secondCard = this;
        if (firstCard.dataset.framework === secondCard.dataset.framework) {
            firstCard.removeEventListener('click', flipCard);
            secondCard.removeEventListener('click', flipCard);
        } else {
            setTimeout(() => {
                firstCard.classList.remove('flip');
                secondCard.classList.remove('flip');
            }, 1500);
        }
    }
          
}


memoryCards.forEach((memoryCard) => {
    memoryCard.addEventListener('click', flipCard)
    })
