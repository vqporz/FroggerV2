import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    gameLoop();
  }

}

var canvas: HTMLCanvasElement;
var ctx: CanvasRenderingContext2D;
var com = new Image(); com.src = "assets/comed.jpg";
var water = new Image(); water.src = "assets/water.png";
var background = new Image(); background.src ="assets/road.png";


function gameLoop(){
  draw();
}

window.onload = () => {
  canvas = <HTMLCanvasElement>document.getElementById('canvas');
  ctx = canvas.getContext("2d");
  gameLoop();
}

class myFrog{
  source:string = "assets/fouser.png";
  sx:number = 0;
  sy:number = 0;
  swidth:number = 40;
  sheight:number = 40;
  xCoord:number = 50;
  yCoord: number = 444;
  width: number = 30;
  height: number = 30;
  isDead: boolean = false;
  deadtime: number = 50;
}

// frog 
var frog = new myFrog();
var frogi = new Image(); frogi.src = "assets/fouser.png";

// key movement
class movement{
  rightPressed:boolean = false;
  leftPressed:boolean = false;
  upPressed:boolean = false;
  downPressed:boolean = false;
  up:boolean = true;
  down:boolean = true;
  right:boolean = true;
  left:boolean = true;
}

var move = new movement();

// car class
class theCar{
  carWidth:number = 60;
  carHeight:number = 40;
  carX:number[] = [100, 500, 460, 400, 460, 60, 100, 160]; 
  carSX:number[] = [0, 60, 120, 180, 0, 180, 60, 120]; 
  carY:number[] = [398, 398, 353, 308, 263, 353, 308, 263];

  lane1:number = 6;
  lane1LTR:boolean = true;
  lane2:number = 5;
  lane2LTR:boolean = true;
  lane3:number = 3;
  lane3LTR:boolean = false;
  lane4:number = 4;
  lane4LTR:boolean = false;

}

var myCar = new theCar();
var car = new Image(); car.src = "assets/car.png";


// log class
class log{
  logWidth:number = 120;
  logHeight:number = 30;
  logSpeed:number = 2;
  logX:number[] = [300, 40, 100, 400, 480, 60, 120, 500];
  logY:number[] = [180, 180, 136, 136, 92, 92, 48, 48];

}

var myLog = new log();
var logi = new Image(); logi.src = "assets/ram.png";

// pad variable
class pad{
  padWidth = 30;
  padHeight = 30;
  padY:number = 4;
  padX:number[] = [20, 120, 220, 320, 420, 520];
  padS:boolean[] =[false, false, false, false, false, false]; 
}

var myPad = new pad();
var cMail = new Image(); cMail.src = "assets/closemail.png";
var oMail = new Image(); oMail.src = "assets/openmail.png";


var lives = 3;
var livesLost = 0;
var play = true;
var victoryCondition = false;


document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e){
  if(frog.isDead){
    return;
  }
  if(e.keyCode == 39){move.rightPressed = true;}
  if(e.keyCode == 37){move.leftPressed = true;}
  if(e.keyCode == 38){move.upPressed = true;}
  if(e.keyCode == 40){move.downPressed = true;}
}

function keyUpHandler(e){
  if(e.keyCode == 39){move.rightPressed = false;}
  if(e.keyCode == 37){move.leftPressed = false;}
  if(e.keyCode == 38){move.upPressed = false;}
  if(e.keyCode == 40){move.downPressed = false;}
}

