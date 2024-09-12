// // Global DOMs
// const cells = document.querySelectorAll(".cell");
// const restartBtn = document.querySelector("#restartBtn");
// const statusText = document.querySelector("#statusText");

// // A let variable to store clicked cells
// let options = ["", "", "", "", "", "", "", "", ""];

// // A variable that contains reference of winning condition
// const winConditions = [
//   [0, 1, 2],
//   [3, 4, 5],
//   [6, 7, 8],
//   [0, 3, 6],
//   [1, 4, 7],
//   [2, 5, 8],
//   [0, 4, 8],
//   [2, 4, 6],
// ];

// let running = false;
// let currentPlayer = "X";

// function initializeGame() {
//   cells.forEach((e) => e.addEventListener("click", cellClicked));

//   restartBtn.addEventListener("click", restartGame);
//   statusText.textContent = `${currentPlayer}'s turn`;

//   running = true;
// }

// function cellClicked() {
//   const cellIndex = this.getAttribute("cellIndex");
//   updateCell(this, cellIndex);
//   checkWinner();
// }

// function updateCell(cell, index) {
//   cell.textContent = currentPlayer;
//   options[index] = currentPlayer;
// }

// function changePlayer() {
//   currentPlayer = currentPlayer == "X" ? "O" : "X";
// }

// function checkWinner() {
//   let gamewon = false;
//   for (let i = 0; i < winConditions.length; i++) {
//     const condition = winConditions[i];
//     const cellA = options[condition[0]];
//     const cellB = options[condition[1]];
//     const cellC = options[condition[2]];

//     if (cellA == "" || cellB == "" || cellC == "") {
//       continue;
//     }

//     if (cellA == cellB && cellB == cellC) {
//       gamewon = true;
//       break;
//     }
//   }

//   if (gamewon) {
//     running = false;
//     statusText.textContent = `${currentPlayer} wins!`;
//   } else if (!options.includes("")) {
//     statusText.textContent = `Draw!`;
//   } else {
//     changePlayer();
//   }
// }

// function restartGame() {
//   cells.forEach((e) => (e.textContent = ""));
//   options = ["", "", "", "", "", "", "", "", ""];
//   currentPlayer = "X";
//   statusText.textContent = `${currentPlayer}'s turn`;
//   running = true;
// }

// initializeGame();

// Global DOMs and variables
const globalElem = (function () {
  const restartBtn = document.querySelector("#restartBtn");
  const cells = document.querySelectorAll(".cell");
  const statusText = document.querySelector("#statusText");
  const statusTextEditor = (text) => (statusText.textContent = text);
  let currentPlayer = "X";

  return {
    restartBtn,
    cells,
    statusText,
    statusTextEditor,
    currentPlayer,
  };
})();

const gameLogic = (function () {
  let running = false;
  let options = ["", "", "", "", "", "", "", "", ""];

  const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const initializeGame = () => {
    running = true;

    globalElem.cells.forEach((e) => e.addEventListener("click", cellClicked));

    globalElem.restartBtn.addEventListener("click", restartGame);

    globalElem.statusTextEditor(`${globalElem.currentPlayer}'s turn`);
  };

  const cellClicked = (e) => {
    const thisCell = e.currentTarget;
    const cellIndex = thisCell.getAttribute("cellIndex");
    updateCell(thisCell, cellIndex);
    checkWinner();
    // console.log(e.currentTarget.getAttribute("cellIndex"));
  };

  const updateCell = (cell, index) => {
    options[index] = globalElem.currentPlayer;
    cell.textContent = globalElem.currentPlayer;
  };

  const changePlayer = () =>
    (globalElem.currentPlayer = globalElem.currentPlayer == "X" ? "O" : "X");

  const checkWinner = () => {
    let gamewon = false;
    for (let i = 0; i < winConditions.length; i++) {
      const condition = winConditions[i];
      const cellA = options[condition[0]];
      const cellB = options[condition[1]];
      const cellC = options[condition[2]];

      if (cellA == "" || cellB == "" || cellC == "") {
        continue;
      }

      if (cellA == cellB && cellB == cellC) {
        gamewon = true;
        break;
      }
    }

    if (gamewon) {
      globalElem.statusTextEditor(`${globalElem.currentPlayer} wins!`);
      running = false;
    } else if (!options.includes("")) {
      globalElem.statusTextEditor(`Draw!`);
    } else {
      changePlayer();
    }
  };

  const restartGame = () => {
    options = ["", "", "", "", "", "", "", "", ""];
    globalElem.cells.forEach((e) => (e.textContent = ""));
    globalElem.currentPlayer = "X";
    globalElem.statusTextEditor(`${globalElem.currentPlayer}'s turn`);
    running = true;
  };

  return { initializeGame };
})();

gameLogic.initializeGame();
