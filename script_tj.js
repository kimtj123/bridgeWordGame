const HP = document.getElementById('HP');
const time = document.getElementsByClassName('header-side')[1];
const blood = document.getElementsByClassName('blood');
const blocks = document.getElementsByClassName('blocks');
const score = document.getElementsByClassName('header-side')[0];


var point = 0; // 점수
var timeNumber = 5; // 시간
 
function BloodBlock()
{
    for(let i = 0; i < 10; i++)
    {        
        if(i < 9)
        {
            HP.innerHTML += '<div class = "blood" style = "background: #FE2E2E"></div>'
        }
        else
        {
            HP.innerHTML += '<div class = "blood" style = "background: #FE2E2E; border-right : none"></div>'
        }
    }
}

// function Timer() 
// {
//     time.innerText = 'Time 0:'+timeNumber

//     if(timeNumber !== 0)
//     {
//         if(timeNumber > 10 && timeNumber<=1)
//         {
//             time.innerText = 'Time 0:0'+timeNumber
//         }
//         else if(blood[0].style.background === "white") // HP가 모두 깎이면 (0번째 blood가 흰색이 되면 멈춤)
//         {
//             clearInterval(startTimer);    
//         }
//         timeNumber--;
//     }  
//     else if(timeNumber === 0)
//     {
//         console.log('Check!')
//         time.innerText = 'Time 0:0'+timeNumber       
//         clearInterval(startTimer);
//         var answer = window.confirm(stage+'스테이지 클리어! 다음 라운드로 넘어가시겠습니까?');
//         if (answer) {
//             // 다음라운드로
//             alert('go!');
//         } else {
//             goToFinalScore();      
//         }
//     }  
// }


function searchWord() // input 값과 단어 값이 일치하면 삭제
{
    var inputValue = document.getElementById('inputBox').value

    for(let i = 0; i < blocks.length; i++)
    {     //point = point + 10;        
        if(document.getElementById(inputValue) !== null){
           main.style.border = 'solid 3px blue';
            setTimeout(() => {
                main.style.border = '';
            }, 500);
            eval("$('#"+inputValue+"')")[0].remove();
            point += 10;
            score.innerText = "Score : " + point;
            console.log("searchWord : "+point)
            document.getElementById('inputBox').value =''            
        }        
    }
    console.log(point);    
}

function finalScore()
{   console.log(point,'point');
    var scoreShow = document.getElementById('Score');
    var buttons = document.getElementsByClassName('multipleChoice');
    console.log("finalScore : "+point);
    scoreShow.innerText = "당신의 점수는 " + point + "점 입니다."
    buttons[0].onclick = goToWordGames
    buttons[1].onclick = function(){
        window.close()
    }    
}


function goToWordGames()
{    
    location.href = "wordGames.html"   
}
function goToFinalScore()
{   
    
    location.href = "finalScore.html"
    finalScore();
}

// hj 98번 라인으로 그대로 옮겼습니다. 카운트다운 사라지면 실행되도록 했습니다
BloodBlock();
