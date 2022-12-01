'use strict';
import {Score} from "./Score.js";

// ELEMENTS BRIDGE
// SCREENS AND BUTTONS
const titleScreen = document.querySelector('.title-screen');
const startBtn = document.querySelector('.start-btn');
const playAgainBtn = document.querySelector('.play-again-btn');
const leaderboardBtn = document.querySelector('.leaderboard-btn');
const gameScreen = document.querySelector('.game-screen');

// INPUTS, DISPLAYS, MODALS
const timeDisplay = document.querySelector('.time-display');
const pointsDisplay = document.querySelector('.points-display');
const wordDisplay = document.querySelector('.word-display');
const userInput = document.querySelector('.user-input');
const leaderboardModal = document.querySelector('.leaderboard-modal');

// CREATURE
const creatureBody = document.querySelector('.creature-body');
const creatureFace = document.querySelector('.creature-face');
const leaderboard = [];

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

// GETTING RANDOM WORDS
function randomizer(array) {
    for(let i = 0; i <= array.length; i++) {
        let randomIndex = Math.floor(Math.random() * array.length);
        return array[randomIndex];
    }
}

// START GAME AND LOGIC
startBtn.addEventListener('click', () => {
    let word = randomizer(words);
    let bodySize = 80;
    let faceSize = 50;
    let timeLeft = 100;
    let points = 0;

    gameScreen.classList.remove('hidden');
    titleScreen.classList.add('hidden');
    wordDisplay.innerText = `Your word is: ${word}`;
    timeDisplay.innerText = `You have ${timeLeft} seconds to feed me!`;

    // PLAYING MUSIC
    const music = new Audio('assets/media/game-music.mp3');
    const eating = new Audio('assets/media/eating.mp3')
    music.play();

    // CHECKING INPUT FOR MATCHES
    userInput.addEventListener('keyup', () => {
        if(userInput.value == word) {
            userInput.style.border = 'thick solid green';
            pointsDisplay.innerText = `Words eaten: ${points += 1}`;
            wordDisplay.innerText = `Your word is: ${word = randomizer(words)}`;
            userInput.value = '';
            creatureBody.style.width = `${bodySize += 2}px`;
            creatureBody.style.height = `${bodySize += 2}px`;
            creatureFace.style.width = `${faceSize += 2}px`;
            creatureFace.style.height = `${faceSize += 2}px`;
            creatureFace.src = 'assets/media/heart-eating.png';
            eating.play();
        } else {
            userInput.style.border = 'thick solid red';
            creatureFace.src = 'assets/media/heart.png';
        }
    });

    // RUNNING TIMER
    const timer = setInterval(() => {
        timeDisplay.innerText = `You have ${--timeLeft} seconds to feed me!`;

        if(timeLeft == 0) {
            timeDisplay.innerText = 'Time\'s up';
            pointsDisplay.innerText = `You fed me: ${points} words`;
            wordDisplay.classList.add('hidden');
            userInput.classList.add('hidden');
            playAgainBtn.classList.remove('hidden');
            leaderboardBtn.classList.remove('hidden');

            // NEW SCORE
            let percentage = 100 * points;
            percentage /= 90;
            const date = new Date();
            const score = new Score(date.toString().substring(0, 15), points, percentage.toFixed());

            // DIPLAYING LEADERBOARD MODAL
            leaderboardBtn.addEventListener('click', () => {
                leaderboardModal.classList.remove('hidden');
                leaderboardModal.innerHTML = score.stats;
            });

            // PICKING REACTION FOR CREATURE
            if(points <= 10) {
                creatureFace.src = 'assets/media/heart-sad.png';
            } else if(points > 10 && points <= 20) {
                creatureFace.src = 'assets/media/heart-bleh.png';
            } else if(points > 20 && points <= 35) {
                creatureFace.src = 'assets/media/heart-satisfied.png';
            } else if(points > 35) {
                creatureFace.src = 'assets/media/heart-full.png';
            } else {
                creatureFace.src = 'assets/media/heart.png';
            }

            points = 0;
            music.pause();
            clearInterval(timer);
        }
    }, 1000);
});



// PLAY AGAIN AND LOGIC
playAgainBtn.addEventListener('click', () => {
    // RESETTING GAME
    wordDisplay.classList.remove('hidden');
    userInput.classList.remove('hidden');
    playAgainBtn.classList.add('hidden');
    leaderboardBtn.classList.add('hidden');
    leaderboardModal.classList.add('hidden');

    let word = randomizer(words);
    let bodySize = 80;
    let faceSize = 50;
    let timeLeft = 100;
    let points = 0;

    timeDisplay.innerText = `You have ${timeLeft} seconds to feed me!`;
    pointsDisplay.innerText = 'Words eaten: ';
    wordDisplay.innerText = `Your word is: ${word}`;
    userInput.value = '';
    creatureFace.src = 'assets/media/heart.png';
    creatureBody.style.width = `${bodySize += 2}px`;
    creatureBody.style.height = `${bodySize += 2}px`;
    creatureFace.style.width = `${faceSize += 2}px`;
    creatureFace.style.height = `${faceSize += 2}px`;

    // PLAYING MUSIC
    const music = new Audio('assets/media/game-music.mp3');
    const eating = new Audio('assets/media/eating.mp3')
    music.play();

    // CHECKING INPUT FOR MATCHES
    userInput.addEventListener('keyup', () => {
        if(userInput.value == word) {
            userInput.style.border = 'thick solid green';
            pointsDisplay.innerText = `Words eaten: ${points += 1}`;
            wordDisplay.innerText = `Your word is: ${word = randomizer(words)}`;
            userInput.value = '';
            creatureBody.style.width = `${bodySize += 2}px`;
            creatureBody.style.height = `${bodySize += 2}px`;
            creatureFace.style.width = `${faceSize += 2}px`;
            creatureFace.style.height = `${faceSize += 2}px`;
            creatureFace.src = 'assets/media/heart-eating.png';
            eating.play();
        } else {
            userInput.style.border = 'thick solid red';
            creatureFace.src = 'assets/media/heart.png';
        }
    });   

     // RUNNING TIMER
     const timer = setInterval(() => {
        timeDisplay.innerText = `You have ${--timeLeft} seconds to feed me!`;

        if(timeLeft == 0) {
            timeDisplay.innerText = 'Time\'s up';
            pointsDisplay.innerText = `You fed me: ${points} words`;
            wordDisplay.classList.add('hidden');
            userInput.classList.add('hidden');
            playAgainBtn.classList.remove('hidden');
            leaderboardBtn.classList.remove('hidden');

            // NEW SCORE
            let percentage = 100 * points;
            percentage /= 90;
            const date = new Date();
            const score = new Score(date.toString().substring(0, 15), points, percentage.toFixed());
 
            // DIPLAYING LEADERBOARD MODAL
            leaderboardBtn.addEventListener('click', () => {
                leaderboardModal.classList.remove('hidden');
                leaderboardModal.innerHTML = score.stats;
            });

            // PICKING REACTION FOR CREATURE
            if(points <= 10) {
                creatureFace.src = 'assets/media/heart-sad.png';
            } else if(points > 10 && points <= 20) {
                creatureFace.src = 'assets/media/heart-bleh.png';
            } else if(points > 20 && points <= 35) {
                creatureFace.src = 'assets/media/heart-satisfied.png';
            } else if(points > 35) {
                creatureFace.src = 'assets/media/heart-full.png';
            } else {
                creatureFace.src = 'assets/media/heart.png';
            }

            points = 0;
            music.pause();
            clearInterval(timer);
        }
    }, 1000);
});




