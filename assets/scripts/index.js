'use strict';

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
const item = document.querySelector('.item');

// CREATURE
const creatureBody = document.querySelector('.creature-body');
const creatureFace = document.querySelector('.creature-face');
let leaderboard = [];

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

// SAVING SCORE
function saveScore(score) {
   
}

// SAVING SCORE TO LOCAL STORAGE
function addToStorage(score) {
    leaderboard.push(score);
    localStorage.setItem('Game', JSON.stringify(leaderboard)); 
}

// RUNNING THE GAME
function startGame() {
    let word = randomizer(words);
    let bodySize = 80;
    let faceSize = 50;
    let timeLeft = 10;
    let points = 0;

    userInput.value = '';
    gameScreen.classList.remove('hidden');
    titleScreen.classList.add('hidden');
    pointsDisplay.innerText = 'Words eaten: 0';
    wordDisplay.innerText = word;
    timeDisplay.innerHTML = `<i class="fa-solid fa-clock"></i> ${timeLeft} seconds`;

    // PLAYING MUSIC
    const music = new Audio('assets/media/game-music.mp3');
    const eating = new Audio('assets/media/eating.mp3')
    music.play();

    // CHECKING INPUT FOR MATCHES
    userInput.addEventListener('keyup', () => {
        if(userInput.value == word) {
            userInput.style.border = 'thick solid green';
            pointsDisplay.innerText = `Words eaten: ${points += 1}`;
            wordDisplay.innerText = word = randomizer(words);
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
        timeDisplay.innerHTML = `<i class="fa-solid fa-clock"></i> ${--timeLeft} seconds`;

        if(timeLeft == 0) {
            timeDisplay.innerText = 'Time\'s up';
            pointsDisplay.innerText = `You fed me: ${points} words`;
            wordDisplay.classList.add('hidden');
            userInput.classList.add('hidden');
            playAgainBtn.classList.remove('hidden');
            leaderboardBtn.classList.remove('hidden');
            console.clear();
            // NEW SCORE
            let percentage = 100 * points;
            percentage /= 90;
            const date = new Date();
            const score = {
                date: date.toString().substring(0, 15), 
                points: points, 
                percentage: percentage.toFixed()
            };

            // SAVE GAME
            addToStorage(score);

            // DIPLAYING LEADERBOARD MODAL
            leaderboardModal.classList.remove('hidden');

            const leaders = JSON.parse(localStorage.getItem('Game'));
            leaders.sort((a, b)=> b.points > a.points ? 1 : b.points < a.points ? -1 : 0);
            
            function displayLeaders(leaders) {
                item.innerText = '';
                for(const leader of leaders) {
                    item.innerHTML += `${leader.points} words | ${leader.percentage}%<br>`;
                    console.log(`${leader.points} words | ${leader.percentage}%`);
                }
            }

            displayLeaders(leaders);

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
}

// START GAME AND LOGIC
startBtn.addEventListener('click', () => {
    startGame();
});

// PLAY AGAIN AND LOGIC
playAgainBtn.addEventListener('click', () => {
    // RESETTING GAME
    wordDisplay.classList.remove('hidden');
    userInput.classList.remove('hidden');
    playAgainBtn.classList.add('hidden');
    leaderboardBtn.classList.add('hidden');
    leaderboardModal.classList.add('hidden');

    // RESETTING CREATURE ATTRIBUTES
    let bodySize = 80;
    let faceSize = 50;
    creatureBody.style.width = `${bodySize}px`;
    creatureBody.style.height = `${bodySize}px`;
    creatureFace.style.width = `${faceSize}px`;
    creatureFace.style.height = `${faceSize}px`;
    creatureFace.src = 'assets/media/heart.png';

    startGame();
});




