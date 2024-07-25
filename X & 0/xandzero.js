const X_CLASS = 'x'
const O_CLASS = 'o'
let oTurn

const cellElements = document.querySelectorAll('[data-cell]')
const board = document.getElementById('board')
const winMsgElement = document.querySelector('[data-wintxt]')
// const winMsg = document.querySelector('winMsg')

const winCombos = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
]

start()

function start() {
    oTurn = false
    cellElements.forEach(cell => {
        cell.addEventListener('click', handleClick, { once: true })
    })
    hoverClass()
}

function handleClick(e) {
    const cell = e.target
    const currentClass = oTurn ? O_CLASS : X_CLASS
    placeMark(cell, currentClass)
    if (checkWin(currentClass)) {
        endGame(false)
    }
    swap()
    hoverClass()
}

function endGame(draw) {
    if (draw) {

    } else {
        winMsgElement.innerText = `${oTurn ? "O" : "X"} wins`
    }
    // winMsg.classList.add('show')
}

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass)
}

function swap(params) {
    oTurn = !oTurn
}


function hoverClass() {
    board.classList.remove(X_CLASS)
    board.classList.remove(O_CLASS)

    if (oTurn) {
        board.classList.add(O_CLASS)
    } else {
        board.classList.add(X_CLASS)
    }
}

function checkWin(currentClass) {
    return winCombos.some(combos => {
        return combos.every(index => {
            return cellElements[index].classList.contains(currentClass)
        })
    })
}