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
const startButton = document.querySelector('.startButton')
const body = document.querySelector('body');

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

// This generates the cards to the DOM when the user loads the page
generateCards(); 

const memoryCards = document.querySelectorAll('.memoryCard');

// This function shuffles the card by randomizing the positioning within the flex box
function shuffle() {
    memoryCards.forEach(card => {
        let randomPosition = Math.floor(Math.random() * 8);
        card.style.order = randomPosition;
})}

// Invokes the shuffle function every time the user loads the page
shuffle();

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

// This function disables the cards from flipping and is called in the checkForMatch function to prevent two matched cards from being flipped again.
function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetBoard();
}

// This function is called in the resetGame function in order to restart a finished game without the cards locking themselves from flipping after being flipped once during the previous game
function enableCards() {
    memoryCards.forEach((memoryCard) => {
        memoryCard.addEventListener('click', flipCard)
        })
}

// This function locks the board, removes flip class to make cards flip back again and the unlocks the board. This function is invoked in the isMatch function in case two flipped cards doesn't match
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

// add the flip class when clicking on one of the cards, flipping the cards.
memoryCards.forEach((memoryCard) => {
    memoryCard.addEventListener('click', flipCard)
    })

const overlay = document.querySelector('.overlay');

startButton.addEventListener('click', () => {
   overlay.classList.add('hidden');
})

//This function counts each click made
let counter = 1;
const clickCounter = document.querySelector('.clickCounter');

function mouseClicked() {

    if (lockBoard === true){
        return;
    }

  const element = clickCounter;
  element.textContent = `Click Count: ${counter}`;
  counter++;
}
//This loop adds the clicks done function to each memorycard
memoryCards.forEach(memoryCard => {
    memoryCard.addEventListener('click', () => {
        mouseClicked();
    })
})

// Unlocks the board, resets the score to 0, Resets the click counter, shuffles the cards, removes the flip class from the cards to make them flip back and then invokes the enableCards function
function resetGame() {

    lockBoard = false;
    score = 0;

    clickCounter.innerHTML = "Click Count: 0";
    counter = 1;
    setTimeout(shuffle, 500);
    
    memoryCards.forEach(card => {
        card.classList.remove('flip');
    })

    enableCards();  
}

// Resets the game when clicking on reset button
resetButton.addEventListener('click', resetGame)

// Sets the score to 0 every time the user loads the page
let score = 0;

// this function checks for a match by comparing the data type of the cards. Adds +1 to score for every matched cards
function checkForMatch() {

    let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

    if (isMatch) {
        disableCards();
        score++
    } else {
        unflipCards();
    }
    // This condition checks if every card has been matched and locks the board. A message of congratulations is displayed.
    // It takes the
    if (score === 2) {
        lockBoard = true;
        setTimeout(() => {
            window.alert(`Well done! Your score is ${counter - 1}`);
        }, 500)
    }
  }

