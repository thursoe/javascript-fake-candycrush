const COLUNMS = 10;
const ROWS = 10;

const board = document.querySelector(".board")
const moveDisplay = document.querySelector("#move-status>span")
const scoreDisplay = document.querySelector("#score-status>span")


const itemsArray = [
  {
    name: 'blue',
    image: "<img src='./assets/bluecandy.png' alt=''>",
  },
  {
    name: 'green',
    image: "<img src='./assets/greencandy.png' alt=''>",
  },
  {
    name: 'red',
    image: "<img src='./assets/redcandy.png' alt=''>",
  },
  {
    name: 'yellow',
    image: "<img src='./assets/yellowcandy.png' alt=''>",
  },
]

let itemsChoosen = []
let adjoined = false
let score = 0
let move = 0

const displayMessage = () => {
        scoreDisplay.innerText = score
        moveDisplay.innerText = move
    }

function refresh(){
    itemsChoosen.forEach(item => {
        item.element.classList.toggle("border")
        if(adjoined){
            generateItems(item.element)
        }
    })
    
    itemsChoosen = []
}

function isMatched ([item1, item2, item3]) {
  idList = [item1.id, item2.id, item3.id];
  idList.sort ((a, b) => a - b);

  if (idList[0] + 1 == idList[1] && idList[1] + 1 == idList[2]) {
    if (item1.name == item2.name && item2.name == item3.name) {
        return true;
    }
  } else {
    return false;
  }
}

function checkResult(){
    adjoined = isMatched(itemsChoosen)
    if(adjoined){
        score += 10
    }

    move += 1
    setTimeout(refresh,300)
}

function clickCell(){
    const cellId = this.getAttribute("data-id")
    const itemName = this.getAttribute("data-name") 
    this.classList.add("scale")

    itemsChoosen.push({
        id : Number(cellId),
        name: itemName,
        element: this
    })

    if(itemsChoosen.length == 3){
        checkResult()
    }

    displayMessage()
}

function generateItems(cell){
    let randno = Math.floor(Math.random()*itemsArray.length)
    cell.setAttribute("data-name", itemsArray[randno].name)
    cell.innerHTML = itemsArray[randno].image
}

function generateBoard(){
    for (let i=0; i< COLUNMS * ROWS; i++){
        const cell = document.createElement("div")
        cell.setAttribute("data-id",i)
        cell.setAttribute("class", "cell")
        generateItems(cell)
        cell.addEventListener('click',clickCell)
        board.appendChild(cell)
    }
}

const gameStart = ()=> {
    generateBoard()
}

window.onload = gameStart()