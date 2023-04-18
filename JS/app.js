// Define the variables needed to keep track of the game state
const phraseUl = document.querySelector('#phrase ul');
const qwerty = document.querySelector('#qwerty');
const startButton = document.querySelector('.btn__reset');
const overlay = document.querySelector('#overlay');
let missed = 0;

// Define the phrases array
const phrases = [
    'weather',
    'spring',
    'coffee ',
    'hunger',
    'javascript'
];


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
    const phraseUl = document.querySelector('#phrase ul');
    arr.forEach((element) => {
      const li = document.createElement('li');
      li.textContent = element;
      phraseUl.appendChild(li);
      li.classList.add(element.match(/[a-z]/i) ? 'letter' : 'space');
    });
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
    
    const resetButtonParent = document.createElement('div');
    resetButtonParent.className = 'btn__reset_parent';
    
    const resetButton = document.createElement('a');
    resetButton.href = '#';
    
    if (won) {
      overlay.className = 'win';
      resetButton.textContent = 'Play Again';
      gameResult.textContent = 'Congratulations, you won!';
    } else {
      overlay.className = 'lose';
      resetButton.textContent = 'Try Again';
      gameResult.textContent = `Sorry, you lost. The phrase was: "${phraseArray.join('')}".`;
    }

    resetButton.className = 'btn__reset';
    resetButton.addEventListener('click', () => {
      // Reset the game
      missed = 0;
      const oldPhrase = document.querySelector('#phrase ul');
      oldPhrase.innerHTML = '';
      const newPhrase = getRandomPhraseAsArray(phrases);
      addPhraseToDisplay(newPhrase);
  
      // Reset the keyboard
      const oldButtons = document.querySelectorAll('.keyrow button');
      Array.from(oldButtons).forEach(button => {
        button.disabled = false;
        button.classList.remove('chosen');
      });
  
      // Reset the hearts
      const tries = document.querySelectorAll('.tries');
      tries.forEach(heart => {
        heart.firstElementChild.src = 'images/liveHeart.png';
      });
  
      // Hide the overlay
      overlay.style.display = 'none';
  
      // Reset the reset button text
      document.querySelector('.btn__reset').textContent = 'Start Game';
    });
    
    resetButtonParent.appendChild(resetButton);
    gameResult.appendChild(resetButtonParent);
    overlay.appendChild(gameResult);
    overlay.style.display = 'flex';

    // Remove the "Start Game" button
    document.querySelector('.btn__reset').remove();
  
}