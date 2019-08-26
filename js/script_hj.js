var main = document.getElementById('main');
var wordList = [];
var word = '';
var bloodIdx = 9;
var stage = 1;
var cnt = 1;

function Block(word,fallSec) {
    this.element = document.createElement('div');
    let ele = this.element;
    ele.className = 'blocks';
    ele.innerText = word;
    ele.id = word;
    ele.style.left = 210+Math.floor((Math.random()*1300))+'px';
    ele.style.display = 'inline-block';
    ele.style.position = 'absolute';
    ele.style.WebkitAnimation = "linear mymove "+fallSec+'s'; // Code for Chrome, Safari and Opera
    ele.animation = "linear mymove "+fallSec+'s';     // Standard syntax
    ele.addEventListener("webkitAnimationEnd", myEndFunction); // 바닥에 닿으면 사라진다.
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
        $('.blocks').remove();
        timeNumber = 0;    
        var answer = window.confirm(stage+'라운드에서 생명이 모두 소진되어 패배!\n점수: '+point+', 처음부터 다시 하시겠습니까?');
        if (answer) {
            location.reload();
        } else {           
            location.href = '../startpage.html';
        }
     
    }

  }
  function gameLoopWithCountReset() {
    var gameLoop = setInterval(function () {
        //console.log('gameloop 돕니다,stage:',stage);
       word = wordList.splice(Math.floor(Math.random()*wordList.length),1);
       //console.log('stage in countreset',stage);
        var fallSec = 6-stage;
        if(timeNumber === 0 && $('.blocks').length !== 0&&$('#HP')[0].children[0].style.background !== 'white'){   //시간 다 되고,블록 있을 때 -> CLEAR/FAIL전부 되잖아?? ->통과했을때만
            console.log('시간다됨');
            $('.blocks').remove();
            time.innerText = 'Time 0:00';  
                    clearInterval(gameLoop);
                    if(stage == 4){
                            let finalAnswer = window.confirm(`최종 4스테이지까지 클리어! 점수: ${point} \n 축하 페이지로 이동하시겠습니까?`);
                        if(finalAnswer){ 
                            location.href = '../celebration.html'; 
                        }else{
                            location.href = '../startpage.html';
                        }
                        
                    }else{
                        var answer = window.confirm(stage+'스테이지 클리어! 점수:'+point+'\n 다음 라운드로 넘어가시겠습니까?');
                        if (answer) {
                            // 다음라운드로
                            console.log('--------startnewstage');
                            stage++;
                            beforeStart(stage);
                            document.getElementById("inputBox").focus();
                        } else {
                            location.href = '../startpage.html';
                        }  
                    }
                   
            clearInterval(gameLoop);   
        }else{
            if(typeof(countdown) === "undefined"){ //countdown 객체 없을때 
                //console.log('아직 시간남음',timeNumber);
            
                if(timeNumber.length !== 1){
                    time.innerText = 'Time 0:'+timeNumber 
                }else{
                    time.innerText = 'Time 0:0'+timeNumber  
                }
              
                if(blood[0].style.background === "white") // HP가 모두 깎이면 (0번째 blood가 흰색이 되면 멈춤)
                {
                    clearInterval(gameLoop);    
                
                }
                timeNumber--;
        eval('var block'+cnt +'= new Block(word,fallSec)');    
               // console.log('block생성 남은시간:',timeNumber,'난이도:',stage);
        cnt++; 
            }  
        }  
    }, 1000);

}

function beforeStart(stage){
        $('#header-stage')[0].innerText = 'Stage : '+stage;
        timeNumber = 20; 
        var countdown = document.createElement('div');
        countdown.setAttribute("id", "countdown");
        countdown.innerText = 5;
       // console.log('countdown number5로 바꿨는데? :',countdown.innerText);
        main.appendChild(countdown);
        var minusCount = setInterval(
            function(){
          if(countdown.innerText != 0){
            countdown.innerText -= 1; 
          }else{  
              clearInterval(minusCount);
              countdown.remove();
              timeNumber = 20;    
              console.log('gameLoopWithCountRest',stage);
              gameLoopWithCountReset();              
          }          
        }, 1000)  
}

window.addEventListener('load', function(){
    fetch('../etc/wordnote.txt')
  .then(response => response.text())
  .then(text=>text = text.replace(/[0-9,\r]/g, ''))
  .then(text => wordList = text.split('\n'))
  .then(function(){
});})

window.addEventListener('load', function(){
    beforeStart(stage);
    document.getElementById("inputBox").focus();
});
