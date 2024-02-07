// Game Constants & Variables
let ttime=120;
let countDownEl= document.getElementById("timer");
let inputDir = {x: 0, y: 0}; 
const foodSound = new Audio('chomp.mp3');
const gameOverSound = new Audio('gameend.mp3');
const moveSound = new Audio('move.mp3');
const musicSound = new Audio('mario.mp3');
let bonus=0;
let seq=[0,1,2,3,4];
let speed = 5;
let lastPaintTime=0;
let snakeArr=[
    {x:13, y:15}, {x:13, y:14}, {x:13, y:13}
]
let food=[{x:3, y:5}, {x:2, y:1}, {x:13, y:5}, {x:12, y:6}, {x:18, y:5}]
let score=0;
let m=0;
let colr=["red", "green", "blue", "white", "pink"];
var start = true;
let controls= document.querySelectorAll(".controls i")
//function to make sequence, 0 means red, 1 means green, 2 means blue, 3 means white , 4 means pink



// Game Functions
function main(ctime) {
    musicSound.play();
    window.requestAnimationFrame(main);
    if((ctime-lastPaintTime)/1000 < 1/speed){
        return;
    }
    lastPaintTime=ctime;
    gameEngine()
    
}
setInterval(updateTimer, 1000);

function updateTimer(){
    let seconds= ttime%60;
    const minutes= Math.floor(ttime/60);
    seconds = seconds<10 ? "0"+seconds : seconds;
    countDownEl.innerHTML=`${minutes}: ${seconds}`;
    ttime--;
}

function isCollide(snake){
    for(i=1; i<3; i++){
        if(snake[i].x===snake[0].x && snake[i].y===snake[0].y){
            alert("you have crashed into yourself!!")
            return true;
        }
    }
    if(snake[0].x>=20||snake[0].x<=0||snake[0].y>=20||snake[0].y<=0){
        alert("You have crashed into a wall!!")
        return true;
    }
    else if (ttime==0) {
        alert("Time Over!!")
        return true;
    }
    return false;
}



