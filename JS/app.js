const phrase = document.querySelector('#phrase');
const qwerty = document.querySelector('#qwerty');
const startButton = document.querySelector('.btn__reset');
const overlay = document.querySelector('#overlay');
let missed = 0;

const phrases = [
    'weather',
    'spring',
    'coffee ',
    'hunger',
    'javascript'
];

startButton.addEventListener('click', () => {
    overlay.style.display = 'none';
});

function getRandomPhraseAsArray(arr) {
    const randomIndex = Math.floor(Math.random() * arr.length);
    const randomPhrase = arr[randomIndex];
    return randomPhrase.split('');
}

function addPhraseToDisplay(arr) {
    arr.forEach((element) => {
      const li = document.createElement('li');
      li.textContent = element;
      phrase.appendChild(li);
      li.classList.add(element.match(/[a-z]/i) ? 'letter' : 'space');
    });
  }
const phraseArray = getRandomPhraseAsArray(phrases);
addPhraseToDisplay(phraseArray);

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

      missed = 0;
      const oldPhrase = phrase.querySelectorAll('li');
      oldPhrase.forEach(li => li.remove());
      const newPhrase = getRandomPhraseAsArray(phrases);
      addPhraseToDisplay(newPhrase);
  
      const oldButtons = document.querySelectorAll('.keyrow button');
      Array.from(oldButtons).forEach(button => {
        button.disabled = false;
        button.classList.remove('chosen');
      });
  
      const tries = document.querySelectorAll('.tries');
      tries.forEach(heart => {
        heart.firstElementChild.src = 'images/liveHeart.png';
      });
  
      overlay.style.display = 'none';
  
      document.querySelector('.btn__reset').textContent = 'Start Game';
    });
    
    resetButtonParent.appendChild(resetButton);
    gameResult.appendChild(resetButtonParent);
    overlay.appendChild(gameResult);
    overlay.style.display = 'flex';

    document.querySelector('.btn__reset').remove();
  
}