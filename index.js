const boardSizeInput = document.getElementById('board-size');
const winLengthInput = document.getElementById('win-length');
const gridContainer = document.getElementById('grid');


let boardSize = parseInt(boardSizeInput.value);
let winLength = parseInt(winLengthInput.value);
let board = new Array(boardSize * boardSize);
let currentPlayer = 'X';
let gameOver = false;


function startGame() {
  boardSize = parseInt(boardSizeInput.value);
  winLength = parseInt(winLengthInput.value);
  board = new Array(boardSize * boardSize);
  currentPlayer = 'X';
  gameOver = false;
  renderBoard();
}

function reloadGame() {
  location.reload();
}

function renderBoard() {
  const gridContainer = document.getElementById('grid');
  gridContainer.innerHTML = '';
  gridContainer.style.width = `${boardSize * 52}px`;
  for (let i = 0; i < board.length; i++) {
    const cell = document.createElement('div');
    cell.className = 'cell';
    if (board[i] === 'X') {
      cell.classList.add('x-green');
    } else if (board[i] === 'O') {
      cell.classList.add('o-blue');
    }
    cell.addEventListener('click', () => {
      if (!gameOver && board[i] === undefined) {
        board[i] = currentPlayer;
        renderBoard();
        checkForWin();
        if (!gameOver) {
          currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
      }
    });
    cell.textContent = board[i];
    gridContainer.appendChild(cell);
  }
}


function checkForWin() {
   // Чекаю рядочки
   for (let i = 0; i < boardSize; i++) {
    for (let j = 0; j <= boardSize - winLength; j++) {
      let count = 0;
      for (let k = 0; k < winLength; k++) {
        if (board[i * boardSize + j + k] === currentPlayer) {
          count++;
        }
      }
      if (count === winLength) {
        gameOver = true;
        if (currentPlayer === 'X') {
          document.getElementById('xWins').textContent++;
        } else {
          document.getElementById('oWins').textContent++;
        }
        alert(`${currentPlayer} wins!`);
        return;
      }
    }
  }

  // Чекаю колонки
  for (let i = 0; i <= boardSize - winLength; i++) {
    for (let j = 0; j < boardSize; j++) {
      let count = 0;
      for (let k = 0; k < winLength; k++) {
        if (board[(i + k) * boardSize + j] === currentPlayer) {
          count++;
        }
      }
      if (count === winLength) {
        gameOver = true;
        if (currentPlayer === 'X') {
          document.getElementById('xWins').textContent++;
        } else {
          document.getElementById('oWins').textContent++;
        }
        alert(`${currentPlayer} wins!`);
        return;
      }
    }
  }

  // Чекаю діагоналі
  for (let i = 0; i <= boardSize - winLength; i++) {
    for (let j = 0; j <= boardSize - winLength; j++) {
      let count1 = 0;
      let count2 = 0;
      for (let k = 0; k < winLength; k++) {
        if (board[(i + k) * boardSize + j + k] === currentPlayer) {
          count1++;
        }
        if (board[(i + k) * boardSize + j + winLength - k - 1] === currentPlayer) {
          count2++;
        }
      }
      if (count1 === winLength || count2 === winLength) {
        gameOver = true;
        alert(`${currentPlayer} wins!`);
        if (currentPlayer === 'X') {
          document.getElementById('xWins').textContent++;
        } else {
          document.getElementById('oWins').textContent++;
        }
        return;
      }
    }
  }
}