function gameEngine(){
    //Part 1 is updating the snake array
    if(isCollide(snakeArr)){
        gameOverSound.play();
        inputDir={x:0, y:0};
        musicSound.pause();
        // restarting
        // alert("Do you want to play againt");
        score=0;
        scoreBox.innerHTML="Score: "+score;
        speed=5;
        ttime=120;
        snakeArr=[{x:13, y:15}, {x:12, y:15}, {x:11, y:15}]
        musicSound.play()

    }
    //if food eaten
    for(i=0; i<5; i++){
        // if(isCollide(snakeArr)){
        //   break;
        // }
        if((snakeArr[0].x===food[seq[i]].x) && (snakeArr[0].y===food[seq[i]].y)){
            if(i==bonus) {  
                foodSound.play();
                if(seq[i]==0){
                    let a=2;
                    let b=16;
                    foodElemr.style.backgroundColor=""; 
                    food[0]={x: Math.round(a + (b-a)*Math.random()), y: Math.round(a + (b-a)*Math.random())};
                }
                else if(seq[i]==1){
                    let a=2;
                    let b=16;
                    foodElemg.style.backgroundColor="";
                    food[1]={x: Math.round(a + (b-a)*Math.random()), y: Math.round(a + (b-a)*Math.random())};
                }
                else if(seq[i]==2){
                    let a=2;
                    let b=16;
                    foodElemb.style.backgroundColor=""; 
                    food[2]={x: Math.round(a + (b-a)*Math.random()), y: Math.round(a + (b-a)*Math.random())};
                }
                else if(seq[i]==3){
                    let a=2;
                    let b=16;
                    foodElemw.style.backgroundColor="";
                    food[3]={x: Math.round(a + (b-a)*Math.random()), y: Math.round(a + (b-a)*Math.random())};
                }
                else{
                    let a=2;
                    let b=16;
                    foodElemp.style.backgroundColor="";
                    food[4]={x: Math.round(a + (b-a)*Math.random()), y: Math.round(a + (b-a)*Math.random())};
                }
                score+=1;
                bonus+=1;
                if(bonus==5){
                    bonus=0;
                    ttime+=5;
                }
                scoreBox.innerHTML="Score: "+score;
                if(score>hiscoreval){
                    hiscoreval=score;
                    localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
                    HiScoreBox.innerHTML="Hi Score: " + hiscoreval;
                }
            }
            
        }
    }

    //snake moving
    if (!(inputDir.x==0 && inputDir.y==0)){
        for(let i=2; i>=1; i--){
            snakeArr[i].x= snakeArr[i-1].x;
            snakeArr[i].y= snakeArr[i-1].y;
        }
        snakeArr[0].x +=inputDir.x;
        snakeArr[0].y +=inputDir.y;
    }
    //displaying
    board.innerHTML="";
    snakeArr.forEach((e, index)=>{
        snakeElem=document.createElement('div');
        snakeElem.style.gridRowStart = e.y;
        snakeElem.style.gridColumnStart=e.x;
        if(index==0){
            snakeElem.classList.add('head');
        }
        else{
            snakeElem.classList.add('snake');
        }
        board.appendChild(snakeElem);
    })
   
        foodElemr=document.createElement('div');
        foodElemr.style.gridRowStart = food[0].y;
        foodElemr.style.gridColumnStart=food[0].x;
        foodElemr.style.backgroundColor = 'red';
        foodElemr.classList.add('food'); 
        board.appendChild(foodElemr);            

        foodElemg=document.createElement('div');
        foodElemg.style.gridRowStart = food[1].y;
        foodElemg.style.gridColumnStart=food[1].x;
        foodElemg.classList.add('food');             
        foodElemg.style.backgroundColor = 'green';
        board.appendChild(foodElemg);   

        foodElemb=document.createElement('div');
        foodElemb.style.gridRowStart = food[2].y;
        foodElemb.style.gridColumnStart=food[2].x;
        foodElemb.classList.add('food');             
        foodElemb.style.backgroundColor = 'blue';
        board.appendChild(foodElemb);   

        foodElemw=document.createElement('div');
        foodElemw.style.gridRowStart = food[3].y;
        foodElemw.style.gridColumnStart=food[3].x;
        foodElemw.classList.add('food');             
        foodElemw.style.backgroundColor = 'white';
        board.appendChild(foodElemw);   

        foodElemp=document.createElement('div');
        foodElemp.style.gridRowStart = food[4].y;
        foodElemp.style.gridColumnStart=food[4].x;
        foodElemp.classList.add('food');             
        foodElemp.style.backgroundColor = 'pink';
        board.appendChild(foodElemp);   
        
        let col=document.createElement('div');
        col.classList.add('sequence-container');
        col.innerHTML=`<p id="sequence">${colr[bonus]}</p>`;

}


// Main logic starts here
musicSound.play();



//hiscore
let hiscore=localStorage.getItem("hiscore");
if(hiscore===null){
    hiscoreval=0;
    localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
}
else{
    hiscoreval=JSON.parse(hiscore);
    HiScoreBox.innerHTML="Hi Score: " + hiscore;
}

window.requestAnimationFrame(main);
window.addEventListener('keydown', e=>{
    if (start==true){
        
    }
   inputDir={x:0 , y:0};
   moveSound.play();
   switch (e.key) {
    case "ArrowUp":
        console.log("Arrow Up");
        inputDir={x:0, y:-1};
        break;
    case "ArrowDown":
        console.log("Arrow Down")
        inputDir={x:0, y:1};
        break;
    case "ArrowRight":
        console.log("Arrow Right")
        inputDir={x:1, y:0};
        break;
    case "ArrowLeft":
        console.log("Arrow Left")
        inputDir={x:-1, y:0};
        break;
    default:
        break;
   }
})

window.addEventListener("click", e=>{
        if (start==true){
            
        }
        console.log('clicked')
        console.log(e   )
       inputDir={x:0 , y:0};
       moveSound.play();
       switch (e.target) {
        case up:
            console.log("Arrow Up");
            inputDir={x:0, y:-1};
            break;
        case down:
            console.log("Arrow Down")
            inputDir={x:0, y:1};
            break;
        case right:
            console.log("Arrow Right")
            inputDir={x:1, y:0};
            break;
        case left:
            console.log("Arrow Left")
            inputDir={x:-1, y:0};
            break;
        default:
            break;
       }
    })
