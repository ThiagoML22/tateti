const cells = document.querySelectorAll('.cell');
const currentPlayerText = document.getElementById('current-player');
const restartButton = document.getElementById('restart-button');
const winnerMessage = document.getElementById('winnerMessage');
const winnerText = document.getElementById('winnerText');
const playAgainButton = document.getElementById('play-again');
const scoreXText = document.getElementById('scoreX');
const scoreOText = document.getElementById('scoreO');

let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let scoreX = 0;
let scoreO = 0;

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

cells.forEach((cell) => {
    cell.addEventListener('click', handleCellClick, { once: true });
});

restartButton.addEventListener('click', restartGame);
playAgainButton.addEventListener('click', playAgain);

function handleCellClick(e) {
    const cell = e.target;
    const cellIndex = cell.getAttribute('data-cell-index');

    // Actualiza el tablero
    board[cellIndex] = currentPlayer;
    cell.classList.add(currentPlayer);
    cell.textContent = currentPlayer; // Mantiene X y O visibles

    // Verifica si hay un ganador
    if (checkWinner()) {
        endGame(false);
    } else if (board.every(cell => cell)) {
        endGame(true);
    } else {
        // Cambia el turno
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        currentPlayerText.textContent = currentPlayer;
    }
}

function checkWinner() {
    return winningCombinations.some(combination => {
        const [a, b, c] = combination;
        return board[a] === currentPlayer && board[b] === currentPlayer && board[c] === currentPlayer;
    });
}

function endGame(isDraw) {
    if (isDraw) {
        winnerText.textContent = '¡Es un empate!';
    } else {
        winnerText.textContent = `¡El jugador ${currentPlayer} ha ganado!`;
        if (currentPlayer === 'X') {
            scoreX++;
            scoreXText.textContent = scoreX;
        } else {
            scoreO++;
            scoreOText.textContent = scoreO;
        }
    }
    winnerMessage.classList.add('show');
}

function restartGame() {
    // Reinicia el tablero y los puntajes
    board = ['', '', '', '', '', '', '', '', ''];
    cells.forEach(cell => {
        cell.classList.remove('X', 'O');
        cell.textContent = ''; // Elimina el texto de las celdas
        cell.addEventListener('click', handleCellClick, { once: true });
    });
    currentPlayer = 'X';
    currentPlayerText.textContent = currentPlayer;
    winnerMessage.classList.remove('show');

    // Reinicia los puntajes a cero
    scoreX = 0;
    scoreO = 0;
    scoreXText.textContent = scoreX;
    scoreOText.textContent = scoreO;
}

function playAgain() {
    // Reinicia el juego manteniendo los puntajes
    board = ['', '', '', '', '', '', '', '', ''];
    cells.forEach(cell => {
        cell.classList.remove('X', 'O');
        cell.textContent = ''; // Elimina el texto de las celdas
        cell.addEventListener('click', handleCellClick, { once: true });
    });
    currentPlayer = 'X';
    currentPlayerText.textContent = currentPlayer;
    winnerMessage.classList.remove('show');
}
