const grid = document.querySelector(".grid");
let squares = Array.from(document.querySelectorAll(".grid div "));
const scoreDisplay = document.querySelector("#score");
const startBtn = document.querySelector("#start-button");
const width = 10;
let nextRandom = 0;
let currentRotation = 0;
let timerID
let score = 0;

// tetris kusky
const lTetromino = [
  [1, width + 1, width * 2 + 1, 2],
  [width, width + 1, width + 2, width * 2 + 2],
  [1, width + 1, width * 2 + 1, width * 2],
  [width, width * 2, width * 2 + 1, width * 2 + 2],
];

const sTetromino = [
    [width*2, width*2+1,width+1,width+2],
    [0, width,width+1,width*2+1],
    [width, width+1, width*2+1, width*2+2],
    [2,width+2, width+1, width*2+1]
];

const tTetromino = [
  [1, width, width + 1, width + 2],
  [1, width + 1, width + 2, width * 2 + 1],
  [width, width + 1, width + 2, width * 2 + 1],
  [1, width, width + 1, width * 2 + 1],
];

const oTetromino = [
    [0,1,width,width+1],
    [0,1,width,width+1],
    [0,1,width,width+1],
    [0,1,width,width+1]
];

const iTetromino = [
    [1,width+1,width*2+1,width*3+1],
    [width,width+1,width+2,width+3],
    [1,width+1,width*2+1,width*3+1],
    [width,width+1,width+2,width+3]
]

const theTetrominoes = [
    lTetromino, sTetromino, tTetromino , oTetromino, iTetromino
]


let currentPosition = 4;

// random picked up a tetromino 
let random = Math.floor(Math.random()*theTetrominoes.length)
let randomShape = Math.random()

let current = theTetrominoes[random][0];


//  draw the tetromino
function draw() { 
    current.forEach(index => {
        squares[currentPosition + index].classList.add("tetromino") 
    })
}

//  undraw the tetromino 

function undraw() { 
    current.forEach(index => {
        squares[currentPosition + index].classList.remove("tetromino")
    })
}

//  move down tetromino each sec.
 
// timerID = setInterval(moveDown, 1000)

// assign functions to keyCodes 
function control(e) { 
    if(e.keyCode === 37) { 
        moveLeft()
    } else if (e.keyCode === 32) {
        rotate()
    } else if (e.keyCode === 39) {
        moveRight() 
    } else if (e.keyCode === 40) { 
         moveDown ()
    }
}
document.addEventListener("keyup", control)
// move down function 

function moveDown() { 
    undraw()
    currentPosition += width
    draw()
    freeze()
}


// freeze function

function freeze () { 
    if (current.some(index => squares[currentPosition + index + width].classList.contains("taken"))) {
        current.forEach(index => squares[currentPosition + index].classList.add("taken"))
        // start a new tetromino failing 
        random = nextRandom
        nextRandom = Math.floor(Math.random() * theTetrominoes.length)
        current = theTetrominoes[random][currentRotation]
        currentPosition = 4
        draw()
        displayShape()
        addScore()
        gameOver()
    }

}

//  move the tetromino unless its at the edge of the grid 

//  move left 
function moveLeft() { 
    undraw()
    const itsAtLeftEdge = current.some(index => (currentPosition + index ) % width === 0)

    if (!itsAtLeftEdge) currentPosition -=1

    if (current.some(index => squares[currentPosition + index].classList.contains("taken"))) {
        currentPosition +=1
    }

    draw()
}

//  move right 

function moveRight() { 
    undraw()
    const isAtRightEdge = current.some(index => (currentPosition + index) % width === width -1)

    if(!isAtRightEdge) currentPosition +=1 

    if(current.some(index => squares[currentPosition + index].classList.contains("taken"))) { 
        currentPosition -=1
    }

    draw()
}

// rotate tetromino 

function rotate() { 
    console.log("rotate function called")
    console.log(currentPosition)
    undraw()
    currentRotation ++
    if(currentRotation === current.length) {     
        currentRotation = 0
    }
    current = theTetrominoes[random] [currentRotation]
    draw()
    console.log(currentPosition)
}


// show up next tetromino 

const displaySquares = document.querySelectorAll(".mini-grid div")    
const displayWidth = 4
let displayIndex = 0 


//  Mini tetrominos 
const upNextTetrominoes = [
    [1, displayWidth +1 , displayWidth*2+1, 2 ], // Ltetrak 
    [0, displayWidth, displayWidth+1, displayWidth*2+1, ], // zTetrak
    [1, displayWidth, displayWidth+1, displayWidth+2 ], //tTetrak
    [0,1, displayWidth, displayWidth+1], //oTetrak
    [1, displayWidth+1, displayWidth*2+1, displayWidth*3+1]
]

// diplay a shape 

function displayShape() {
    //  remove tetrisak from the grid 
    displaySquares.forEach(square => {
        square.classList.remove("tetromino")
    })

    upNextTetrominoes[nextRandom].forEach(index => {
        displaySquares[displayIndex + index].classList.add("tetromino")
    })
}   

//  buttons functionality Start and Pause

startBtn.addEventListener("click" , () => {
    if (timerID) { 
        clearInterval(timerID)
        timerID = null
    } else  { 
        draw()
        timerID = setInterval(moveDown, 1000)
        nextRandom = Math.floor(Math.random()*theTetrominoes.length)
        displayShape
    }
})


// add score 

function addScore() { 
    for (let i = 0; i < 199; i += width) {
        const row = [i, i+1, i+2, i+3, i+4, i+5, i+6, i+7, i+8, i+9]
        if (row.every(index => squares[index].classList.contains("taken"))) {
            score += 10;
            scoreDisplay.innerHTML = score
            row.forEach(index => {
                squares[index].classList.remove("taken")
                squares[index].classList.remove("tetromino")
            })
            const squaresRemoved = squares.splice(i, width)
            squares = squaresRemoved.concat(squares)
            squares.forEach(cell => grid.appendChild(cell))
        }
    }
}

//  game over ! 

function gameOver() { 
    if(current.some(index => squares [currentPosition + index].classList.contains("taken"))) {
        scoreDisplay.innerHTML = "end"
        clearInterval(timerID)
        alert("game over loozer!!!")
    }
}


