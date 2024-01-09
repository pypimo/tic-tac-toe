const x_class = 'x'
const o_class = 'o'
const cellEle = document.querySelectorAll('[data-cell]');
const restartButton = document.getElementById('restartButton') 
const board = document.getElementById('board')
const winningMessageEle = document.getElementById('winning-message')
const winningMessageTextElement = document.querySelector('[data-winning-message]')
const WINNING_COMBINATIONS = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]
let circleTurn

startGame()

restartButton.addEventListener('click', startGame)

function startGame(){
    circleTurn = 1
    cellEle.forEach(cell => {
        cell.className = 'cell'
        cell.removeEventListener('click', handleClick)
        cell.addEventListener('click', handleClick, {once: true})
    }) 
    setBoardHover()
    winningMessageEle.classList.remove('show')
}

function handleClick(e) {
    const cell = e.target
    const currentClass = circleTurn ? o_class : x_class
    // mark
    placeMark(cell, currentClass)
    // win 
    if (checkWin(currentClass)) {
        endGame(false)
    } else if (isDraw()) {
        endGame(true)
    } else {
        swapTurns()
        setBoardHover() 
    }
}

function endGame(draw) {
    if (draw) {
        winningMessageTextElement.innerText = 'Draw!'
    } else {
        winningMessageTextElement.innerText = `${circleTurn ? "O's" : "X's"} Wins!`
    }
    winningMessageEle.classList.add('show')
}

function isDraw() {
    return [...cellEle].every(cell => {
        return cell.classList.contains(x_class) || cell.classList.contains(o_class)
    })
}

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass)
    // cell.className = "cell "+currentClass
}

function swapTurns() {
    circleTurn = !circleTurn
}

function setBoardHover() {
    if (circleTurn) board.className = "board " + o_class
    else board.className = "board " + x_class
}

function checkWin(currentClass) {
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => {
            return cellEle[index].classList.contains(currentClass)
        })
    })
}
