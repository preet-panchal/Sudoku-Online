/**
 * CSCI3230U - Lab04
 * Preet Panchal - 100707094
 */


// listing neccessary variables
var user_num;
var last_input = [];
// sudoku board puzzle input
var fillBoard = [[-1,1,-1,-1,-1,-1,-1,9,-1],
                [-1,-1,4,-1,-1,-1,2,-1,-1],
                [-1,-1,8,-1,-1,5,-1,-1,-1],
                [-1,-1,-1,-1,-1,-1,-1,3,-1],
                [2,-1,-1,-1,4,-1,1,-1,-1],
                [-1,-1,-1,-1,-1,-1,-1,-1,-1],
                [-1,-1,1,8,-1,-1,6,-1,-1],
                [-1,3,-1,-1,-1,-1,-1,8,-1],
                [-1,-1,6,-1,-1,-1,-1,-1,-1]];

window.onload = function() {
    // creating sudoku table
    var board = document.getElementById("board");
    generateBoard(board, fillBoard);

    // creating the palette
    var palette = document.getElementById("palette");
    generatePalette(palette);

    // reset board for new game
    resetBoard(board);
};

function generateBoard(board, fillBoard) {
    for (let i = 0; i < 9; i++) { // creating each row
        let tr = board.insertRow(); 
        for (let j = 0; j < 9; j++) { // creating each column
            let td = tr.insertCell();
            td.setAttribute("name",`cell${i}${j}`)
            td.appendChild(document.createTextNode(fillBoard[i][j]));
        }
    }
    boardFunction(board);
};

function boardFunction(board) {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            board.rows[i].cells[j].onclick = function() {
                if (user_num != null && checkSelectedNum(board, i, j)) {
                    board.rows[i].cells[j].textContent = user_num.textContent;
                    last_input = [i, j];
                }
            };
        }
    }
};

function checkSelectedNum(board, row, col) {
    let flag = true;
    // Check same block
    let firstRow = Math.floor(row / 3) * 3;
    let firstCol = Math.floor(col / 3) * 3;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board.rows[firstRow+i].cells[firstCol+j].textContent == user_num.textContent && (document.getElementsByName(`cell${firstRow+i}${firstCol+j}`) != `cell${row}${col}`)) {
                board.rows[firstRow+i].cells[firstCol+j].classList.add("error");
                console.log("block");
                flag = false;
            }
        }
    }

    // Check same row
    for (let i = 0; i < 9; i++) {
        if (board.rows[row].cells[i].textContent == user_num.textContent && (document.getElementsByName(`cell${row}${i}`) != `cell${row}${col}`)) {
            board.rows[row].cells[i].classList.add("error");
            console.log("row");
            flag = false;
        }
    }

    // Check same column
    for (let i = 0; i < 9; i++) {
        if (board.rows[i].cells[col].textContent == user_num.textContent && (document.getElementsByName(`cell${i}${col}`) != `cell${row}${col}`)) {
            board.rows[i].cells[col].classList.add("error");
            console.log("col");
            flag = false;
        }
    }
    return flag;
};

function generatePalette(palette) {
    let tr = palette.insertRow();
    for (let i = 1; i <= 10; i++) {
        if (i == 10) { // adding undo image at the end of palette
            let undo = document.createElement("img");
            let td = tr.insertCell();
            undo.src = "images/undo.png";
            td.appendChild(undo);
        } else { // adding user_nums 1-9 to palette
            let td = tr.insertCell();
            td.appendChild(document.createTextNode(i));
        }
    }
    paletteFunction(palette);
};

function paletteFunction(palette) {
    for (let i = 0; i < 10; i++) {
        if (i < 9) {
            palette.rows[0].cells[i].onclick = function() {
                if (!this.classList.contains("selected")) {
                    for (let j = 0; j < 9; j++){                        
                        palette.rows[0].cells[j].classList.remove("selected")
                    }
                    this.classList.add("selected");
                    user_num = this;
                } else {
                    this.classList.remove("selected");
                    user_num = null;
                }                            
            };
        } else {
            palette.rows[0].cells[i].onclick = function() {
                if (last_input.length > 0) {
                    let text = document.createTextNode(fillBoard[last_input[0]][last_input[1]]);
                    let boardCell = document.getElementsByName(`cell${last_input[0]}${last_input[1]}`)[0];
                    boardCell.textContent = text.textContent;
                }
                let errorCells = document.getElementsByClassName("error");
                while (errorCells[0]) {
                    errorCells[0].classList.remove("error");
                }
            }
        }
    }
};

function resetBoard(board) {
    document.getElementById("reset").onclick = function() {
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                let text = document.createTextNode(fillBoard[i][j]);
                board.rows[i].cells[j].textContent = text.textContent;
            }
        }
        let errorCells = document.getElementsByClassName("error");
        while (errorCells[0]) {
            errorCells[0].classList.remove("error");
        }
    }
};