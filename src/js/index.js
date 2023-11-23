// ELEMENTOS DEL DOM
const cardUserBingoElement = document.getElementById('user-card-bingo');
const cardPcBingoElement = document.getElementById('pc-card-bingo');
const numbersBingoElement = document.getElementById('numbers-bingo');
const buttonStartElement = document.getElementById('button');

// ARRAY CON LOS 99 NUMEROS DEL BINGO
const numbersToPlay = Array(99)
    .fill()
    .map((_, index) => index + 1);

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
const printBingoNumbers = () => {
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

// LLAMAMOS A LA FUNCION PARA PINTAR EN PANTALLA LOS CARTONES Y LOS NUMEROS DEL BINGO
printBingoNumbers();


// FUNCION PARA COMPLETAR LOS NUMEROS DEL BINGO Y LOS CARTONES 
let cardUserBingo = 0;
let cardPcBingo = 0;
const bingoRandomNumber = () => {
    const randomPosition = generateRandomNumbers();
    const number = numbersToPlay[randomPosition];

    const userNumber = cardUserBingoElement.querySelector(`span[data-id ='${number}']`);
    const pcNumber = cardPcBingoElement.querySelector(`span[data-id ='${number}']`);
    const bingoNumber = numbersBingoElement.querySelector(`span[data-id ='${number}']`);


    if (bingoNumber) {
        numbersToPlay.splice(randomPosition, 1)
        bingoNumber.classList.add('orange');
        if (pcNumber && bingoNumber.dataset.id === pcNumber.dataset.id) {
            pcNumber.classList.add('red');
            cardPcBingo++
        }
        if (userNumber && bingoNumber.dataset.id === userNumber.dataset.id) {
            userNumber.classList.add('green');
            cardUserBingo++
        } else {
            console.log('El numero no esta en los cartones');
        }
    }
}

// LLAMAR AL INTERVALO QUE LLAMA A LA FUNCION PARA PINTAR LOS NUMEROS DEL BINGO Y DE LOS CARTONES
const callInterval = () => {
    const intervalId = setInterval(() => {
        bingoRandomNumber()
        if (cardUserBingo === 15 || cardPcBingo === 15) {
            clearInterval(intervalId)
            console.log('BINGO COMPLETADO!');
        }
    }, 100)
}


// EVENTO DE ESCUCHA PARA INICIAR LA PARTIDA
buttonStartElement.addEventListener('click', () => {
    callInterval();
})

