document.addEventListener('DOMContentLoaded', () => {
    const splitFlapElement = document.getElementById('splitFlap');
    const sentences = [
        "SURPISE! NEW FLIGHT ALERT",
        "DELANIE, YOU'RE GOING TO..",
        "DUBAI SINGAPORE INDONESIA",
        "DATES 8/30- 9/14",
        "ENJOY YOUR TRIP"
    ];
    let currentSentenceIndex = 0;

    const isMobile = window.innerWidth < 600;
    const totalRows = 5;
    const totalCols = isMobile ? 10 : 20;

    function createCharacterFlap(character) {
        const characterElement = document.createElement('div');
        characterElement.className = 'character';
        const frontFlap = document.createElement('div');
        frontFlap.className = 'flap front';
        frontFlap.textContent = character;
        const backFlap = document.createElement('div');
        backFlap.className = 'flap back';
        backFlap.textContent = character;
        characterElement.appendChild(frontFlap);
        characterElement.appendChild(backFlap);
        return characterElement;
    }

    function initializeBoard() {
        splitFlapElement.style.gridTemplateColumns = `repeat(${totalCols}, 1fr)`;
        splitFlapElement.style.gridTemplateRows = `repeat(${totalRows}, 1fr)`;
        splitFlapElement.innerHTML = '';
        for (let i = 0; i < totalRows * totalCols; i++) {
            const character = createCharacterFlap(' ');
            splitFlapElement.appendChild(character);
        }
    }

    function updateSplitFlap(sentence) {
        const characters = splitFlapElement.children;
        const words = sentence.split(' ');
        let rowIndex = 1; // Start from the second row
        let colIndex = 0;

        // Clear the board
        for (let i = 0; i < totalRows; i++) {
            for (let j = 0; j < totalCols; j++) {
                const index = i * totalCols + j;
                const character = characters[index];
                const frontFlap = character.querySelector('.front');
                const backFlap = character.querySelector('.back');

                backFlap.textContent = ' ';
                frontFlap.textContent = ' ';
            }
        }

        // Add words to the board
        words.forEach(word => {
            if (colIndex + word.length > totalCols) {
                rowIndex++;
                colIndex = 0;
            }

            if (rowIndex >= totalRows - 1) {
                console.warn('Sentence too long to fit on the board');
                return;
            }

            for (let k = 0; k < word.length; k++) {
                const index = rowIndex * totalCols + colIndex;
                const character = characters[index];
                const frontFlap = character.querySelector('.front');
                const backFlap = character.querySelector('.back');
                const newChar = word[k];

                backFlap.textContent = newChar;

                if (frontFlap.textContent !== newChar) {
                    character.classList.add('flip-animation');
                    setTimeout(() => {
                        frontFlap.textContent = newChar;
                        character.classList.remove('flip-animation');
                    }, 500);
                }
                colIndex++;
            }

            colIndex++; // Add space between words

            if (colIndex >= totalCols) {
                rowIndex++;
                colIndex = 0;
            }
        });
    }

    function startFlap() {
        updateSplitFlap(sentences[currentSentenceIndex]);
        currentSentenceIndex = (currentSentenceIndex + 1) % sentences.length;
        setTimeout(startFlap, 5000); // Change sentence every 10 seconds
    }

    initializeBoard();
    startFlap();
});
