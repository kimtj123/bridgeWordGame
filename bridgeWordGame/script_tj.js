const HP = document.getElementById('HP')

function BloodBlock()
{
    for(let i = 0; i < 9; i++)
    {        
        if(i !== 8)
        {
            HP.innerHTML += '<div class = "blood"></div>'
        }
        else
        {
            HP.innerHTML += '<div class = "blood" style = "border-right: none"></div>'
        }
    }
}

BloodBlock();