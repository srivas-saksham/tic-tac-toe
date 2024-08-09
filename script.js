//Fetching Object Models----------------------------------------------------------------------------------------------------------------
let boxes= document.querySelectorAll('.box')
let win = document.querySelector('#winningMsg')
let newGameBtn = document.querySelector('#newGameBtn')
let resetGameBtn = document.querySelector('#resetGameBtn')
let wholeCont = document.querySelector('.wholeCont')
let gameBg = document.querySelector('.gameBg')
let startGameBtn = document.querySelector('.startGame')
let title = document.querySelector('.title')
let turnStatus = document.querySelector('#turnStatus')
let footerCredit = document.querySelector('.footerCredit')
let turnO = true
let curr = 'O'
let cpuSearching = false
let didWin = false
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
//DESCRIBING FUNCTIONS-------------------------------------------------------------------------------------------------------------------
function winningMsg(winner){
    didWin = true
    if(checkList[0] == 'X'){
        winner = 'CPU'
        win.innerHTML = `${winner} Won the Match! Sad!`
    }
    else{
       winner = 'You'
       win.innerHTML = `Wohoo! ${winner} Won the Match!`
    }
    
    win.classList.remove('hide')
    gameBg.classList.add('gameBgWin')
    gameBg.classList.remove('gameBg')
    wholeCont.classList.remove('gameStartContent')
    wholeCont.classList.add('scaleDownAfterWin')
    console.log('@winningMsg')
}

function resetGame(){
    for(let box of boxes){
        box.setAttribute("class", "box Text")
        box.setAttribute("id", "")
        box.innerHTML = ''
        box.disabled = false
        win.classList.add('hide')
        turnStatus.innerText = 'Your Turn'
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

function smartComp() {
    findEmpty = []
    sign = 'X'
    for (let i=0; i<2; i++){
        for(pattern of winning){
            var lstval = []
            let compCheckList = []
            compCheckList.push(boxes[pattern[0]].innerText)
            compCheckList.push(boxes[pattern[1]].innerText)
            compCheckList.push(boxes[pattern[2]].innerText)
            for(j of compCheckList){
                if(j == ''){
                    lstval.push(j)
                }
            }
            if(lstval.length == 1){
                if( compCheckList[0] == sign && 
                    compCheckList[1] == sign ||
                    compCheckList[1] == sign && 
                    compCheckList[2] == sign ||
                    compCheckList[0] == sign &&
                    compCheckList[2] == sign ){
                    currentIndex = 0
                    for( i of compCheckList){
                        if (i == ''){
                            compChoice = pattern[currentIndex]
                            return
                        }
                        else{
                            currentIndex++
                        }
                    }   
                }
            }
        }
        sign = 'O'
    }
    if(boxes[4].innerText == ''){
        compChoice = 4
        return
    }
    else{
        do{
            compChoice = Math.floor(Math.random() * 9)
        }while(
            boxes[compChoice].innerText != ''
        )
    }     
}
function computerMove(){
    smartComp()
    // do{
    //     compChoice = Math.floor(Math.random() * 9)
    // }while(
    //     boxes[compChoice].innerText != ''
    // )
    boxes[compChoice].setAttribute('id', 'boxPerma')
    let sign = (turnO == true)? 'O' : 'X'
    boxes[compChoice].innerText = sign
    turnO = true
    boxes[compChoice].disabled = true
    turnStatus.innerText = 'Your Turn'
}

//DESCRIBING EVENT LISTENERS --------------------------------------------------------------------------------------------------------
boxes.forEach((box) => {
    box.addEventListener('mouseover', () => {
        if (box.getAttribute('id') != 'boxPerma' && cpuSearching != true){
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
        var lstCheck = []
        for (let i = 0; i < 9; i++) {
            if(boxes[i].innerText == ''){
                lstCheck.push(i)
            }
        }
        checkWin()
        if(wholeCont.getAttribute('class') != 'scaleDownAfterWin'){
            if(lstCheck.length > 1){
                turnStatus.innerText = "CPU's Turn"
                for(let box of boxes){
                    box.disabled = true
                }
                resetGameBtn.disabled = true
                cpuSearching = true
                setTimeout(() => {
                    computerMove()
                    checkWin()
                    for(let box of boxes){
                        if (box.innerText != 'X' &&
                            box.innerText != 'O'){
                                box.disabled = false
                        }
                        if (box.getAttribute('class') == 'boxTemp Text' &&
                            box.getAttribute('id') != 'boxPerma'){
                                box.disabled = false
                            
                        }
                        if (box.getAttribute('class') == 'boxTemp Text disabled'){
                            box.disabled = true
                        }
                    }
                    cpuSearching = false
                    resetGameBtn.disabled=false
                    console.log('inside settimeout')
                }, 2000);
                console.log('below settimeout')
            }
        }
        console.log('below below settimeout')
        checkWin()
    })
    resetGameBtn.addEventListener('click', () =>{
        resetGame()
    })
    newGameBtn.addEventListener('click', () =>{
        newGame()
    })
    startGameBtn.addEventListener('click', () =>{
        footerCredit.classList.replace('footerCredit', 'footerCredit2')
        wholeCont.classList.add('gameStartContent')
        title.classList.add('titleMoveUp')
        title.classList.remove('title')
        startGameBtn.classList.add('hiddenStartGameBtn')
        startGameBtn.classList.remove('startGame')
        turnStatus.classList.replace('hide', 'turnStatus')

    })
});

const checkWin = () => {
    for(pattern of winning){
        checkList.push(boxes[pattern[0]].innerText)
        checkList.push(boxes[pattern[1]].innerText)
        checkList.push(boxes[pattern[2]].innerText)
        if(checkList[0]!='' && checkList[1]!='' && checkList[2]!=''){
            if(checkList[0] == checkList[1] && checkList[1] == checkList[2]){
                turnStatus.innerText = ''
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
