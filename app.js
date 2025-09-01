// let boxes = document.querySelectorAll(".box");
// let rstbtn = document.querySelector("#rst-btn");
// let newgm = document.querySelector("#new-btn");
// let msgcon = document.querySelector(".msg-container");
// let msg = document.querySelector("#msg");

// let turnO = true; 
// const winPatterns = [ 
//     [0,1,2],
//     [0,3,6],
//     [0,4,8],
//     [1,4,7],
//     [2,5,8],
//     [2,4,6],
//     [3,4,5],
//     [6,7,8]
// ];


// const rstgm = () => {
//     turnO = true;
//     enableBoxes();
//     msgcon.classList.add("hide");

// }


// boxes.forEach((box) => {
//     box.addEventListener("click", () => {
//         console.log("Box was clicked");
//       if(turnO){
//         //player O
//          box.innerText = "O";
//         turnO = false;
//       }  else{
//         // player X
//         box.innerText = "X";
//         turnO = true;
//       }
//       box.disabled = true;

//       checkWinner();

//     });
// });
// const disableBoxes = () => {
//     for(let box of boxes){
//         box.disabled = true;
//     }
// }
// const enableBoxes = () => {
//     for(let box of boxes){
//         box.disabled = false;
//         box.innerText = "";
//     }
// }
// const showWinner = (winner) => {
//     msg.innerText = `Congratulations , winner is ${winner}`;
//     msgcon.classList.remove("hide");
//     disableBoxes();

// };
// const checkWinner = () => {
//     for(let pattern of winPatterns){
//         // console.log(pattern[0],pattern[1],pattern[2]);
//         // console.log(boxes[pattern[0]].innerText,
//         //             boxes[pattern[1]].innerText,
//         //             boxes[pattern[2]].innerText
//         //            );
//                    let posval1 = boxes[pattern[0]].innerText;
//                    let posval2 = boxes[pattern[1]].innerText;
//                    let posval3 = boxes[pattern[2]].innerText;

//                    if(posval1 != "" && posval2 != "" && posval3 != ""){
//                     if(posval1 == posval2 && posval2 == posval3){
//                         console.log("winner",posval1);
//                         showWinner(posval1);
//                     }
//                    }
//     }
// };


// newgm.addEventListener("click",rstgm);
// rstbtn.addEventListener("click",rstgm);

let boxes = document.querySelectorAll(".box");
let rstBtn = document.querySelector("#rst-btn");
let newBtn = document.querySelector("#new-btn");
let msgCon = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let darkToggle = document.querySelector("#dark-toggle");

let xScoreDisplay = document.getElementById("xScore");
let oScoreDisplay = document.getElementById("oScore");
let drawDisplay = document.getElementById("draws");

let xScore = 0;
let oScore = 0;
let draws = 0;

let turnO = true;
let gameOver = false;

const winPatterns = [
  [0, 1, 2], [0, 3, 6], [0, 4, 8],
  [1, 4, 7], [2, 5, 8], [2, 4, 6],
  [3, 4, 5], [6, 7, 8]
];

const enableBoxes = () => {
  boxes.forEach(box => {
    box.disabled = false;
    box.innerText = "";
    box.style.color = ""; // reset color
  });
  gameOver = false;
};

const disableBoxes = () => {
  boxes.forEach(box => box.disabled = true);
};

const rstGame = () => {
  turnO = true;
  enableBoxes();
  msgCon.classList.add("hide");
};

const checkWinner = () => {
  for (let pattern of winPatterns) {
    let [a, b, c] = pattern;
    let val1 = boxes[a].innerText;
    let val2 = boxes[b].innerText;
    let val3 = boxes[c].innerText;

    if (val1 && val1 === val2 && val2 === val3) {
      showWinner(val1);
      return;
    }
  }

  let isDraw = [...boxes].every(box => box.innerText !== "");
  if (isDraw && !gameOver) {
    draws++;
    drawDisplay.innerText = draws;
    msg.innerText = "It's a Draw!";
    msgCon.classList.remove("hide");
    gameOver = true;
  }
};

const showWinner = (winner) => {
  msg.innerText = `Congratulations, winner is ${winner}`;
  msgCon.classList.remove("hide");
  disableBoxes();
  gameOver = true;

  if (winner === "X") {
    xScore++;
    xScoreDisplay.innerText = xScore;
  } else {
    oScore++;
    oScoreDisplay.innerText = oScore;
  }
};

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (box.innerText !== "" || gameOver) return;

    if (turnO) {
      box.innerText = "O";
      box.style.color = "green";
      turnO = false;
    } else {
      box.innerText = "X";
      box.style.color = "#b0413e";
      turnO = true;
    }
    box.disabled = true;
    checkWinner();
  });
});

newBtn.addEventListener("click", rstGame);
rstBtn.addEventListener("click", rstGame);

darkToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
});
