/*
 * Create a list that holds all of your cards
 */
const arrayClassNames = [
    "fa fa-diamond",
    "fa fa-diamond",
    "fa fa-paper-plane-o",
    "fa fa-paper-plane-o",
    "fa fa-anchor",
    "fa fa-anchor",
    "fa fa-bolt",
    "fa fa-bolt",
    "fa fa-cube",
    "fa fa-cube",
    "fa fa-leaf",
    "fa fa-leaf",
    "fa fa-bicycle",
    "fa fa-bicycle",
    "fa fa-bomb",
    "fa fa-bomb"
]

//calling HTML for timer
var h2 = document.getElementsByTagName('h2')[0],
    seconds = 0,
    minutes = 0,
    hours = 0,
    t;

function add() {
    seconds++;
    if (seconds >= 60) {
        seconds = 0;
        minutes++;
        if (minutes >= 60) {
            minutes = 0;
            hours++;
        }
    }
    h2.textContent = (hours ? (hours > 9 ? hours : "0" + hours) : "00") + ":" + (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds);
    timer();
}

function timer() {
    t = setTimeout(add, 1000);
}



/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

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

const shuffledArray = shuffle(arrayClassNames);
const deck = document.querySelector(".deck");
const newDeck = document.querySelector('.deck');
let cardOne = null;
let cardTwo = null;

function makeCards(shuffledArray) {
    deck.innerHTML = "";
    for (let x = 0; x < shuffledArray.length; x++) {
        const newCard = document.createElement('li');
        const newIcon = document.createElement('i');
        newCard.classList.add('card');
        newIcon.classList.add('fa');
        newIcon.classList = shuffledArray[x];
        const newDeck = document.querySelector('.deck');
        newDeck.appendChild(newCard);
        newCard.appendChild(newIcon);
        newCard.addEventListener('click', checkCard);
    }
}
let timerRunning = false;
let matchedCount = 0;
let moveCount = 0;
//let moves = document.getElementsByClassName('moves');

function checkCard() {
    if (timerRunning === false) {
        timer();
        timerRunning = true;
        var music = document.getElementById("music");
        music.currentTime = 180.175;
    }

    if (!cardOne) {
      cardOne = this;
      cardOne.removeEventListener('click', checkCard);
      cardOne.classList.add('open');
      cardOne.classList.add('show');
      moveCount += 0.5;
      return false;
    } else if (!cardTwo) {
      cardTwo = this;
      cardTwo.removeEventListener('click', checkCard);
      cardTwo.classList.add('open');
      cardTwo.classList.add('show');
      moveCount += 0.5;
      console.log('Total moves ' + moveCount);
      document.getElementsByTagName('span')[0].innerHTML = moveCount;
    if (moveCount > 8 && moveCount < 13) {
       document.getElementsByClassName('fa fa-star')[4].style.visibility='hidden';
     } else if (moveCount > 12 && moveCount < 17) {
        document.getElementsByClassName('fa fa-star')[4].style.visibility='hidden';
        document.getElementsByClassName('fa fa-star')[3].style.visibility='hidden';
      } else if (moveCount > 16 && moveCount < 21) {
        document.getElementsByClassName('fa fa-star')[4].style.visibility='hidden';
        document.getElementsByClassName('fa fa-star')[3].style.visibility='hidden';
        document.getElementsByClassName('fa fa-star')[2].style.visibility='hidden';
      } else if (moveCount > 20 && moveCount < 25) {
        document.getElementsByClassName('fa fa-star')[4].style.visibility='hidden';
        document.getElementsByClassName('fa fa-star')[3].style.visibility='hidden';
        document.getElementsByClassName('fa fa-star')[2].style.visibility='hidden';
        document.getElementsByClassName('fa fa-star')[1].style.visibility='hidden';
      }




    if (cardOne.firstChild.className === cardTwo.firstChild.className) {
        cardTwo.classList.add('match');
        cardTwo.classList.remove('open');
        cardTwo.classList.remove('show');
        cardOne.classList.add('match');
        cardOne.classList.remove('open');
        cardOne.classList.remove('show');
        cardOne = null;
        cardTwo = null;
        matchedCount += 1;
        if (matchedCount === 2) {
            clearTimeout(t);
            document.getElementsByClassName('modal-moves')[0].innerHTML = moveCount;
            document.getElementsByClassName('modal-time')[0].innerHTML = h2;
            document.getElementsByClassName('modal-stars')[0].innerHTML = moveCount;
            $('#No1modal').modal('show');
            var music = document.getElementById("music");
            music.currentTime = 395.5;
        }
        console.log('Total matches ' + matchedCount)
    } else {
        setTimeout(function() {
            cardTwo.addEventListener('click', checkCard);
            cardTwo.classList.remove('open');
            cardTwo.classList.remove('show');
            cardOne.addEventListener('click', checkCard);
            cardOne.classList.remove('open');
            cardOne.classList.remove('show');
            cardOne = null;
            cardTwo = null;
        }, 2000);
    }
  }
}
console.log('It worked.')
console.dir(this)

makeCards(shuffledArray);


/* Stop button
stop.onclick = function() {
    clearTimeout(t);
}
Clear button
clear.onclick = function() {
    h1.textContent = "00:00:00";
    seconds = 0; minutes = 0; hours = 0;
}
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
