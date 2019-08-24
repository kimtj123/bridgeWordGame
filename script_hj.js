var main = document.getElementById('main');
var wordList = ['가나다', '다라', '마바', '사아', '자차', '카타', '파하'];
var power = true;
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
    ele.addEventListener("webkitAnimationEnd", myEndFunction);
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
    $('#HP')[0].children[0].remove();

    if( $('#HP')[0].children.length === 0){
        alert('생명이 모두 소진되어 게임종료');
        $('.blocks').remove();
        power = false;
    }

  }



window.addEventListener('load', function () {
    var cnt = 1;
    var gameLoop = setInterval(function () {
        var word = wordList.shift();
        var fallSec = 5;
        if(power === false){
            clearInterval(gameLoop);
        }  
        eval('var block'+cnt +'= new Block(word,fallSec)');    
        cnt++;

    }, 1000);

})