function drawBackground(){
  
  ctx.drawImage(background, 0, 0)

  ctx.drawImage(com, 0, 440, 570, 45);
  ctx.drawImage(com, 0, 220, 570, 45);
  ctx.fillStyle = "black";
  ctx.fillRect(0,485, 570, 540);

  ctx.beginPath();
  ctx.moveTo(0,395);
  ctx.lineTo(570,395);
  ctx.strokeStyle = "white";
  ctx.setLineDash([5]);
  ctx.lineWidth = 2;
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(0,350);
  ctx.lineTo(570,350);
  ctx.strokeStyle = "white";
  ctx.setLineDash([0]);
  ctx.lineWidth = 4;
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(0,305);
  ctx.lineTo(570,305);
  ctx.strokeStyle = "white";
  ctx.setLineDash([5]);
  ctx.lineWidth = 2;
  ctx.stroke();

  // ctx.fillStyle = "blue";
  // ctx.fillRect(0, 0, 570, 220);
  ctx.drawImage(water, 0, 0, 570, 220);
}

function drawFrog(){
  if(frog.isDead){
    ctx.drawImage(frogi, 120, frog.sy, frog.swidth, frog.sheight, frog.xCoord, frog.yCoord, frog.width, frog.height);
  }
  else{
    ctx.drawImage(frogi, frog.sx, frog.sy, frog.swidth, frog.sheight, frog.xCoord, frog.yCoord, frog.width, frog.height);
  }
}

function moveFrog(){
  if(move.upPressed == true && move.up == true && frog.yCoord > 20){
    frog.yCoord = frog.yCoord-44;
    move.up = false;
    frog.sx = 0;
  }
  if(move.upPressed == false){
    move.up = true;
  }
  
  if(move.downPressed == true && move.down == true && frog.yCoord + frog.height < canvas.height - 80){
    frog.yCoord = frog.yCoord+44;
    move.down = false;
    frog.sx = 0;
  }
  if(move.downPressed == false){
    move.down = true;
  }

  if(move.leftPressed == true && move.left == true && frog.xCoord > 20){
    frog.xCoord = frog.xCoord-44;
    move.left = false;
    frog.sx = 80;
  }
  if(move.leftPressed == false){
    move.left = true;
  }

  if(move.rightPressed == true && move.right == true && frog.xCoord + frog.width < canvas.width - 20){
    frog.xCoord = frog.xCoord+44;
    move.right = false;
    frog.sx = 40;
  }
  if(move.rightPressed == false){
    move.right = true;
  }
}

function drawCars(){

  var carsSX = [myCar.carSX[0], myCar.carSX[1], myCar.carSX[2], myCar.carSX[3], myCar.carSX[4], myCar.carSX[5], myCar.carSX[6], myCar.carSX[7]];
  var carsX = [myCar.carX[0], myCar.carX[1], myCar.carX[2], myCar.carX[3], myCar.carX[4], myCar.carX[5], myCar.carX[6], myCar.carX[7]];
  var carsY = [myCar.carY[0], myCar.carY[1], myCar.carY[2], myCar.carY[3], myCar.carY[4], myCar.carY[5], myCar.carY[6], myCar.carY[7]];

  for(var i = 0; i < carsX.length; i++){
    ctx.drawImage(car, carsSX[i], 0, 60, 35, carsX[i], carsY[i], myCar.carWidth, myCar.carHeight);
  }
}

