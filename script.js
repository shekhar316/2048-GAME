const grid = document.querySelector('.grid');
const score = document.getElementById('score');
const result = document.getElementById('result');
const width = 4;
var squares = [];
var points = 0;

function createBoard() {
    for (var i = 0; i < width * width; i++) {
        square = document.createElement('div');
        square.innerHTML = 0;
        grid.appendChild(square);
        squares.push(square);
    }
    generateRandom();
    generateRandom();
    colorChange();
}

function generateRandom() {
    var ar = [2,4, 4, 2,4, 2,2,2,4 ,4 ,2,4, 2, 4,2,2,4,2, 4, 4]
    var position = Math.floor(Math.random() * squares.length);
    if (squares[position].innerHTML == 0) {
        squares[position].innerHTML = ar[Math.floor(Math.random() * ar.length)];
        checkOver();
    } else {
        generateRandom();
    }
}

function moveRight() {
    for (var i = 0; i < width * width; i++) {
        if (i % 4 === 0) {
            var firstSquare = squares[i].innerHTML;
            var secondSquare = squares[i + 1].innerHTML;
            var thirdSquare = squares[i + 2].innerHTML;
            var fourthSquare = squares[i + 3].innerHTML;

            var row = [parseInt(firstSquare), parseInt(secondSquare), parseInt(thirdSquare), parseInt(fourthSquare)];

            var filteredRow = row.filter(num => num);
            var missing = width - filteredRow.length;
            var blank = Array(missing).fill(0);
            var newRow = blank.concat(filteredRow);

            squares[i].innerHTML = newRow[0];
            squares[i + 1].innerHTML = newRow[1];
            squares[i + 2].innerHTML = newRow[2];
            squares[i + 3].innerHTML = newRow[3];
        }
    }
}


function moveLeft() {
    for (var i = 0; i < width * width; i++) {
        if (i % 4 === 0) {
            var firstSquare = squares[i].innerHTML;
            var secondSquare = squares[i + 1].innerHTML;
            var thirdSquare = squares[i + 2].innerHTML;
            var fourthSquare = squares[i + 3].innerHTML;

            var row = [parseInt(firstSquare), parseInt(secondSquare), parseInt(thirdSquare), parseInt(fourthSquare)];

            var filteredRow = row.filter(num => num);
            var missing = width - filteredRow.length;
            var blank = Array(missing).fill(0);
            var newRow = filteredRow.concat(blank)

            squares[i].innerHTML = newRow[0];
            squares[i + 1].innerHTML = newRow[1];
            squares[i + 2].innerHTML = newRow[2];
            squares[i + 3].innerHTML = newRow[3];
        }
    }
}


function combineRow() {
    for (var i = 0; i < (width * width) - 1; i++) {
        if (squares[i].innerHTML === squares[i + 1].innerHTML) {
            var total = parseInt(squares[i].innerHTML) + parseInt(squares[i + 1].innerHTML);
            squares[i].innerHTML = total;
            squares[i + 1].innerHTML = 0;
            points += total;
            score.innerHTML = points;
        }
    }
    checkWin();
}


function moveDown() {
    for (var i = 0; i < width; i++) {
        var firstSquare = squares[i].innerHTML;
        var secondSquare = squares[i + width].innerHTML;
        var thirdSquare = squares[i + (width * 2)].innerHTML;
        var fourthSquare = squares[i + (width * 3)].innerHTML;

        var col = [parseInt(firstSquare), parseInt(secondSquare), parseInt(thirdSquare), parseInt(fourthSquare)];

        var filteredCol = col.filter(num => num);
        var missing = width - filteredCol.length;
        var blank = Array(missing).fill(0);
        var newCol = blank.concat(filteredCol);

        squares[i].innerHTML = newCol[0];
        squares[i + width].innerHTML = newCol[1];
        squares[i + (width * 2)].innerHTML = newCol[2];
        squares[i + (width * 3)].innerHTML = newCol[3];
    }
}

function moveUp() {
    for (var i = 0; i < width; i++) {
        var firstSquare = squares[i].innerHTML;
        var secondSquare = squares[i + width].innerHTML;
        var thirdSquare = squares[i + width * 2].innerHTML;
        var fourthSquare = squares[i + width * 3].innerHTML;

        var col = [parseInt(firstSquare), parseInt(secondSquare), parseInt(thirdSquare), parseInt(fourthSquare)];

        var filteredCol = col.filter(num => num);
        var missing = width - filteredCol.length;
        var blank = Array(missing).fill(0);
        var newCol = filteredCol.concat(blank);

        squares[i].innerHTML = newCol[0];
        squares[i + width].innerHTML = newCol[1];
        squares[i + width * 2].innerHTML = newCol[2];
        squares[i + width * 3].innerHTML = newCol[3];
    }
}

