// Define the phrases array
const phrases = [
    'bad weather',
    'spring',
    'coffee is delicius',
    'i am hungry',
    'time flies quickly'
];

// Define the variables needed to keep track of the game state
let missed = 0;
const phraseUl = document.querySelector('#phrase ul');
const qwerty = document.querySelector('#qwerty');
const startButton = document.querySelector('.btn__reset');
const overlay = document.querySelector('#overlay');

// Hide the start screen overlay when the start button is clicked
startButton.addEventListener('click', () => {
    overlay.style.display = 'none';
});

// Define the getRandomPhraseAsArray function
function getRandomPhraseAsArray(arr) {
    const randomIndex = Math.floor(Math.random() * arr.length);
    const randomPhrase = arr[randomIndex];
    return randomPhrase.split('');
}

// Define the addPhraseToDisplay function
function addPhraseToDisplay(arr) {
    for (let i = 0; i < arr.length; i++) {
        const li = document.createElement('li');
        li.textContent = arr[i];
        phraseUl.appendChild(li);
        if (/\w/.test(arr[i])) {
            li.classList.add('letter');
        } else {
            li.classList.add('space');
        }
    }
}

// Call the getRandomPhraseAsArray function to get a random phrase and add it to the display
const phraseArray = getRandomPhraseAsArray(phrases);
addPhraseToDisplay(phraseArray);

// Define the checkLetter function
function checkLetter(button) {
    const letters = document.querySelectorAll('.letter');
    let match = null;
    for (let i = 0; i < letters.length; i++) {
        if (button.textContent.toLowerCase() === letters[i].textContent.toLowerCase()) {
            letters[i].classList.add('show');
            match = button.textContent;
        }
    }
    return match;
}

// Add an event listener to the keyboard to handle button clicks
qwerty.addEventListener('click', (event) => {
    if (event.target.tagName === 'BUTTON' && !event.target.classList.contains('chosen')) {
        const button = event.target;
        button.classList.add('chosen');
        const letterFound = checkLetter(button);
        if (!letterFound) {
            missed++;
            const tries = document.querySelectorAll('.tries');
            tries[tries.length - missed].firstElementChild.src = 'images/lostHeart.png';
            if (missed === 5) {
                gameOver(false);
            }
        } else {
            const letters = document.querySelectorAll('.letter');
            if (letters.length === document.querySelectorAll('.show').length) {
                gameOver(true);
            }
        }
    }
});

// Define the gameOver function
function gameOver(won) {
    const gameResult = document.createElement('div');
    gameResult.className = 'game-over';
    if (won) {
        overlay.className = 'win';
        gameResult.textContent = 'Congratulations, you won!';
    } else {
        overlay.className = 'lose';
        gameResult.textContent = `Sorry, you lost. The phrase was: "${phraseArray.join('')}".`;
    }
    overlay.appendChild(gameResult);
    overlay.style.display = 'flex';
}

