class Game {
    constructor() {
        this.horses = {
            hearts: 0,
            diamonds: 0,
            clubs: 0,
            spades: 0
        };
        this.levels = [
            { suit: this.getRandomSuit(), revealed: false },
            { suit: this.getRandomSuit(), revealed: false },
            { suit: this.getRandomSuit(), revealed: false },
            { suit: this.getRandomSuit(), revealed: false },
            { suit: this.getRandomSuit(), revealed: false }
        ];
        this.deck = this.createDeck();
        this.currentCard = null;
        this.isGameOver = false;
    }

    getRandomSuit() {
        const suits = ['hearts', 'diamonds', 'clubs', 'spades'];
        return suits[Math.floor(Math.random() * suits.length)];
    }

    createDeck() {
        const suits = ['hearts', 'diamonds', 'clubs', 'spades'];
        let deck = [];
        for (let i = 0; i < 4; i++) {
            suits.forEach(suit => deck.push(suit));
        }
        return deck.sort(() => Math.random() - 0.5);
    }

    drawCard() {
        if (this.deck.length === 0) {
            this.deck = this.createDeck();
        }
        this.currentCard = this.deck.pop();
        return this.currentCard;
    }

    moveHorse(suit) {
        if (this.isGameOver) return;
        this.horses[suit]++;
        this.updateHorsePositions();
        this.checkLevels();
        this.checkWinner();
    }

    checkLevels() {
        this.levels.forEach((level, index) => {
            const levelNumber = index + 1;
            if (!level.revealed) {
                const allPassed = Object.values(this.horses).every(position => position >= levelNumber);
                if (allPassed) {
                    level.revealed = true;
                    this.revealLevelCard(index, level.suit);
                    this.horses[level.suit] = Math.max(0, this.horses[level.suit] - 1);
                    this.updateHorsePositions();
                }
            }
        });
    }

    revealLevelCard(index, suit) {
        const levelElement = document.querySelector(`.level[data-level="${index + 1}"]`);
        const suitToFileName = { hearts: 'Heart', diamonds: 'Diamond', clubs: 'Club', spades: 'Spade' };
        const frontFace = levelElement.querySelector('.level-front');
        frontFace.innerHTML = `<img src="/e:/Desktop/Design/Game/Card-Horse-Racing/asset/Card-${suitToFileName[suit]}.png" alt="${suit} card" style="width: 100%; height: 100%; object-fit: cover;">`;
        levelElement.classList.add('flipped');
    }

    getSuitColor(suit) {
        const colors = {
            hearts: '#e74c3c',
            diamonds: '#3498db',
            clubs: '#2ecc71',
            spades: '#9b59b6'
        };
        return colors[suit] || '#333';
    }

    updateHorsePositions() {
        Object.keys(this.horses).forEach(suit => {
            const horseElement = document.querySelector(`.horse[data-suit="${suit}"]`);
            const position = this.horses[suit];
            const percentage = (position / 5) * 100;
            horseElement.style.left = `${percentage}%`;
        });
    }

    checkWinner() {
        for (const [suit, position] of Object.entries(this.horses)) {
            if (position >= 5) {
                this.isGameOver = true;
                const suitNames = { hearts: '红桃', diamonds: '方块', clubs: '梅花', spades: '黑桃' };
                const winnerPopup = document.getElementById('winnerPopup');
                const winnerText = document.getElementById('winnerText');
                winnerText.textContent = `恭喜! ${suitNames[suit]}胜出!`;
                winnerPopup.style.display = 'flex';
                break;
            }
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const game = new Game();
    const drawButton = document.getElementById('draw-card');
    const drawnCardElement = document.querySelector('.drawn-card');
    const statusElement = document.querySelector('.status');

    drawButton.addEventListener('click', () => {
        if (game.isGameOver) {
            statusElement.textContent = '游戏已结束，请刷新页面重新开始!';
            return;
        }

        const card = game.drawCard();
        game.moveHorse(card);
        
        const suitToFileName = { hearts: 'Heart', diamonds: 'Diamond', clubs: 'Club', spades: 'Spade' };
        drawnCardElement.innerHTML = `<img src="/e:/Desktop/Design/Game/Card-Horse-Racing/asset/Card-${suitToFileName[card]}.png" alt="${card} card">`;
        
        const suitNames = { hearts: '红桃', diamonds: '方块', clubs: '梅花', spades: '黑桃' };
        statusElement.textContent = `抽到了${suitNames[card]}，${suitNames[card]}前进了一步!`;
    });

    game.updateHorsePositions();
    
    document.getElementById('closePopup').addEventListener('click', () => {
        document.getElementById('winnerPopup').style.display = 'none';
    });
});