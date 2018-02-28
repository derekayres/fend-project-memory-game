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

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

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

function makeCards(shuffledArray) {
  deck.innerHTML="";
  for (let x = 0; x < shuffledArray.length; x++ ){
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
};

function checkCard() {
    newCard.removeEventListener('click', checkCard);
    const clickedCard = this
    clickedCard.classList.add('open');
    clickedCard.classList.add('show');
    //cardOne = this;
    if (cardOne === null) {
        cardOne = this;
    }
    else if (cardOne.firstChild.className === this.firstChild.className){
      clickedCard.classList.add('match');
      clickedCard.classList.remove('open');
      clickedCard.classList.remove('show');
      cardOne.classList.add('match');
      cardOne.classList.remove('open');
      cardOne.classList.remove('show');
    }
    else {setTimeout(function() {
      clickedCard.classList.remove('open');
      clickedCard.classList.remove('show');
      clickedCard.addEventListener('click', checkCard);
      cardOne.classList.remove('open');
      cardOne.classList.remove('show');
      cardOne.addEventListener('click', checkCard);
      cardOne = null;
      }, 3000);
    }
      console.log ('It worked.')
      console.dir(this)
    }

makeCards(shuffledArray);





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
