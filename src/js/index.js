// ELEMENTOS DEL DOM
const boardGameElement = document.getElementById('boardgame');
const cardUserBingoElement = document.getElementById('user-card-bingo');
const cardPcBingoElement = document.getElementById('pc-card-bingo');


// FUNCION PARA GENERAR NUMEROS ALEATORIOS
const generateRandomNumbers = () => {
    return Math.floor(Math.random() * 100);
}

// FUNCION PARA PINTAR NUMEROS EN LA CARD DEL BINGO
let numbers = 0;
const fragment = document.createDocumentFragment();
const printCardBingo = (card) => {
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



