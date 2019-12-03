const cards = [
    {image: "./img/björk.png", type: "bjork"},
    {image: "./img/unknown.jpg", type: "unknown"},
    {image: "./img/darkside.jpeg", type: "darkside"},
    {image: "./img/heroes.jpeg", type:"bowie"},
    {image: "./img/abbey.jpeg", type:"abbey"},
    {image: "./img/velvet.jpeg", type:"velvet"},
    {image: "./img/zeppelin.jpg", type:"zeppelin"},
    {image: "./img/pumpkins.jpg", type:"pumpkins"},
    {image: "./img/björk.png", type: "bjork"},
    {image: "./img/unknown.jpg", type: "unknown"},
    {image: "./img/darkside.jpeg", type: "darkside"},
    {image: "./img/heroes.jpeg", type:"bowie"},
    {image: "./img/abbey.jpeg", type:"abbey"},
    {image: "./img/velvet.jpeg", type:"velvet"},
    {image: "./img/zeppelin.jpg", type:"zeppelin"},
    {image: "./img/pumpkins.jpg", type:"pumpkins"}
]

const memoryContainer = document.querySelector('.memoryContainer');
const resetButton = document.querySelector('.resetButton')

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
            <img class="backFace" src="https://cloud.netlifyusercontent.com/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/514dc845-04f5-4538-8a4f-869b64243265/1-2.jpg">
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

const memoryCards = document.querySelectorAll('.memoryCard');

resetButton.addEventListener('click', startGame)

// This function shuffles the card by randomizing the positioning within the flex box
function shuffle() {
    memoryCards.forEach(card => {
        let randomPosition = Math.floor(Math.random() * 8);
        card.style.order = randomPosition;
})}

let hasFlippedCard = false;
let firstCard, secondCard;
let lockBoard = false;

function flipCard() {

    if (lockBoard) {return;}

    if (this === firstCard) {return;}

    this.classList.toggle('flip') 

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        
        return;
    } 

    hasFlippedCard = false;
    secondCard = this;
        
    checkForMatch();   
} 


// this function checks for a match by comparing the data type of the cards
function checkForMatch() {

    let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

    if (isMatch) {
        disableCards();
    } else {
        unflipCards();
    }
  }


// This function disables the cards from flipping and is called in the checkForMatch function to prevent two matched cards from being flipped again.
function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetBoard();
}


function enableCards() {
    memoryCards.forEach((memoryCard) => {
        memoryCard.addEventListener('click', flipCard)
        })
}

function unflipCards () {

    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        lockBoard = false;

    }, 1500);
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

// add the flip class when clicking on one of the cards, flipping the cards.
memoryCards.forEach((memoryCard) => {
    memoryCard.addEventListener('click', flipCard)
    })

shuffle();

function startGame() {
    
    setTimeout(shuffle, 500);
    
    memoryCards.forEach(card => {
        card.classList.remove('flip');
        
    })
    
    enableCards();

}




