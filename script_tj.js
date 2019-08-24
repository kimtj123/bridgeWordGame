const HP = document.getElementById('HP');
const time = document.getElementsByClassName('header-side')[1];
const blood = document.getElementsByClassName('blood');
const blocks = document.getElementsByClassName('blocks');
const score = document.getElementsByClassName('header-side')[0];

let timeNumber = 59; // 시간
let point = 0; // 점수

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

function Timer() 
{
    time.innerText = 'Time 0:'+timeNumber

    if(timeNumber !== 0)
    {
        if(timeNumber > 10 && timeNumber<=1)
        {
            time.innerText = 'Time 0:0'+timeNumber
        }
        else if(blood[0].style.background === "white") // HP가 모두 깎이면 (0번째 blood가 흰색이 되면 멈춤)
        {
            clearInterval(startTimer);    
        }
        timeNumber--;
    }    
    else
    {
        time.innerText = 'Time 0:0'+timeNumber
        clearInterval(startTimer);
    }
}

function searchWord() // input 값과 단어 값이 일치하면 삭제
{
    var inputValue = document.getElementById('inputBox').value

    for(let i = 0; i < blocks.length; i++)
    {
        point = point + 10;
        if(inputValue === blocks[i].innerText)
        {            
            $('div').remove('.blocks')[i];            
            score.innerText = "Score : " + point;
        }        
    }
    document.getElementById('inputBox').value =''

}
//특정 위치값에 도달하면 게이지를 하얗게 만들려고 했으나 진행중
function removeBlood()
{
    if($('div.blocks:eq(0)').offset().top > 700)
    {
        console.log($('div.blocks:eq(0)').offset().top)
        blood[0].background = "white";
    }
}
var startTimer = setInterval(Timer,1000)
BloodBlock();
/*
while(blood[0].style.background !== "white")
{
    removeBlood();
}*/