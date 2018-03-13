//VARIABLES.

//List of all cards.
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

const deck = document.querySelector(".deck");
const newDeck = document.querySelector('.deck');
const resetEverything = document.getElementsByClassName('fa fa-repeat')[0];
let timerRunning = false;
let matchedCount = 0;
let moveCount = 0;
let starCount = 5;
let cardOne = null;
let cardTwo = null;

//Calling HTML for the stopwatch.
let h2 = document.getElementsByTagName('h2')[0],
    seconds = 0,
    minutes = 0,
    hours = 0,
    t;

//Starts stopwatch.
function timer() {
        t = setTimeout(add, 1000);
    }

//Adds time to stopwatch.
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

//Shuffles cards.
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

//Makes cards. Calls the shuffle function.
function makeCards() {
    let shuffledArray = shuffle(arrayClassNames);
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

//Starts timer, sorts cards into card one or two, compares cards
function checkCard() {
    if (timerRunning === false) {
        timer();
        timerRunning = true;
        var music = document.getElementById("music");
        music.currentTime = 180.175;
    }
//The card is either cardOne...
    if (!cardOne) {
        cardOne = this;
        cardOne.removeEventListener('click', checkCard);
        cardOne.classList.add('open');
        cardOne.classList.add('show');
        return false;
//...or cardTwo.
    } else if (!cardTwo) {
        cardTwo = this;
        cardTwo.removeEventListener('click', checkCard);
        cardTwo.classList.add('open');
        cardTwo.classList.add('show');
        moveCount += 1;
        console.log('Total moves ' + moveCount);
        document.getElementsByTagName('span')[0].innerHTML = moveCount;
//Denumerates number of stars the moves you make.
        if (moveCount > 8 && moveCount < 13) {
            document.getElementsByClassName('fa fa-star')[4].style.visibility = 'hidden';
            starCount = 4;
        } else if (moveCount > 12 && moveCount < 17) {
            document.getElementsByClassName('fa fa-star')[3].style.visibility = 'hidden';
            starCount = 3;
        } else if (moveCount > 16 && moveCount < 21) {
            document.getElementsByClassName('fa fa-star')[2].style.visibility = 'hidden';
            starCount = 2;
        } else if (moveCount > 20) {
            document.getElementsByClassName('fa fa-star')[1].style.visibility = 'hidden';
            starCount = 1;
        }
//If there is a match...
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
//Defines the conditions for the win.            
            if (matchedCount === 8) {
                clearTimeout(t);
                for (let s = 0; s < starCount; s++) {
                    const modalStar = document.createElement('i');
                    modalStar.classList.add('fa', 'fa-star');
                    document.getElementsByClassName('modal-stars')[0].appendChild(modalStar);
                }
                document.getElementsByClassName('modal-moves')[0].innerHTML = moveCount;
                document.getElementsByClassName('modal-time')[0].innerHTML = h2.textContent;
                //document.getElementsByClassName('modal-stars')[0].innerHTML = modalStar;
                $('#No1modal').modal('show');
                var music = document.getElementById("music");
                music.currentTime = 395.5;
                console.log(starCount)
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

//Resets game.
resetEverything.addEventListener('click', resetGame);
function resetGame() {
  moveCount = 0;
  clearTimeout(t);
  timerRunning = false;
  document.getElementsByTagName('h2')[0],
      seconds = 0,
      minutes = 0,
      hours = 0,
      t;
  h2.textContent = (hours ? (hours > 9 ? hours : "0" + hours) : "00") + ":" + (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds);
  document.getElementsByTagName('span')[0].innerHTML = moveCount;
  document.getElementsByClassName('fa fa-star')[4].style.visibility = 'visible';
  document.getElementsByClassName('fa fa-star')[3].style.visibility = 'visible';
  document.getElementsByClassName('fa fa-star')[2].style.visibility = 'visible';
  document.getElementsByClassName('fa fa-star')[1].style.visibility = 'visible';
  document.getElementsByClassName('fa fa-star')[0].style.visibility = 'visible';
  shuffledArray = shuffle(arrayClassNames);
  makeCards(shuffledArray);
  music.currentTime = 0;
  console.log('Page is reloaded.')
  return false
}

makeCards();
