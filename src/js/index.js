import { restartGame,printBingoNumbers,callInterval } from "./funcs";
import { buttonRestartElement, buttonStartElement } from "./elementsdom";

// LLAMAMOS A LA FUNCION PARA PINTAR EN PANTALLA LOS CARTONES Y LOS NUMEROS DEL BINGO
printBingoNumbers();

// EVENTO DE ESCUCHA PARA INICIAR LA PARTIDA
buttonStartElement.addEventListener('click', () => {
    callInterval();
});

// EVENTO DE ESCUCHA PARA REINICIAR LA PARTIDA
buttonRestartElement.addEventListener('click', () => {
    restartGame();
});