function moveCars(){
 
  // Lane 1
  if(myCar.lane1LTR){
    if (myCar.carX[1] < canvas.width + 100){myCar.carX[1] = myCar.carX[1] + myCar.lane1;}
    else {
      myCar.carX[1] = - 100;
      myCar.carSX[1] = (Math.floor(Math.random()*4))*60;
    }

    if (myCar.carX[0] < canvas.width + 100){myCar.carX[0] = myCar.carX[0] + myCar.lane1;}
    else {
      myCar.carX[0] = -100;
      myCar.carSX[0] = (Math.floor(Math.random()*4))*60;
    }
  }
  else{
    if (myCar.carX[1] > - 100){myCar.carX[1] = myCar.carX[1] - myCar.lane1;}
    else {
      myCar.carX[1] = canvas.width+100;
      myCar.carSX[1] = (Math.floor(Math.random()*4))*60;
    }

    if (myCar.carX[0] > - 100){myCar.carX[0] = myCar.carX[0] - myCar.lane1;}
    else {
      myCar.carX[0] = canvas.width+100;
      myCar.carSX[0] = (Math.floor(Math.random()*4))*60;
    }
  }

  // Lane 2
  if(myCar.lane2LTR){
    if (myCar.carX[2] < canvas.width + 100){myCar.carX[2] = myCar.carX[2] + myCar.lane2;}
    else {
      myCar.carX[2] = - 100;
      myCar.carSX[2] = (Math.floor(Math.random()*4))*60;
    }

    if (myCar.carX[5] < canvas.width + 100){myCar.carX[5] = myCar.carX[5] + myCar.lane2;}
    else {
      myCar.carX[5] = -100;
      myCar.carSX[5] = (Math.floor(Math.random()*4))*60;
    }
  }
  else{
    if (myCar.carX[2] > - 100){myCar.carX[2] = myCar.carX[2] - myCar.lane2;}
    else {
      myCar.carX[2] = canvas.width+100;
      myCar.carSX[2] = (Math.floor(Math.random()*4))*60;
    }

  if (myCar.carX[5] > - 100){myCar.carX[5] = myCar.carX[5] - myCar.lane2;}
    else {
      myCar.carX[5] = canvas.width+100;
      myCar.carSX[5] = (Math.floor(Math.random()*4))*60;
    }
  }

  // lane 3
  if(myCar.lane3LTR){
    if (myCar.carX[3] < canvas.width + 100){myCar.carX[3] = myCar.carX[3] + myCar.lane3;}
    else {
      myCar.carX[3] = -100;
      myCar.carSX[3] = (Math.floor(Math.random()*4))*60;
    }

    if (myCar.carX[6] < canvas.width + 100){myCar.carX[6] = myCar.carX[6] + myCar.lane3;}
    else {
      myCar.carX[6] = -100;
      myCar.carSX[6] = (Math.floor(Math.random()*4))*60;
    }
  }
  else{
    if (myCar.carX[3] > - 100){myCar.carX[3] = myCar.carX[3] - myCar.lane3;}
    else {
      myCar.carX[3] = canvas.width+100;
      myCar.carSX[3] = (Math.floor(Math.random()*4))*60;
    }

    if (myCar.carX[6] > - 100){myCar.carX[6] = myCar.carX[6] - myCar.lane3;}
    else {
      myCar.carX[6] = canvas.width+100;
      myCar.carSX[6] = (Math.floor(Math.random()*4))*60;
    }
  }

  // lane 4
  if(myCar.lane4LTR){
    if (myCar.carX[4] < canvas.width + 100){myCar.carX[4] = myCar.carX[4] + myCar.lane4;}
    else {
      myCar.carX[4] = -100;
      myCar.carSX[4] = (Math.floor(Math.random()*4))*60;
  }

    if (myCar.carX[7] < canvas.width + 100){myCar.carX[7] = myCar.carX[7] + myCar.lane4;}
    else {
      myCar.carX[7] = -100;
      myCar.carSX[7] = (Math.floor(Math.random()*4))*60;
    }
  }
  else{
    if (myCar.carX[4] > - 100){myCar.carX[4] = myCar.carX[4] - myCar.lane4;}
    else {
      myCar.carX[4] = canvas.width+100;
      myCar.carSX[4] = (Math.floor(Math.random()*4))*60;
    }

    if (myCar.carX[7] > - 100){myCar.carX[7] = myCar.carX[7] - myCar.lane4;}
    else {
      myCar.carX[7] = canvas.width+100;
      myCar.carSX[7] = (Math.floor(Math.random()*4))*60;
    }
  }

}