function combineCol() {
    for (var i = 0; i < 12; i++) {
        if (squares[i].innerHTML === squares[i + width].innerHTML) {
            var total = parseInt(squares[i].innerHTML) + parseInt(squares[i + width].innerHTML);
            squares[i].innerHTML = total;
            squares[i + width].innerHTML = 0;
            points += total;
            score.innerHTML = points;
        }
    }
    checkWin();
}

function checkWin(){
    for(var i = 0; i < squares.length; i++){
        if(squares[i].innerHTML == 2048){
            result.innerHTML = "YOU WON!!";
            document.getElementById("ub").disabled = true;
            document.getElementById("bb").disabled = true;
            document.getElementById("rb").disabled = true;
            document.getElementById("lb").disabled = true;
        }
    }
}

function checkOver(){
    var blank = 0;
    for(var i = 0; i < squares.length; i++){
        if(squares[i].innerHTML == 0){
            blank++;
        }
    }
    if(blank === 0){
        var rowC = 0;
        for (var i = 0; i < (width * width) - 1; i++) {
            if (squares[i].innerHTML === squares[i + 1].innerHTML) {
                rowC++;
            }
        }
        for (var i = 0; i < 12; i++) {
            if (squares[i].innerHTML === squares[i + width].innerHTML) {
                rowC++;
            }
        }
        if(rowC === 0){
            result.innerHTML = "GAME OVER!!";
            document.getElementById("ub").disabled = true;
            document.getElementById("bb").disabled = true;
            document.getElementById("rb").disabled = true;
            document.getElementById("lb").disabled = true;
        }

    }

    
}
function control(e){
    if (e.keyCode == '38') {
        keyUp();
    }
    else if (e.keyCode == '40') {
        keyDown();
    }
    else if (e.keyCode == '37') {
       keyLeft();
    }
    else if (e.keyCode == '39') {
       keyRight();
    }
}

document.addEventListener('keydown', control);


function keyRight() {
    moveRight();
    combineRow();
    moveRight();
    generateRandom();
    colorChange();
}

function keyLeft() {
    moveLeft();
    combineRow();
    moveLeft();
    generateRandom();
    colorChange();
}


function keyDown() {
    moveDown();
    combineCol();
    moveDown();
    generateRandom();
    colorChange();
}

function keyUp() {
    moveUp();
    combineCol();
    moveUp();
    generateRandom();
    colorChange();
}

createBoard();


function colorChange(){
    for (var i = 0; i < squares.length; i++){
        if (squares[i].innerHTML == 0){
            squares[i].style.backgroundColor = "#FFF4F4";
        }
        if (squares[i].innerHTML == 2){
            squares[i].style.backgroundColor = "#FFDBBF";
        }
        if (squares[i].innerHTML == 4){
            squares[i].style.backgroundColor = "#FFA578";
        }
        if (squares[i].innerHTML == 8){
            squares[i].style.backgroundColor = "#FF6F00";
        }
        if (squares[i].innerHTML == 16){
            squares[i].style.backgroundColor = "#FFF77D";
        }
        if (squares[i].innerHTML == 32){
            squares[i].style.backgroundColor = "#FFDF00";
        }
        if (squares[i].innerHTML == 64){
            squares[i].style.backgroundColor = "#FFBA00";
        }
        if (squares[i].innerHTML == 128){
            squares[i].style.backgroundColor = "#EF9B0F";
        }
        if (squares[i].innerHTML == 256){
            squares[i].style.backgroundColor = "#FA6A6A";
        }
        if (squares[i].innerHTML == 512){
            squares[i].style.backgroundColor = "#FD4443";
            squares[i].style.color = white;
        }
        if (squares[i].innerHTML == 1024){
            squares[i].style.backgroundColor = "#D0312E";
            squares[i].style.color = white;
        }
        if (squares[i].innerHTML == 2048){
            squares[i].style.backgroundColor = "#CE5501";
            squares[i].style.color = white;
        }
    } 
}


