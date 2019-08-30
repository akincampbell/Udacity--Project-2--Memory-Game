/*
 * Create a list that holds all of your cards
 */
const icons = ["fa fa-anchor", "fa fa-bolt", "fa fa-bomb", "fa fa-bicycle",
    "fa fa-cube", "fa fa-diamond", "fa fa-leaf", "fa fa-paper-plane-o",
    "fa fa-anchor", "fa fa-bolt", "fa fa-bomb", "fa fa-bicycle",
    "fa fa-cube", "fa fa-diamond", "fa fa-leaf", "fa fa-paper-plane-o",
];

      /*Class Variables*/
// cards board
const cardsBoard = document.querySelector('#cards-board');

// Moves
let moves = 0;
const movesCounter = document.querySelector(".moves");

// Rating
const stars = document.querySelector('.stars').childNodes;
const starsForRate = document.querySelector('.stars');

// Timer
let seconds = 0;
let minutes = 0;
let hours = 0;

const timer = document.querySelector(".timer");

const hourTimer = document.querySelector(".hour");
const minuteTimer = document.querySelector(".minute");
const secondsTimer = document.querySelector(".seconds");

let timeCounter;
let timerOn = false;

// Restart
const restart = document.querySelector(".restart");

// Modal
const modal = document.querySelector('.modal');
const timeModal = document.querySelector('.time-modal');
const ratingModal = document.querySelector('.rating-modal');
const movesModal = document.querySelector('.moves-modal');
const btnModal = document.querySelector('.btn-modal');


// Cards
let checkCards = [];
let matchedCards = [];


// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}



createCardsBoard();


function createCardsBoard() {

    // Clear the old card board
    cardsBoard.innerHTML = "";
    // create new ul element to append it to "cardsBoard"
    const myNewDeck = document.createElement('ul');
    myNewDeck.classList.add('deck');
    // shuffle the icons list and add shuffled icons to myNewDeck
    let shufIcons = shuffle(icons);
    for (icon of shufIcons) {
        const newLi = document.createElement('li');
        newLi.classList.add('card');
        newLi.innerHTML = `<i class="${icon}"></i>`;
        myNewDeck.appendChild(newLi);
    }
    cardsBoard.append(myNewDeck);
    // add event listener to the cards board
    cardsBoard.addEventListener('click', respondToTheClick);
}

/*Opening Cards*/
function respondToTheClick(e) {

    let selectedCard = e.target;

    if (selectedCard.classList.contains("card") &&
        !selectedCard.classList.contains("open", "show", "match")) {

        if (timerOn === false) {
            startTimer();
            timerOn = true;
        }

        selectedCard.classList.add("open", "show");

        checkCards.push(selectedCard);
    }

    if (checkCards.length === 2) {

        cardsBoard.classList.add("stop-event");

        movesNum();

        if (checkCards[0].innerHTML === checkCards[1].innerHTML) {
            matched();
        } else {
            setTimeout(notMatched, 800);
        }
        yay();
    }
}


function matched() {

    checkCards[0].classList.add("match");
    checkCards[1].classList.add("match");

    matchedCards.push(checkCards[0]);
    matchedCards.push(checkCards[1]);

    checkCards = [];

    cardsBoard.classList.remove("stop-event");
}

function notMatched() {

    checkCards[0].classList.remove("open", "show");
    checkCards[1].classList.remove("open", "show");

    checkCards = [];

    cardsBoard.classList.remove("stop-event");
}




/*Moves*/
function movesNum() {

    moves++;
    if (moves === 1) {
        movesCounter.innerHTML = `1  Move`;
    } else {
        movesCounter.innerHTML = `${moves}  Moves`;
    }
    starsRating();
}


/*Stars Rating*/
function starsRating() {
    // if the moves number is between 12 and 19
    if (moves === 12) {
        // change the color of the third star to grey
        stars[5].classList.add('grey');
        // if the moves number is 20 or more
    } else if (moves === 20) {
        // change the color of the second star to grey
        stars[3].classList.add('grey');
    }
}


/*Timer Function*/
// to fix timer by adding zero if the
// number is less than ten
function fix(x, y) {
    if (x < 10) {
        return (y.innerHTML = ` 0${x}`);
    } else {
        return (y.innerHTML = ` ${x}`);
    }
}

function startTimer() {
    // to start the timer to avoid delay
    if (seconds == 0) {
        seconds++;
    }

    timeCounter = setInterval(function () {

        hourTimer.innerHTML = `${hours}`;
        minuteTimer.innerHTML = ` ${minutes} `;
        secondsTimer.innerHTML = ` ${seconds} `;
        // fix each part of the timer
        fix(seconds, secondsTimer);
        fix(minutes, minuteTimer);
        fix(hours, hourTimer);

        seconds++;
        if (seconds == 60) {
            minutes++;
            seconds = 0;
        } else if (minutes == 60) {
            hours++;
            minutes = 0;
        }
    }, 1000);
}


/*Restart Game*/
function restartGame() {
    timerOn = false;

    moves = 0;
    movesCounter.innerHTML = `0 Moves`;

    matchedCards = [];
    checkCards = [];

    createCardsBoard();

    clearInterval(timeCounter);

    seconds = 0;
    minutes = 0;
    hours = 0;
    secondsTimer.innerText = "00";
    minuteTimer.innerText = " 00";
    hourTimer.innerText = "00";

    stars[5].classList.remove('grey');
    stars[3].classList.remove('grey');
}

restart.addEventListener("click", restartGame);

/*Win Modal Function*/
function yay() {
    if (matchedCards.length === 16) {
        timeModal.innerText = timer.innerText;
        ratingModal.innerHTML = starsForRate.innerHTML;
        movesModal.innerHTML = movesCounter.innerHTML.slice(0, 3);
        clearInterval(timeCounter);
        modal.style.display = 'block';
    }
}

btnModal.addEventListener('click', function () {
    modal.style.display = 'none';
    restartGame();
    timerOn = false;
})

////////////////////////////////////////////////////
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
