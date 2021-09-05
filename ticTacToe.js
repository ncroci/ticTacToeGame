//make an array of the squares that will be clicked
let gridArray = $('.square').toArray();
//this empty array will hold the information on if an X or O was played
let emptyArray = ['', '', '', '', '', '', '', '', ''];
//this text is used to display whose turn it is
let playText = $('.heading');
//this is used for the alert that is displayed when someone has won, or its a draw
let gameOverText = $('#gameOver');
//these are all the combinations required for a win in tic tac toe
let winArray = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 4, 6],
    [2, 5, 8],
    [3, 4, 5],
    [6, 7, 8]
];
//initial player variables set to a string of which side they are
let player1 = "X";
let player2 = "O";
//this will alternate later, but X goes first
let currentPlayer = player1;
//sets up the squares so they can be clicked
gridArray.forEach((square, index) => {
    square.addEventListener("click", squareClicked);
});



function squareClicked(e) {
    const id = e.target.id;
    //checks to make sure square is empty
    if (!emptyArray[id]) {
        //assigns the currentplayers value to the square, adds it to the array, and to the div
        emptyArray[id] = currentPlayer;
        e.target.innerText = currentPlayer;
    }
    //each turn checks to see a winner or draw
    if (checkForWin()) {
        gameOverText.text(`${currentPlayer} has won!`);
        displayGameOver();
    }
    if (checkDraw()) {
        gameOverText.text("Game is a draw");
        displayGameOver();
    }
    // changes player if game continues
    swapPlayer();
}
//swaps player1 to player2 and vice versa, also changes header text
function swapPlayer() {
    if (currentPlayer === player1) {
        currentPlayer = player2;
        playText.text(`${currentPlayer}'s turn`);
    } else {
        currentPlayer = player1;
        playText.text(`${currentPlayer}'s turn`);
    }
}
//goes through the combos on the win array, checks to see if they match the initial empty array that is filled during game
function checkForWin() {
    return winArray.some(combo => {
        return combo.every(index => {
            return emptyArray[index] === currentPlayer
        });
    });
}
//similar to checkForWin, this one just sees if there are any values in the array other than 'X' or 'O'
function checkDraw() {
    return emptyArray.every(square => {
        return square.includes('X') || square.includes('O')
    });
}
//it starts out hidden in the css, and this changes that to show it
function displayGameOver() {
    document.getElementById("gameOver").style.display = "block";
}
//when button is clicked, this basically clears everything to what it was in the beginning
function restartGame() {
    emptyArray.forEach((space, index) => {
        emptyArray[index] = '';
    });
    gridArray.forEach((square) => {
        square.innerText = "";
    });
    currentPlayer = player1;
    playText.text("X's turn");
    document.getElementById("gameOver").style.display = "none";
}