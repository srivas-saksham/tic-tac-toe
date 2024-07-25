//Fetching Object Models
let boxes= document.querySelectorAll('.box')
let win = document.querySelector('#winningMsg')
let newGameBtn = document.querySelector('#newGameBtn')
let resetGameBtn = document.querySelector('#resetGameBtn')
let wholeCont = document.querySelector('.wholeCont')
let gameBg = document.querySelector('.gameBg')
let startGameBtn = document.querySelector('.startGame')
let title = document.querySelector('.title')
let turnO = true
let curr = 'O'
let data = ['','','','','','','','','']
let checkList = []
let winning = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]
//DESCRIBING FUNCTIONS
function winningMsg(winner){
    win.innerHTML = `Wohoo! Player ${winner} Won the Match!`
    win.classList.remove('hide')
    gameBg.classList.add('gameBgWin')
    gameBg.classList.remove('gameBg')
    wholeCont.classList.remove('gameStartContent')
    wholeCont.classList.add('scaleDownAfterWin')
}

function resetGame(){
    for(let box of boxes){
        box.setAttribute("class", "box Text")
        box.setAttribute("id", "")
        box.innerHTML = ''
        box.disabled = false
        win.classList.add('hide')
        turnO = true
    }
}
function newGame(){
    for(let box of boxes){
        box.setAttribute("class", "box Text")
        box.setAttribute("id", "")
        box.innerHTML = ''
        box.disabled = false
        win.classList.add('hide')
        newGameBtn.classList.add('hide')
        resetGameBtn.classList.remove('hide')
        wholeCont.classList.add('wholeCont')
        wholeCont.classList.replace('scaleDownAfterWin', 'gameStartContent')
        gameBg.classList.replace('gameBgWin', 'gameBg')
        turnO = true
    }
}

//DESCRIBING EVENT LISTENERS
boxes.forEach((box) => {
    box.addEventListener('mouseover', () => {
        if (box.getAttribute('id') != 'boxPerma'){
            if (box.getAttribute('class') != 'boxTemp Text disabled'){
                box.setAttribute("class", "boxTemp Text")
                if (turnO == true){
                    curr = 'O'
                }
                else{
                    curr = 'X'
                }
                box.innerText = curr
            }
        }
    })  
    if (box.getAttribute('id') != 'boxPerma'){
        box.addEventListener('mouseleave', () => {
            if (box.getAttribute('id') != 'boxPerma'){
                if (box.getAttribute('class') != 'boxTemp Text disabled'){
                    box.setAttribute("class","box Text")
                    box.innerText = ''
                }
            }
        })
        
    }
    box.addEventListener('click', () => {
        box.setAttribute("id", "boxPerma")
        if (turnO == true){
            curr = 'O'
            box.innerText = curr

            turnO = false
            box.disabled = true
        }
        else{
            box.innerText = 'X'
            turnO = true
            box.disabled = true
        }
        checkWin()
    })
    resetGameBtn.addEventListener('click', () =>{
        resetGame()
    })
    newGameBtn.addEventListener('click', () =>{
        newGame()
    })
    startGameBtn.addEventListener('click', () =>{
        wholeCont.classList.add('gameStartContent')
        title.classList.add('titleMoveUp')
        title.classList.remove('title')
        startGameBtn.classList.add('hiddenStartGameBtn')
        startGameBtn.classList.remove('startGame')
    })
});

const checkWin = () => {
    for(pattern of winning){
        checkList.push(boxes[pattern[0]].innerText)
        checkList.push(boxes[pattern[1]].innerText)
        checkList.push(boxes[pattern[2]].innerText)
        if(checkList[0]!='' && checkList[1]!='' && checkList[2]!=''){
            if(checkList[0] == checkList[1] && checkList[1] == checkList[2]){
                for(let box of boxes){
                    box.setAttribute('class', 'boxTemp Text disabled')
                    box.disabled = true
                }
                boxes[pattern[0]].setAttribute('id','boxPermaGreen')
                boxes[pattern[1]].setAttribute('id','boxPermaGreen')
                boxes[pattern[2]].setAttribute('id','boxPermaGreen')
                resetGameBtn.classList.add('hide')
                newGameBtn.classList.remove('hide')
                wholeCont.classList.remove('wholeCont')
                winningMsg(checkList[0])
            }

        }
        checkList = []
    }
}