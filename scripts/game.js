document.addEventListener('DOMContentLoaded', () => {
    const btnStart = document.getElementById('start-game-btn');
    const gameContainer = document.getElementById('start-game-container');
    const gameScreen = document.getElementById('game-screen-container');
    const btnRestart = document.getElementById('restart-btn');
    const btnRestartPop = document.getElementById('restart-btn-pop');
    const cardsContainer = document.getElementById('cards-container');
    const endGamePopUp = document.getElementById('end-game-pop-up');
    const timerDisplay = document.querySelector('.timer-output');
    const btnQuitGame = document.querySelectorAll('.quit-game-btn');
    
    let cardImages = ["white-flowers.png", "blue-flowers.png", "light-blue-flowers.png", "pink-flowers.png", "red-flowers.png", "purple-flowers.png"];
    let shuffledImages = [...cardImages, ...cardImages]; // Duplicate images for matching pairs
    let flippedCards = [];
    let matchedCards = [];
    let timer;
    let elapsedSeconds = 0;
    
    btnStart.addEventListener('click', startGame);
    btnRestart.addEventListener('click', resetGame);
    btnRestartPop.addEventListener('click', resetGame);

    btnQuitGame.forEach(btn => btn.addEventListener('click', quitGame));

    function startGame() {
        gameContainer.style.display = 'none';
        gameScreen.style.display = 'block';
        endGamePopUp.style.display = 'none';
        shuffledImages = shuffleArray(shuffledImages);
        createCards();
        resetTimer();
    }

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    function createCards() {
        cardsContainer.innerHTML = ''; // Clear existing cards
        shuffledImages.forEach(imgName => {
            const card = document.createElement('div');
            card.classList.add('single-card');
            card.innerHTML = `
                <div class="card-cover"><img src="images/img-cover.png" alt="cover"></div>
                <div class="card-img"><img src="images/${imgName}" alt="${imgName}"></div>
            `;
            card.addEventListener('click', flipCard);
            cardsContainer.appendChild(card);
        });
    }

    function flipCard() {
        if (flippedCards.length < 2 && !this.classList.contains('card-flipped')) {
            this.classList.add('card-flipped');
            flippedCards.push(this);
            if (flippedCards.length === 2) checkForMatch();
        }
    }

    function checkForMatch() {
        const [card1, card2] = flippedCards;
        const img1 = card1.querySelector('.card-img img').src;
        const img2 = card2.querySelector('.card-img img').src;

        if (img1 === img2) {
            matchedCards.push(card1, card2);
            flippedCards = [];
            if (matchedCards.length === shuffledImages.length) endGame();
        } else {
            setTimeout(() => {
                card1.classList.remove('card-flipped');
                card2.classList.remove('card-flipped');
                flippedCards = [];
            }, 1000);
        }
    }

    function updateTimer() {
        elapsedSeconds++;
        const minutes = Math.floor(elapsedSeconds / 60);
        const seconds = elapsedSeconds % 60;
        timerDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }

    function resetGame() {
        clearInterval(timer);
        elapsedSeconds = 0;
        matchedCards = [];
        flippedCards = [];
        startGame();
    }

    function endGame() {
        clearInterval(timer);
        gameScreen.style.display = 'none';
        endGamePopUp.style.display = 'flex';
    }

    function quitGame() {
        clearInterval(timer);
        gameContainer.style.display = 'flex';
        gameScreen.style.display = 'none';
        endGamePopUp.style.display = 'none';
    }

    function resetTimer() {
        clearInterval(timer);
        elapsedSeconds = 0;
        updateTimer();
        timer = setInterval(updateTimer, 1000);
    }
});
