const block = document.querySelectorAll(".block");
let resetBtn = document.querySelector("#reset");
const newBtn = document.querySelector("#new-btn");
let msg = document.querySelector("#msg");
let count = 0;

let turnO = true;

const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8]
];

const resetGame = () =>{
  turnO = true;
  enableBlock();
  msg.innerText = "--- Start Game ---";
  msg.style.backgroundColor = "#3E517A"
}

block.forEach((block) => {
  block.addEventListener("click", ()=>{
  if (turnO){
     block.innerText = "O";
     turnO = false;
  }
  else {
  block.innerText = "X";
  turnO = true;
  }
  block.disabled = true;

  checkWinner();
  })  
});

const disableBlock = () =>{
  for (let box of block){
    box.disabled = true;
  }
}

const enableBlock = () =>{
  for (let box of block){
    box.disabled = false;
    box.innerText = "";
  }
}

const showWinner = (winner) =>{
  msg.innerText = `Winner is ${winner}`;
  msg.style.backgroundColor = "green";
  disableBlock();
}

const checkWinner = () =>{
  for (let pattern of winPatterns){
    let post1val = block[pattern[0]].innerText;
    let post2val = block[pattern[1]].innerText;
    let post3val = block[pattern[2]].innerText;

    if ( post1val != "" && post2val != "" && post3val != "" ){
      if (post1val === post2val && post2val === post3val ){
       showWinner(post1val);
      }
    }
  }
}

newBtn.addEventListener("click",resetGame);
resetBtn.addEventListener("click",resetGame);