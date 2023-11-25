import { cardUserBingoElement, numbersBingoElement,cardPcBingoElement,buttonRestartElement,buttonStartElement } from "./elementsdom";

// FUNCION PARA GENERAR EL ARRAY DE 99 NUMEROS
export const fillNumbersToPlay = () => {
    return Array(99)
    .fill()
    .map((_, index) => index + 1);
    
}

// ARRAY CON LOS 99 NUMEROS DEL BINGO
let numbersToPlay = fillNumbersToPlay();

// FUNCION PARA GENERAR NUMEROS ALEATORIOS DEL 1 AL 99
const generateRandomNumbers = () => {
    return Math.floor(Math.random() * numbersToPlay.length);
}

// FUNCION PARA CREAR 15 NUMEROS ALEATORIOS
const generateCardBingoNumbers = () => {
    const arrNumbers = [];
    while (arrNumbers.length < 15) {
        const number = generateRandomNumbers();
        if (!arrNumbers.includes(number)) {
            arrNumbers.push(number)
        }
    }
    return arrNumbers
}

// FUNCION PARA PINTAR LOS NUMEROS EN LOS CARTONES DEL BINGO
const printCardBingo = (card) => {
    const fragment = document.createDocumentFragment();
    const cardNumbers = generateCardBingoNumbers();
    for (let i = 0; i < cardNumbers.length; i++) {
        const cell = document.createElement('span');
        cell.classList.add('cell');
        cell.dataset.id = cardNumbers[i] + 1;
        cell.textContent = cardNumbers[i] + 1;
        fragment.append(cell)
    }
    card.append(fragment);
}

// FUNCION PARA PINTAR LOS NUMEROS DEL BINGO
export const printBingoNumbers = () => {
    const fragment = document.createDocumentFragment();
    for (let i = 1; i <= numbersToPlay.length; i++) {
        const cell = document.createElement('span');
        cell.classList.add('cell');
        cell.dataset.id = i;
        cell.textContent = i;
        fragment.append(cell);
    }
    numbersBingoElement.append(fragment);
    printCardBingo(cardUserBingoElement);
    printCardBingo(cardPcBingoElement);
};

// FUNCION PARA COMPLETAR LOS NUMEROS DEL BINGO Y LOS CARTONES 
let cardUserBingo = 0;
let cardPcBingo = 0;
const bingoRandomNumber = () => {
    const randomPosition = generateRandomNumbers();
    const number = numbersToPlay[randomPosition];

    const userNumber = cardUserBingoElement.querySelector(`span[data-id ='${number}']`);
    const pcNumber = cardPcBingoElement.querySelector(`span[data-id ='${number}']`);
    const bingoNumber = numbersBingoElement.querySelector(`span[data-id ='${number}']`);

    const currentNumber = document.getElementById('current-number');
    if (bingoNumber) {
        currentNumber.textContent = `Numero: ${bingoNumber.textContent}`
        numbersToPlay.splice(randomPosition, 1)
        bingoNumber.classList.add('orange');
        if (pcNumber && bingoNumber.dataset.id === pcNumber.dataset.id) {
            pcNumber.classList.add('red');
            cardPcBingo++
        }
        if (userNumber && bingoNumber.dataset.id === userNumber.dataset.id) {
            userNumber.classList.add('green');
            cardUserBingo++
        }
    }
}

// LLAMAR AL INTERVALO QUE LLAMA A LA FUNCION PARA PINTAR LOS NUMEROS DEL BINGO Y DE LOS CARTONES
let intervalId;
export const callInterval = () => {
    buttonStartElement.classList.add('hide');
    const pcWinner = document.getElementById('pc-winner');
    const userWinner = document.getElementById('user-winner');
    if (intervalId){
        clearInterval(intervalId);
    }
    intervalId = setInterval(() => {
        bingoRandomNumber()
        if (cardUserBingo === 15) {
            clearInterval(intervalId);
            userWinner.classList.add('show');
            userWinner.textContent = 'USER WINS';
            pcWinner.textContent = 'PC LOSE';
            buttonRestartElement.classList.remove('hide');
        }
        if (cardPcBingo === 15) {
            clearInterval(intervalId);
            pcWinner.classList.add('show');
            pcWinner.textContent = 'PC WINS!';
            userWinner.textContent = 'USER LOSE';
            buttonRestartElement.classList.remove('hide');
        }
    }, 300); 
}

// FUNCION PARA REINICIAR EL JUEGO
export const restartGame = () => {
    const userWinner = document.getElementById('user-winner');
    const pcWinner = document.getElementById('pc-winner');

    cardUserBingoElement.textContent = '';
    cardPcBingoElement.textContent = '';
    numbersBingoElement.textContent = '';
    userWinner.textContent = '';
    pcWinner.textContent= '';
    cardUserBingo = 0;
    cardPcBingo = 0;

    const bingoNumbers = numbersBingoElement.querySelectorAll('.cell');
    bingoNumbers.forEach((number) => {
        number.classList.remove('orange', 'red', 'green');
    });

    numbersToPlay = fillNumbersToPlay();
    console.log(numbersToPlay);
    printBingoNumbers();

    userWinner.classList.add('hide');
    pcWinner.classList.add('hide');
    callInterval();
    buttonStartElement.classList.add('hide');
};