function runOver(){
  var carsX = [myCar.carX[0], myCar.carX[1], myCar.carX[2], myCar.carX[3], myCar.carX[4], myCar.carX[5], myCar.carX[6], myCar.carX[7]];
  var carsY = [myCar.carY[0], myCar.carY[1], myCar.carY[2], myCar.carY[3], myCar.carY[4], myCar.carY[5], myCar.carY[6], myCar.carY[7]];

  if(!frog.isDead){
    for(var i = 0; i < carsX.length; i++){
      if(carsX[i] <= frog.xCoord + frog.width &&
        carsX[i] + myCar.carWidth >= frog.xCoord &&
        carsY[i] + myCar.carHeight >= frog.yCoord &&
        carsY[i] <= frog.yCoord + frog.height){
          
          frog.isDead = true;
          livesLost ++;
        }
    }
  }
}

function drawLogs(){
  var logsX = [myLog.logX[0], myLog.logX[1], myLog.logX[2], myLog.logX[3], myLog.logX[4], myLog.logX[5], myLog.logX[6], myLog.logX[7]];
  var logsY = [myLog.logY[0], myLog.logY[1], myLog.logY[2], myLog.logY[3], myLog.logY[4], myLog.logY[5], myLog.logY[6], myLog.logY[7]];
  for(var i = 0; i < logsX.length; i++)
    ctx.drawImage(logi, logsX[i], logsY[i], myLog.logWidth, myLog.logHeight);
}

function moveLogs(){
  if(myLog.logX[0] < canvas.width +100){
    myLog.logX[0] = myLog.logX[0] + myLog.logSpeed;
  }
  else{
    myLog.logX[0] = -100;
  }

  if(myLog.logX[1] < canvas.width +100){
    myLog.logX[1] = myLog.logX[1] + myLog.logSpeed;
  }
  else{
    myLog.logX[1] = -100;
  }

  if(myLog.logX[2] > 0-myLog.logWidth){
    myLog.logX[2] = myLog.logX[2] - myLog.logSpeed;
  }
  else{
    myLog.logX[2] = canvas.width + 100;
  }

  if(myLog.logX[3] > 0-myLog.logWidth){
    myLog.logX[3] = myLog.logX[3] - myLog.logSpeed;
  }
  else{
    myLog.logX[3] = canvas.width + 100;
  }

  if(myLog.logX[4] < canvas.width +100){
    myLog.logX[4] = myLog.logX[4] + myLog.logSpeed;
  }
  else{
    myLog.logX[4] = -100;
  }

  if(myLog.logX[5] < canvas.width +100){
    myLog.logX[5] = myLog.logX[5] + myLog.logSpeed;
  }
  else{
    myLog.logX[5] = -100;
  }

  if(myLog.logX[6] > 0-myLog.logWidth){
    myLog.logX[6] = myLog.logX[6] - myLog.logSpeed;
  }
  else{
    myLog.logX[6] = canvas.width + 100;
  }

  if(myLog.logX[7] > 0-myLog.logWidth){
    myLog.logX[7] = myLog.logX[7] - myLog.logSpeed;
  }
  else{
    myLog.logX[7] = canvas.width + 100;
  }
}

