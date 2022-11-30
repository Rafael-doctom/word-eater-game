'use strict';

// ELEMENTS BRIDGE
// SCREENS
const titleScreen = document.querySelector('.title-screen');
const startBtn = document.querySelector('.start-btn');
const playAgainBtn = document.querySelector('.play-again-btn');
const gameScreen = document.querySelector('.game-screen');

const timeDisplay = document.querySelector('.time-display');
const pointsDisplay = document.querySelector('.points-display');
const wordDisplay = document.querySelector('.word-display');
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
    for(let i = 1; i < array.length; i++) {
        array[i] = Math.floor(Math.random() * array.length);
        return array[array[i]];
    }
}

// START GAME AND LOGIC
startBtn.addEventListener('click', () => {
    let word = randomizer(words);
    let timeLeft = 10;
    let points = 0;

    gameScreen.classList.remove('hidden');
    titleScreen.classList.add('hidden');
    wordDisplay.innerText = `Your word is: ${word}`;
    timeDisplay.innerText = `Time left: ${timeLeft} seconds`;

    // PLAYING MUSIC
    const music = new Audio('assets/media/game-music.mp3');
    music.play();

    // RUNNING TIMER
    const timer = setInterval(() => {
        timeDisplay.innerText = `Time left: ${--timeLeft} seconds`;

        if(timeLeft == 0) {
            timeDisplay.innerText = 'GAME OVER :(';
            wordDisplay.classList.add('hidden');
            userInput.classList.add('hidden');
            playAgainBtn.classList.remove('hidden');
            points = 0;
            music.pause();
            clearInterval(timer);
        }
    }, 1000);

    // CHECKING INPUT FOR MATCHES
    userInput.addEventListener('keyup', () => {
        if(userInput.value == word) {
            userInput.style.border = 'thick solid green';
            pointsDisplay.innerText = `Points: ${points += 1}`;
            wordDisplay.innerText = `Your word is: ${word = randomizer(words)}`;
            userInput.value = '';
        } else {
            userInput.style.border = 'thick solid red';
        }
    });
});

// PLAY AGAIN
playAgainBtn.addEventListener('click', () => {
    wordDisplay.classList.remove('hidden');
    userInput.classList.remove('hidden');
    playAgainBtn.classList.add('hidden');

    let word = randomizer(words);
    let timeLeft = 10;
    let points = 0;
    
    timeDisplay.innerText = `Time left: ${timeLeft} seconds`;
    pointsDisplay.innerText = 'Points: ';
    wordDisplay.innerText = `Your word is: ${word}`;
    userInput.value = '';


    // PLAYING MUSIC
    const music = new Audio('assets/media/game-music.mp3');
    music.play();

    // RUNNING TIMER
    const timer = setInterval(() => {
        timeDisplay.innerText = `Time left: ${--timeLeft} seconds`;

        if(timeLeft == 0) {
            timeDisplay.innerText = 'GAME OVER :(';
            wordDisplay.classList.add('hidden');
            userInput.classList.add('hidden');
            playAgainBtn.classList.remove('hidden');
            points = 0;
            music.pause();
            clearInterval(timer);
        }
    }, 1000);

    // CHECKING INPUT FOR MATCHES
    userInput.addEventListener('keyup', () => {
        if(userInput.value == word) {
            userInput.style.border = 'thick solid green';
            pointsDisplay.innerText = `Points: ${points += 1}`;
            wordDisplay.innerText = `Your word is: ${word = randomizer(words)}`;
            userInput.value = '';
        } else {
            userInput.style.border = 'thick solid red';
        }
    });   
});


