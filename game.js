const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');

const btnUp = document.querySelector('#up');
const btnDown = document.querySelector('#down');
const btnLeft = document.querySelector('#left');
const btnRight = document.querySelector('#right');
const spanLives = document.querySelector('#lives')
const spanTime = document.querySelector('#time')
const spanRecord = document.querySelector('#record')
const pResult = document.querySelector('#result')

let canvasSize;
let elementsSize;
let level = 0;
let lives = 3;

let timeStart;
let timeInterval;
let timePlayer;

const playerPosition = {
    x: undefined,
    y: undefined,
}
const giftPosition = {
    x: undefined,
    y: undefined,
}
let enemiesPosition = []

window.addEventListener('load', setCanvasSize);
window.addEventListener('resize', setCanvasSize);

window.addEventListener('keydown', moveByKeys);
btnUp.addEventListener('click', moveUp);
btnDown.addEventListener('click', moveDown);
btnLeft.addEventListener('click', moveLeft);
btnRight.addEventListener('click', moveRight);

function setCanvasSize() {
    
    canvasSize = ((window.innerWidth + window.innerHeight) / 2) * 0.5

    canvasSize = Number(canvasSize.toFixed(0))

    canvas.setAttribute('width', canvasSize)
    canvas.setAttribute('height', canvasSize)

    elementsSize = canvasSize / 10;

    playerPosition.x = undefined
    playerPosition.y = undefined
    startGame()
}
function startGame() {
    
    game.font = elementsSize + 'px Verdana';
    game.textAlign = 'end';
    
    const map = maps[level]
    if(!map) {
        gameWin()
        return;
    }

    if(!timeStart) {
        timeStart = Date.now()
        timeInterval = setInterval(showTime, 100)
        showRecord()
    }
    
    

    const mapRows = map.trim().split('\n')
    const mapRowCols = mapRows.map(row => row.trim().split(''))

    showLives()

    enemiesPosition = []
    game.clearRect(0, 0, canvasSize, canvasSize)
    
// diferentes metodos mismo resultado
    // metodo 1
    mapRowCols.forEach((row, rowI) => {
     row.forEach((column, columnI) => {
        const emoji = emojis[column]
        const posX = elementsSize * (columnI + 1)
        const posY = elementsSize * (rowI + 1)

        game.fillText(emoji, posX, posY)

        if(column == 'O') {
            if(!playerPosition.x && !playerPosition.y) {
                playerPosition.x = posX
                playerPosition.y = posY
            }
        }else if(column == 'I') {
            giftPosition.x = posX
            giftPosition.y = posY
        }else if(column == 'X') {
            enemiesPosition.push({
                x: posX,
                y: posY
            })
        }
    })
   })
   
   movePlayer()
    
    // metodo 2
//    for(let row = 1; row <= 10;row++) {
//        for(let column = 1; column <= 10;column++) {
//            game.fillText(emojis[mapRowCols[row - 1][column - 1]], elementsSize * column, elementsSize * row)
//       }
//    }



    

    //game.fillRect(0,0,100,100)
    //game.clearRect(0,0,50,50)
    //game.clearRect(50,50,50,50)
    //game.fillStyle = 'purple'
    //game.font = '25px Verdana'
    //game.fillText('alune',50,70)
}
function movePlayer() {
    
    game.fillText(emojis['PLAYER'], playerPosition.x, playerPosition.y)

    const giftCollisionX = playerPosition.x.toFixed(3) == giftPosition.x.toFixed(3)
    const giftCollisionY = playerPosition.y.toFixed(3) == giftPosition.y.toFixed(3)
    const giftCollision = giftCollisionX && giftCollisionY

    if(giftCollision) {
        levelWin()
    }
    
    const enemyCollision = enemiesPosition.find(enemy => {
        const enemyCollisionX = enemy.x.toFixed(3) == playerPosition.x.toFixed(3)
        const enemyCollisionY = enemy.y.toFixed(3) == playerPosition.y.toFixed(3)
        
        return enemyCollisionX && enemyCollisionY
    })
    
    if(enemyCollision) {
        levelFail()
    }
}
function levelWin() {
    level++
    startGame()
}
function gameWin() {
    console.log('terminaste el juego');
    clearInterval(timeInterval)
    record()
}
function record() {
    const recordTime = localStorage.getItem('record')

    if(recordTime) {
        if(recordTime >= timePlayer) {
            localStorage.setItem('record', timePlayer)
            pResult.innerHTML = 'Felicidades, Superaste el record'
        } else {
            pResult.innerHTML = 'Lo siento, vuelve a intentarlo'
        }
    } else {
        localStorage.setItem('record', timePlayer)
        pResult.innerHTML = 'Primera vez? ahora intenta superarte'
    }
}
function showRecord() {
    spanRecord.innerHTML = localStorage.getItem('record')
}
function showLives() {
    const heartsArray = Array(lives).fill(emojis['HEART'])
    
    spanLives.innerHTML = ""
    heartsArray.forEach(heart => spanLives.append(heart))
    

    
}
function showTime() {
    timePlayer = Date.now() - timeStart
    spanTime.innerHTML = timePlayer

}
function levelFail() {
    lives--
    if(lives <= 0) {
        level = 0
        lives = 3
        timeStart = undefined
    }
    
    playerPosition.x = undefined
    playerPosition.y = undefined
    startGame()
}

function moveByKeys (event) {
    if(event.key == 'ArrowUp') {
        moveUp();
    } else if(event.key == 'ArrowDown') {
        moveDown();
    } else if(event.key == 'ArrowLeft') {
        moveLeft();
    } else if(event.key == 'ArrowRight') {
        moveRight();
    }
}
function moveUp () {
    if(playerPosition.y > elementsSize) {
        playerPosition.y -= elementsSize
        startGame()
    }
    startGame()
}
function moveDown () {
    if(playerPosition.y < canvasSize) {
        playerPosition.y += elementsSize
        startGame()
    }
    startGame()
}
function moveLeft () {
    if(playerPosition.x > elementsSize) {
        playerPosition.x -= elementsSize
        startGame()
    }
    startGame()
}
function moveRight () {
    if(playerPosition.x < canvasSize) {
        playerPosition.x += elementsSize
        startGame()
    }
    startGame()
}
