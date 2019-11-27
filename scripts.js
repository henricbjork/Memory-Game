const cards = [
    {image: "./img/björk.png"},
    {image: "./img/masterofpuppets.jpeg"},
    {image: "./img/darkside.jpeg"},
    {image: "./img/heroes.jpeg"},
    {image: "./img/björk.png"},
    {image: "./img/masterofpuppets.jpeg"},
    {image: "./img/darkside.jpeg"},
    {image: "./img/heroes.jpeg"}
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
const stringToHTML = str => {
    const div = document.createElement("div");
    div.innerHTML = str;
    return div.firstChild;
  };

// This function creates an image tag from the cards array
const createCard = (image) => {
    return `<div class="memoryCard"><img class="frontFace" src="${image}"><img class="backFace" src="https://data2.polantis.com/image1000/data/286/276/8983/formats/17/96/Alucobond-Yellow_Green_313_d.jpg"></div>`
}

// This function generates the cards from the cards array to the DOM and appends it to the memoryContainer
const generateCards = () => {
    cards.forEach((card) => {
        const element = createCard(card.image);
        memoryContainer.appendChild(stringToHTML(element));
    })
}

// First shuffles the cards array
// Then generates the cards to the DOM
// Then disables the startbutton after clicked once
const startGame = () => {
    shuffle(cards); //Shuffles the cards everytime the start button is pressed
    generateCards(); 
    startButton.removeEventListener('click', startGame);
}

startButton.addEventListener('click', startGame);
resetButton.addEventListener('click', startGame);

const memoryCards = document.querySelectorAll('.memoryCard');

const flipCard = () => {
    console.log('hi');
}

memoryCards.forEach(memoryCard => {
    memoryCard.addEventListener('click', flipCard);
})