function float(){
  if(!frog.isDead){
    if(frog.yCoord < 200){
      if(myLog.logX[0] <= frog.xCoord + frog.width &&
        myLog.logX[0] + myLog.logWidth >= frog.xCoord &&
        myLog.logY[0] + myLog.logHeight >= frog.yCoord &&
        myLog.logY[0] <= frog.yCoord + frog.height){
          if(frog.xCoord < canvas.width - 30){
            frog.xCoord = frog.xCoord + myLog.logSpeed;
          }
        }
      else if(myLog.logX[1] <= frog.xCoord + frog.width &&
              myLog.logX[1] + myLog.logWidth >= frog.xCoord &&
              myLog.logY[1] + myLog.logHeight >= frog.yCoord &&
              myLog.logY[1] <= frog.yCoord + frog.height){
                if(frog.xCoord < canvas.width - 30){
                  frog.xCoord = frog.xCoord + myLog.logSpeed;
                }
              }
      else if(myLog.logX[2] <= frog.xCoord + frog.width &&
              myLog.logX[2] + myLog.logWidth >= frog.xCoord &&
              myLog.logY[2] + myLog.logHeight >= frog.yCoord &&
              myLog.logY[2] <= frog.yCoord + frog.height){
                if(frog.xCoord > 0){
                    frog.xCoord = frog.xCoord - myLog.logSpeed;
                  }
                }
      else if(myLog.logX[3] <= frog.xCoord + frog.width &&
                myLog.logX[3] + myLog.logWidth >= frog.xCoord &&
                myLog.logY[3] + myLog.logHeight >= frog.yCoord &&
                myLog.logY[3] <= frog.yCoord + frog.height){
                  if(frog.xCoord > 0){
                      frog.xCoord = frog.xCoord - myLog.logSpeed;
                    }
                  }
      else if(myLog.logX[4] <= frog.xCoord + frog.width &&
                myLog.logX[4] + myLog.logWidth >= frog.xCoord &&
                myLog.logY[4] + myLog.logHeight >= frog.yCoord &&
                myLog.logY[4] <= frog.yCoord + frog.height){
                  if(frog.xCoord < canvas.width - 30){
                      frog.xCoord = frog.xCoord + myLog.logSpeed;
                    }
                  }
      else if(myLog.logX[5] <= frog.xCoord + frog.width &&
                myLog.logX[5] + myLog.logWidth >= frog.xCoord &&
                myLog.logY[5] + myLog.logHeight >= frog.yCoord &&
                myLog.logY[5] <= frog.yCoord + frog.height){
                  if(frog.xCoord < canvas.width - 30){
                      frog.xCoord = frog.xCoord + myLog.logSpeed;
                    }
                  }
      else if(myLog.logX[6] <= frog.xCoord + frog.width &&
                myLog.logX[6] + myLog.logWidth >= frog.xCoord &&
                myLog.logY[6] + myLog.logHeight >= frog.yCoord &&
                myLog.logY[6] <= frog.yCoord + frog.height){
                  if(frog.xCoord > 0){
                      frog.xCoord = frog.xCoord - myLog.logSpeed;
                    }
                  }
      else if(myLog.logX[7] <= frog.xCoord + frog.width &&
                myLog.logX[7] + myLog.logWidth >= frog.xCoord &&
                myLog.logY[7] + myLog.logHeight >= frog.yCoord &&
                myLog.logY[7] <= frog.yCoord + frog.height){
                  if(frog.xCoord > 0){
                      frog.xCoord = frog.xCoord - myLog.logSpeed;
                    }
                  }
      else if (frog.yCoord < 220 && frog.yCoord > 44){
      frog.isDead = true; 
      livesLost ++;
      }
    }
  }
}

function drawPads(){
  
  var padsX = [myPad.padX[0], myPad.padX[1], myPad.padX[2], myPad.padX[3], myPad.padX[4], myPad.padX[5]]

  for(var i = 0; i < padsX.length; i++){
    ctx.drawImage(cMail, padsX[i], myPad.padY, myPad.padWidth, myPad.padHeight);
  }
}

