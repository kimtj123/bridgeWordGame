var main = document.getElementById('main');
var wordList = ['가나','다라','마바'];
var power = true;
var word = '';
var bloodIdx = 9;
var stage = 1;

function Block(word,fallSec) {
    this.element = document.createElement('div');
    let ele = this.element;
    ele.className = 'blocks';
    ele.innerText = word;
    ele.id = word;
    ele.style.left = 210+Math.floor((Math.random()*1300))+'px';
    ele.style.display = 'inline-block';
    ele.style.position = 'absolute';
   // console.log(this);
    ele.style.WebkitAnimation = "mymove "+fallSec+'s'; // Code for Chrome, Safari and Opera
    ele.animation = "mymove "+fallSec+'s';     // Standard syntax
    ele.addEventListener("webkitAnimationEnd", myEndFunction); // 바닥에 닿으면 사라진다.
    //ele.style.animation-timing-function = 'linear';
    main.appendChild(this.element);
}



// 프로토타입 객체에 메소드 정의
Block.prototype.setWord = function (word) {
    this.element.innerText = word;
};

// 프로토타입 객체에 메소드 정의
Block.prototype.getName = function () {
    return this.element.innerText;
};
Block.prototype.remove =function(){
    this.element.remove();
}
Block.prototype.setZindex =function(num){
    this.element.style.zIndex =num;
}
function myEndFunction() { //블록에 걸리는 이벤트. 블록 각각에 걸린다.
    console.log('block reached bottom');
    this.remove();

    $('#HP')[0].children[bloodIdx].style.background = 'white';
    bloodIdx--
 
    if( $('#HP')[0].children[0].style.background === 'white'){
        timeNumber = 0;    
        var answer = window.confirm(stage+'에서 생명이 모두 소진되어 패배! 1라운드 부터 다시 하시겠습니까?');
        if (answer) {
            console.log('-----------------------restart 1 stage');
            // 1라운드로
            alert('to stage1');
            gameLoop = function(){}();
            console.log(gameLoop);
            stage = 1;
            document.getElementById("inputBox").focus();
            // HP를 리셋하는 부분
            HP.innerHTML = ''
            BloodBlock();
            beforeStart(stage);
        } else {           
            // Do nothing!      
        }
        $('.blocks').remove();
        power = false;
    }

  }
  function gameLoopWithCountReset(stage) {
    var cnt = 1;
    var gameLoop = setInterval(function () {
       word = wordList.splice(Math.floor(Math.random()*wordList.length),1);
       console.log('stage in countreset',stage);
        var fallSec = 5-stage;
        if(timeNumber === 0 && $('.blocks').length !== 0){
            $('.blocks').remove();
            time.innerText = 'Time 0:00';  
                    clearInterval(gameLoop);
                    var answer = window.confirm(stage+'스테이지 클리어! 다음 라운드로 넘어가시겠습니까?');
                    if (answer) {
                        // 다음라운드로
                        alert('go!');
                        console.log('--------startnewstage');
                        stage++;
                        beforeStart(stage);
                        document.getElementById("inputBox").focus();
                    } else {
                        // Do nothing!
                    }
            clearInterval(gameLoop);   
            gameLoop = function(){}();
        }else{
            if(typeof(countdown) === "undefined"){ //countdown 객체 없을때 
                console.log('아직 시간남음',timeNumber);
            
                if(timeNumber.length !== 1){
                    time.innerText = 'Time 0:'+timeNumber 
                }else{
                    time.innerText = 'Time 0:0'+timeNumber  
                }
              
                if(blood[0].style.background === "white") // HP가 모두 깎이면 (0번째 blood가 흰색이 되면 멈춤)
                {
                    clearInterval(gameLoop);    
                    gameLoop = function(){}();
                }
                timeNumber--;
        eval('var block'+cnt +'= new Block(word,fallSec)');    
                console.log('block생성 남은시간:',timeNumber,'난이도:',stage);
        cnt++; 
            }  
        }  
    }, 1000);

}

function beforeStart(stage){
    // return new Promise(function(resolve,reject){
        timeNumber = 10; 
        var countdown = document.createElement('div');
        countdown.setAttribute("id", "countdown");
        countdown.innerText = 5;
        console.log('countdown number5로 바꿨는데? :',countdown.innerText);
        main.appendChild(countdown);
        var minusCount = setInterval(
            function(){
          if(countdown.innerText != 0){
            console.log('countdown number :',countdown.innerText);
            countdown.innerText -= 1; 
          }else{  
              console.log('countdown number가 0이라고? :',countdown.innerText);
              clearInterval(minusCount);
              countdown.remove();
              timeNumber = 10;    
              if(typeof(gameLoop) !== 'undefined'){
                  console.log('gameloop정지');
                  clearInterval(gameLoop);
              }
              console.log('gameLoopWithCountRest',stage);
              gameLoopWithCountReset(stage);              
          }          
        }, 1000)  
    // })
}

window.addEventListener('load', function(){
    fetch('wordnote.txt')
  .then(response => response.text())
  .then(text=>text = text.replace(/[0-9,\r]/g, ''))
  .then(text => wordList = text.split('\n'))
  .then(function(){
});})

window.addEventListener('load', function(){
    beforeStart(stage);
    document.getElementById("inputBox").focus();
});
