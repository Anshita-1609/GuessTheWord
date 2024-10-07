// type Words = string[];
// let div=document.querySelector('#game') as HTMLDivElement;
// function show() {
//     fetch('words.json')
//         .then(res => res.json())
//         .then((data: Words) => {
//             //console.log(`Number of words: ${data.length}`);

//             // Select a random word from the array
//             if (data.length > 0) {
//                 const randomIndex = Math.floor(Math.random() * data.length);
//                 const randomWord = data[randomIndex];
//                 console.log(`Random word: ${randomWord}`);
//                 div.insertAdjacentHTML('beforeend',`<span>${randomWord}</span>`)
//             } else {
//                 console.log('No words available in the array.');
//             }
//         })
//         .catch(error => {
//             console.error('Error fetching words:', error);
//         });
// }

// document.addEventListener("DOMContentLoaded", show);



type Words = string[];

let div = document.querySelector('#game') as HTMLDivElement;
let guessInput = document.querySelector('#guessInput') as HTMLInputElement;
let submitGuess = document.querySelector('#submitGuess') as HTMLButtonElement;
let movesLeftDisplay = document.querySelector('#movesLeft') as HTMLParagraphElement;

let selectedWord: string = '';
let maskedWord: string = '';
let remainingMoves: number = 0;

// Get the selected mode from localStorage
const mode = localStorage.getItem('selectedMode');

// Set number of moves based on the selected mode
function setMovesBasedOnMode(mode: string | null) {
    if (mode === 'beg') {
        remainingMoves = 10; // Beginner mode: more moves
    } else if (mode === 'Med') {
        remainingMoves = 7; // Medium mode
    } else if (mode === 'Expert') {
        remainingMoves = 5; // Expert mode: fewer moves
    } else {
        remainingMoves = 10; // Default
    }
    movesLeftDisplay.innerHTML = `Moves left: ${remainingMoves}`;
}

// Mask random letters in the word with underscores based on difficulty
function maskWord(word: string, mode: string | null): string {
    const wordArray = word.split('');
    let numberOfMissingLetters: number;

    if (mode === 'beg') {
        numberOfMissingLetters = Math.floor(word.length * 0.3); // Beginner: 30% missing
    } else if (mode === 'Med') {
        numberOfMissingLetters = Math.floor(word.length * 0.5); // Medium: 50% missing
    } else if (mode === 'Expert') {
        numberOfMissingLetters = Math.floor(word.length * 0.7); // Expert: 70% missing
    } else {
        numberOfMissingLetters = Math.floor(word.length * 0.3); // Default: 30% missing
    }

    for (let i = 0; i < numberOfMissingLetters; i++) {
        const randomIndex = Math.floor(Math.random() * word.length);
        if (wordArray[randomIndex] !== '_') {
            wordArray[randomIndex] = '_'; // Replace letter with underscore
        }
    }

    return wordArray.join('');
}

// Update the displayed word with correct guesses
function updateDisplayedWord(letter: string) {
    let updatedMaskedWord = '';

    for (let i = 0; i < selectedWord.length; i++) {
        if (maskedWord[i] === '_' && selectedWord[i] === letter) {
            updatedMaskedWord += letter;
        } else {
            updatedMaskedWord += maskedWord[i];
        }
    }

    maskedWord = updatedMaskedWord;
    div.innerHTML = `<span>${maskedWord}</span>`;
}

// Handle user guesses
submitGuess.addEventListener('click', () => {
    const guessedLetter = guessInput.value;
    guessInput.value = ''; // Clear input

    if (guessedLetter && remainingMoves > 0) {
        if (selectedWord.indexOf(guessedLetter) !== -1) {

            updateDisplayedWord(guessedLetter); // Update the displayed word
        } else {
            remainingMoves--;
            movesLeftDisplay.innerHTML = `Moves left: ${remainingMoves}`;
        }
    }

    if (maskedWord === selectedWord) {
        div.innerHTML='<span>Congratulations! You guessed the word!</span>';
    } else if (remainingMoves === 0) {
        div.innerHTML=`<span>Game over! The word was: ${selectedWord}</span>`;
    }
});

// Fetch words and start the game
function show() {
    fetch('words.json')
        .then(res => res.json())
        .then((data: Words) => {
            if (data.length > 0) {
                const randomIndex = Math.floor(Math.random() * data.length);
                selectedWord = data[randomIndex];

                // Mask the word and display it
                maskedWord = maskWord(selectedWord, mode);
                div.innerHTML = `<span>${maskedWord}</span>`;

                // Set the moves based on the selected mode
                setMovesBasedOnMode(mode);
            } else {
                div.innerHTML = '<span>No words available</span>';
            }
        })
        .catch(error => {
            div.innerHTML = `<span>Error fetching words: ${error.message}</span>`;
        });
}

document.addEventListener("DOMContentLoaded", show);
