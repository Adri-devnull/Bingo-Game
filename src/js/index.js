// ELEMENTOS DEL DOM
const cardUserBingoElement = document.getElementById('user-card-bingo');
const cardPcBingoElement = document.getElementById('pc-card-bingo');
const numbersBingoElement = document.getElementById('numbers-bingo');

// FUNCION PARA GENERAR NUMEROS ALEATORIOS DEL 1 AL 99
const generateRandomNumbers = () => {
    return Math.floor(Math.random() * 99) + 1;
}

// FUNCION PARA PINTAR NUMEROS EN LA CARD DEL BINGO
let numbers = 0;
const printCardBingo = (card) => {
    const fragment = document.createDocumentFragment();
    while (numbers < 15) {
        const cell = document.createElement('span');
        cell.classList.add('cell');
        cell.dataset.id = generateRandomNumbers();
        cell.textContent = cell.dataset.id;
        fragment.append(cell)
        numbers++
    }
    card.append(fragment);
    numbers = 0;
}

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
    printCardBingo(cardUserBingoElement);
    printCardBingo(cardPcBingoElement);
};

// LLAMAMOS A LA FUNCION PARA PINTAR LOS NUMEROS DEL BINGO Y DE LOS CARTONES
printBingoNumbers();

let cardBingo = 0;
const bingoRandomNumber = () => {
    while (cardBingo < 15) {
        const randomNumber = generateRandomNumbers();
        const number = numbersToPlay[randomNumber];
        const bingoNumbers = numbersBingoElement.getElementsByTagName('span');
        // const spansUser = cardUserBingoElement.getElementsByTagName('span');

        if (bingoNumbers[number].textContent) {
            bingoNumbers[number].classList.add('orange')
        }
        cardBingo++
    }
}

bingoRandomNumber();



// // ARRAY CON LOS NUMEROS DEL CARTON DEL USUARIO Y DEL PC
// const userNumbers = [];
// const pcNumbers = [];

// // FUNCION PARA OBTENER LOS NUMEROS DEL CARTON DEL USUARIO Y DEL PC
// const cardContainBingoNumber = () => {
//     const boxSpansUser = document.getElementById('user-card-bingo');
//     const spansUser = boxSpansUser.getElementsByTagName('span');
//     const boxSpansPc = document.getElementById('pc-card-bingo');
//     const spansPc = boxSpansPc.getElementsByTagName('span');
//     for (let i = 0; i < spansUser.length; i++) {
//         userNumbers.push(spansUser[i].textContent);
//     }
//     for (let i = 0; i < spansPc.length; i++) {
//         pcNumbers.push(spansPc[i].textContent);
//     }
// }

// cardContainBingoNumber();
// console.log(userNumbers);
// console.log(pcNumbers);