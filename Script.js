const cells = document.querySelectorAll('.cell');
const statusMessage = document.querySelector('.status-message');
const winnerMessage = document.querySelector('.winner-message');
const restartButton = document.querySelector('.restart-button');

let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

function handleCellClick(event) {
  const clickedCell = event.target;
  const clickedIndex = Array.from(cells).indexOf(clickedCell);

  if (gameBoard[clickedIndex] === '' && gameActive) {
    gameBoard[clickedIndex] = currentPlayer;
    clickedCell.textContent = currentPlayer;
    checkGameStatus();
    switchPlayer();
  }
}

function checkGameStatus() {
  const winningConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];

  for (let i = 0; i < winningConditions.length; i++) {
    const [a, b, c] = winningConditions[i];
    if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
      winnerMessage.textContent = `Player ${gameBoard[a]} wins!`;
      gameActive = false;

      // Add winning styling to the cells
      cells[a].classList.add('winner');
      cells[b].classList.add('winner');
      cells[c].classList.add('winner');

      // Disable all cells
      cells.forEach(cell => cell.classList.add('disabled'));
      return;
    }
  }

  if (!gameBoard.includes('')) {
    winnerMessage.textContent = "It's a tie!";
    gameActive = false;

    // Add tie styling to the game board
    cells.forEach(cell => cell.classList.add('tie'));
  }
}

function switchPlayer() {
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  if (gameActive) {
    statusMessage.textContent = `Player ${currentPlayer}'s turn`;
  }
}

function restartGame() {
  currentPlayer = 'X';
  gameBoard = ['', '', '', '', '', '', '', '', ''];
  gameActive = true;
  cells.forEach(cell => {
    cell.textContent = '';
    cell.classList.remove('winner', 'disabled', 'tie');
  });
  statusMessage.textContent = `Player ${currentPlayer}'s turn`;
  winnerMessage.textContent = '';
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartButton.addEventListener('click', restartGame);

