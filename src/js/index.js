// ELEMENTOS DEL DOM
const boardGameElement = document.getElementById('boardgame');
const cardUserBingoElement = document.getElementById('user-card-bingo');
const cardPcBingoElement = document.getElementById('pc-card-bingo');
const numbersBingoElement = document.getElementById('numbers-bingo');


// FUNCION PARA GENERAR NUMEROS ALEATORIOS
const generateRandomNumbers = () => {
    return Math.floor(Math.random() * 100);
}

// FUNCION PARA PINTAR NUMEROS EN LA CARD DEL BINGO
let numbers = 0;
const printCardBingo = (card) => {
    const fragment = document.createDocumentFragment();
    while (numbers < 15) {
        const cell = document.createElement('span');
        cell.classList.add('cell');
        cell.textContent = generateRandomNumbers();
        fragment.append(cell)
        numbers++
    }
    card.append(fragment);
    numbers = 0;
}

printCardBingo(cardUserBingoElement);
printCardBingo(cardPcBingoElement);

// ARRAY CON LOS 99 NUMEROS DEL BINGO
const numbersToPlay = Array(100)
    .fill()
    .map((_, index) => index);

// FUNCION PARA PINTAR NUMEROS DEL BINGO
const printBingoNumbers = () => {
    const fragment = document.createDocumentFragment();
    for (let i = 1; i < numbersToPlay.length; i++) {
        const cell = document.createElement('span');
        cell.classList.add('cell');
        cell.textContent = i;
        fragment.append(cell);
    }
    numbersBingoElement.append(fragment);
};

printBingoNumbers();



