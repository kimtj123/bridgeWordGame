var main = document.getElementById('main');
var wordList = ['가나다', '다라', '마바', '사아', '자차', '카타', '파하'];

function Block(word) {
    this.element = document.createElement('div');
    this.element.className = 'blocks';
    this.element.innerText = word;
    this.element.id = word;
    this.element.style.left = Math.ceil(Math.random() * 85) + '%';
    this.element.style.display = 'block';
    this.element.style.width = word.length*30+'px' // 단어 길이에 맞춰 div 넓이 할당, undefined 시 오류 발생
    this.element.animate([
        // keyframes
        { transform: 'translateY(0px)' },
        { transform: 'translateY(650px)' } // main height 700 - block height 50;
    ], 3000,(function() {console.log('end');
      $('.blocks').remove(); 

       })()   
        );
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

window.addEventListener('load', function () {
    setInterval(function () {
        var word = wordList.shift();
        var block1 = new Block(word);

        console.log($('.blocks'));
    }, 5000);
})

