//CONSTANT AND VARIABLES
let inputDir = {
    x: 0,
    y: 0
};
let foodsound=new Audio('food.mp3');
let gameoversound=new Audio('gameover.mp3')
let movesound=new Audio('move.mp3');
let musicSound=new Audio('music.mp3')
let speed=5
let lastPaintTime=0;
let snakearr=[
    {x:13,y:15}
]
let score=0;
food={x:6,y:7}


// GAME FUNCTIONS
function main(ctime){
    window.requestAnimationFrame(main);
    // console.log(ctime)
    if((ctime-lastPaintTime)/1000<1/speed){
        return
    }
    lastPaintTime=ctime
    gameEngine();
}
function isCollide(snake) {
    for(let i=1;i<snakearr.length;i++){
        if(snake[i].x===snake[0].x && snake[i].y===snake[0].y){
            
            return true
        }
    }
    if(snake[0].x>=18 || snake[0].x<0 || snake[0].y>=18 || snake[0].y<0){
        
        return true;
        
    }
    return false;

}

function gameEngine(){
    //part1 : Updating the snake array and food
    if(isCollide(snakearr)){
        gameoversound.play();
        musicSound.pause();
        inputDir={x:0,y:0};
        alert("Game Over. Press any key to play the game again")
        snakearr=[
            {x:13,y:15}
        ];
        musicSound.play();
        score=0; 
        
    }
    //if you ha ve eaten the food increment the score and regenrate the food
    if(snakearr[0].y===food.y && snakearr[0].x===food.x){
        foodsound.play()
        score+=1;
        if(score>highscoreval){
            highscoreval=score;
            localStorage.setItem("highscore",JSON.stringify(highscoreval))
            highscoreBox.innerHTML="Highest score: "+highscoreval
        }
        scoreBox.innerHTML="score:"+score
        snakearr.unshift({x:snakearr[0].x+inputDir.x,y:snakearr[0].y+inputDir.y})
        let a=2;
        let b=16;
        food={x:Math.round(a+(b-a)*Math.random()),y:Math.round(a+(b-a)*Math.random())}
    }
    //moving the snake
        for(let i=snakearr.length-2;i>=0;i--){

            snakearr[i+1]={...snakearr[i]}
        }
        snakearr[0].x+=inputDir.x;
        snakearr[0].y+=inputDir.y;
    // part2 : displaying snake
    board.innerHTML="";
    snakearr.forEach((e,index)=>{
        snakeElement=document.createElement('div');
        snakeElement.style.gridRowStart=e.y;
        snakeElement.style.gridColumnStart=e.x;
    
        if(index===0){
            snakeElement.classList.add('head')
        }else{
            snakeElement.classList.add('snake')
        }
        board.appendChild(snakeElement)
        
    })

    // displsy the food
        foodElement=document.createElement('div');
        foodElement.style.gridRowStart=food.y;
        foodElement.style.gridColumnStart=food.x;
        foodElement.classList.add('food')
        board.appendChild(foodElement)
}

//main logic starts here
musicSound.play();
let highscore=localStorage.getItem("highscore")
if(highscore===null){
    highscoreval=0;
    localStorage.setItem("highscore",JSON.stringify(highscoreval))
}else{
    highscoreval=JSON.parse(highscore);
    highscoreBox.innerHTML="Highest score:"+highscore;
}
window.requestAnimationFrame(main);
window.addEventListener('keydown',e=>{
    inputDir={x:0,y:1} // start the game
    movesound.play();

    switch (e.key) {
        case "ArrowUp":
            console.log("arrowLeft")
            inputDir.x= 0;
            inputDir.y= -1;
            break;
        case "ArrowDown":
            console.log("arrowdown")
            inputDir.x= 0;
           inputDir.y= 1;
            break;
        case "ArrowLeft":
            console.log("arrowleft")
            inputDir.x= -1;
            inputDir.y= 0;
            break;
        case "ArrowRight":
            console.log("arrowright")
            inputDir.x= 1;
            inputDir.y= 0;
            break;
        default:
            break;
    }
});

