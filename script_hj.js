var main = document.getElementById('main');
var wordList = ['가나','다라','마바'];
var power = true;
var word = '';
var bloodIdx = 9
var uniqueArray = []; // arr no space
var finalArray = []; // arr no duplicate

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
function myEndFunction() {
    console.log('block reached bottom');
    this.remove();

    $('#HP')[0].children[bloodIdx].style.background = 'white';
    bloodIdx--
 
    if( $('#HP')[0].children[0].style.background === 'white'){
        var answer = window.confirm(stage+'에서 생명이 모두 소진되어 패배! 1라운드 부터 다시 하시겠습니까?');
        if (answer) {
            // 다음라운드로
            alert('to stage1');
            stage++;
            gameLoopWithCountReset(stage);
            // HP를 리셋하는 부분
            HP.innerHTML = ''
            BloodBlock();
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
       word = finalArray.splice(Math.floor(Math.random()*finalArray.length),1);
        var fallSec = 5-stage;
        if(power === false){
            clearInterval(gameLoop);
        }else{
            eval('var block'+cnt +'= new Block(word,fallSec)');    
            cnt++;   
        }  
    }, 1000);

}

function beforeStart(stage){
    // return new Promise(function(resolve,reject){
        var countdown = document.createElement('div');
        countdown.setAttribute("id", "countdown");
        countdown.innerText = 5;
        main.appendChild(countdown);
        var minusCount = setInterval(
            function(){
          if(countdown.innerText != 0){
            countdown.innerText -= 1; 
          }else{
              clearInterval(minusCount);
              countdown.remove();
              gameLoopWithCountReset(stage);
              var startTimer = setInterval(Timer,1000);              
          }          
        }, 1000)  
    // })
}




window.addEventListener('load', function(){
    fetch('wordnote.txt')
  .then(response => response.text())
  .then(text=>text = text.replace(/[0-9]/g, ''))
  .then(text => wordList = text.split('\n'))
  .then(function(){
     uniqueArray = wordList.map(function(value,index){
        return value.trim();
    })
})
  .then(function(){
     finalArray = uniqueArray.filter(function(value, index) {
    return uniqueArray.indexOf(value) === index;}) 
  })
});

window.addEventListener('load', function(){
    beforeStart(1);
    document.getElementById("inputBox").focus();
    // gameLoopWithCountReset(1);
});
// window.addEventListener('load', gameLoopWithCountReset(1));

