
// shufflar en array med nummer mellan 0-3 = 4nummer
const shuffleArray = (num) =>{
    let i = 0;
    let randArray = [];
    for (i=0;i<num; i++ ){
        randArray[i] = Math.floor(Math.random() * Math.floor(4));
    }
    return randArray;
}

// GLOBALA VARIABLER
let userArray = [];
let btn;
let gameArray = [];
let inputAllowed = false;
let firstGame = true;
let restart = true;

// rätt knapp skall lysa
const lightBtn = (num) =>{

    let light = document.querySelector('.btn[value="'+ num +'"');

    // TAR BORT KLASSEN SAFTEY
    light.classList.remove('light');

    setTimeout(function() {
    light.className += ' light';
    },200);
    setTimeout(function() {
        light.classList.remove('light');
    },1500);
    
};

//uppspelnings sekvensen, anropar suffleArray() och startar userClick();
const sequence = (array) =>{

    inputAllowed = false;
    restart = false;
    let i = 0;
    let time = 1500;

    hideMessage(".message");

    console.log(array);

    while(i<array.length){
        
        let temp = array[i];
       
        setTimeout(function() {
            lightBtn(temp);
        },time);
        
        i++;
        time += 1500;
    }

    setTimeout(function(){
        inputAllowed = true;
        showMessage(".message", "Din tur");
    },time);
    setTimeout(function(){
        hideMessage(".message");
    },time+2000);
    
}

// andvändarens klickningar
const userClick = (e) =>{

    let userValue = userArray.toString();
    let arrayValue = gameArray.toString();    
    let btnValue = e.target.getAttribute("value");

    if(inputAllowed){

        userArray.push(parseInt(btnValue));

        lightBtn(btnValue);

        if(userArray.length == gameArray.length){

            userValue = userArray.toString();

            if(userValue == arrayValue){
                showMessage(".message", `Grattis du klarade nivå ${gameArray.length}`);
                console.log("Rätt array");
                setTimeout(function(){
                    gameArray.push(Math.floor(Math.random() * Math.floor(4)));
                    userArray = [];
                    sequence(gameArray);
                },2000);
            }else{
                showMessage(".message", "AJAJAJ det gick inte så bra, Tryck på spela för att börja om");
                console.log("fel svar");
            }
        }
    }else{
        console.log("vänta lite för fan!");
    }
    restart = true;
}

const hideMessage = (klass) =>{
    document.querySelector(`${klass}`).classList.add('hidden');
};
const showMessage = (klass,text) =>{
    document.querySelector(`${klass}`).classList.remove('hidden');
    document.querySelector(`${klass}`).innerHTML = text;
};

const init = function(){
    if(restart) {
        if (firstGame){
            btn = document.querySelectorAll('.btn');
            btn.forEach(btn => btn.addEventListener('click', userClick));
            firstGame = false;
        }
        userArray = [];
        gameArray = shuffleArray(4);
        sequence(gameArray); 
    };
};

window.onload = function() {
    document.querySelector('.start').addEventListener('click',init); 
};