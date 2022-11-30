'use strict';

// ELEMENTS BRIDGE
// SCREENS
const titleScreen = document.querySelector('.title-screen');
const startBtn = document.querySelector('.start-btn');
const gameScreen = document.querySelector('.game-screen');

const displayedWord = document.querySelector('.word-display');
const userInput = document.querySelector('.user-input');

// WORD ARRAY
const words = [
    'dinosaur', 'love', 'pineapple', 'calendar', 'robot', 'building', 'population',
    'weather', 'bottle', 'history', 'dream', 'character', 'money', 'absolute',
    'discipline', 'machine', 'accurate', 'connection', 'rainbow', 'bicycle',
    'eclipse', 'calculator', 'trouble', 'watermelon', 'developer', 'philosophy',
    'database', 'periodic', 'capitalism', 'abominable', 'component', 'future',
    'pasta', 'microwave', 'jungle', 'wallet', 'canada', 'coffee', 'beauty', 'agency',
    'chocolate', 'eleven', 'technology', 'alphabet', 'knowledge', 'magician',
    'professor', 'triangle', 'earthquake', 'baseball', 'beyond', 'evolution',
    'banana', 'perfumer', 'computer', 'management', 'discovery', 'ambition', 'music',
    'eagle', 'crown', 'chess', 'laptop', 'bedroom', 'delivery', 'enemy', 'button',
    'superman', 'library', 'unboxing', 'bookstore', 'language', 'homework',
    'fantastic', 'economy', 'interview', 'awesome', 'challenge', 'science', 'mystery',
    'famous', 'league', 'memory', 'leather', 'planet', 'software', 'update', 'yellow',
    'keyboard', 'window'
];

// RANDOMIZING ARRAY
function randomizer(array) {
    for(let i = 0; i < array.length; i++) {
        array[i] = Math.floor(Math.random() * array.length);
        return array[array[i]];
    }
}



// START GAME AND LOGIC
startBtn.addEventListener('click', () => {
    let word = randomizer(words);
    let points = 0;

    gameScreen.classList.remove('hidden');
    titleScreen.classList.add('hidden');
    displayedWord.innerText = `Your word is: ${word}`;

    userInput.addEventListener('keyup', () => {
        if(userInput.value == word) {
            userInput.style.border = 'thick solid green';
        } else {
            userInput.style.border = 'thick solid red';
        }
    });
});