function onPad(){
  if(myPad.padX[0] <= frog.xCoord + frog.width && 
    myPad.padX[0] + myPad.padWidth >= frog.xCoord &&
    myPad.padY + myPad.padHeight >= frog.yCoord &&
    myPad.padY <= frog.yCoord + frog.height){
      myPad.padS[0] = true;
      frog.yCoord = 444;
    }
    else if(myPad.padX[1] <= frog.xCoord + frog.width && 
      myPad.padX[1] + myPad.padWidth >= frog.xCoord &&
      myPad.padY + myPad.padHeight >= frog.yCoord &&
      myPad.padY <= frog.yCoord + frog.height){
        myPad.padS[1] = true;
        frog.yCoord = 444;
      }
    else if(myPad.padX[2] <= frog.xCoord + frog.width && 
      myPad.padX[2] + myPad.padWidth >= frog.xCoord &&
      myPad.padY + myPad.padHeight >= frog.yCoord &&
      myPad.padY <= frog.yCoord + frog.height){
        myPad.padS[2] = true;
        frog.yCoord = 444;
      }
    else if(myPad.padX[3] <= frog.xCoord + frog.width && 
      myPad.padX[3] + myPad.padWidth >= frog.xCoord &&
      myPad.padY + myPad.padHeight >= frog.yCoord &&
      myPad.padY <= frog.yCoord + frog.height){
        myPad.padS[3] = true;
        frog.yCoord = 444;
      }
    else if(myPad.padX[4] <= frog.xCoord + frog.width && 
      myPad.padX[4] + myPad.padWidth >= frog.xCoord &&
      myPad.padY + myPad.padHeight >= frog.yCoord &&
      myPad.padY <= frog.yCoord + frog.height){
        myPad.padS[4] = true;
        frog.yCoord = 444;
      }
    else if(myPad.padX[5] <= frog.xCoord + frog.width && 
      myPad.padX[5] + myPad.padWidth >= frog.xCoord &&
      myPad.padY + myPad.padHeight >= frog.yCoord &&
      myPad.padY <= frog.yCoord + frog.height){
        myPad.padS[5] = true;
        frog.yCoord = 444;
      }
    else if( frog.yCoord < 48){
      frog.yCoord = 444;
    }
  var pads = [myPad.padS[0], myPad.padS[1], myPad.padS[2], myPad.padS[3], myPad.padS[4], myPad.padS[5]];
  var padsX = [myPad.padX[0], myPad.padX[1], myPad.padX[2], myPad.padX[3], myPad.padX[4], myPad.padX[5]];

  for(var i = 0; i < pads.length; i++){
    if(pads[i] == true){
      ctx.drawImage(oMail, 0, 0, 40, 40, padsX[i], myPad.padY, 40, 40)
    }
  }
}

function drawLives(){
  if(lives - livesLost != 0){
    ctx.fillStyle ="white";
    ctx.font = "30px Arial";
    ctx.fillText("LIVES: "+(lives-livesLost),(canvas.width/2)-70, 525);
  }
}

function victory (){
  if(myPad.padS[0] && myPad.padS[1] && myPad.padS[2] && myPad.padS[3] && myPad.padS[4] && myPad.padS[5]){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "white";
    ctx.font = "40px Arial";
    ctx.fillText("CONGRATS, UR NOT IDIOT!",30, 250);
    ctx.font = "28px Arial";
    ctx.fillText("Refresh to play again!", 150, 465);
    victoryCondition = true;
    
  }
}

function gameOver(){
  if(lives - livesLost == 0){
    play = false;
    ctx.fillStyle = "white";
    ctx.font = "52px Arial";
    ctx.fillText ("YOU GOT SCAMMED!", 20, 100);
    ctx.font = "28px Arial";
    ctx.fillText("Refresh to try again!", 150, 150);
  }
}

function resize() {
  var height = window.innerHeight - 100;
  var ratio = canvas.width/canvas.height;
  var width = height * ratio;
  canvas.style.width = width + 'px';
  canvas.style.height = height + 'px';
}
window.addEventListener('load', resize, false);
window.addEventListener('resize',resize,false);

function draw(){
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if(victoryCondition == false){ 
    gameOver();
    drawLives();
  }
  if(play){
    drawBackground();
    drawLives();
    drawLogs();
    moveLogs();
    drawPads();
    onPad();
    if(frog.isDead){
      frog.deadtime--;
    }
    if(frog.deadtime == 0){
      frog.isDead = false;
      frog.deadtime = 50;
      frog.sx = 0;
      frog.yCoord = 444;
    }
    if(!victoryCondition){
      drawFrog();
    }
    moveFrog();
    drawCars();
    moveCars();
    runOver();
    float();
    victory();
  }

  window.requestAnimationFrame(draw);
}


// function refresh(): void {
//   window.location.reload();
// }