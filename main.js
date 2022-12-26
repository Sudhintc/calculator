let previousNum ="";
let currentNum = "";
let operator = "";

const currentNumberDisplay = document.querySelector('.currentNumber');
const previousNumberDisplay = document.querySelector('.previousNumber');

const equal =document.querySelector('.equal');
equal.addEventListener('click',()=>{
    if(currentNum!="" && previousNum!= ""){
        calculate();
    }
});

const decimal = document.querySelector('.decimal');
decimal.addEventListener('click',()=>{
    addDec();
});

const clear = document.querySelector('.clear');
clear.addEventListener('click',()=>{
    currentNumberDisplay.textContent="0";
    previousNumberDisplay.textContent=""
    previousNum="";
    currentNum="";
    operator="";
})

const operators =document.querySelectorAll('.operator');

const numbers = document.querySelectorAll('.number');

numbers.forEach(btn => {
    btn.addEventListener('click',(e)=>{
        handleNumbers(e.target.textContent);
    });
});
function handleNumbers(number){
    if(previousNum !== "" && currentNum!=="" && operator!==""){
        previousNum="";
        currentNumberDisplay.textContent = currentNum;
    }
    if(currentNum.length<=11){
        currentNum+=number;
        currentNumberDisplay.textContent=currentNum;
    }
}

operators.forEach(btn=>{
    btn.addEventListener('click',(e)=>{
        handleOperators(e.target.textContent);
    });
});
function handleOperators(op){
    if(previousNum===""){
        previousNum = currentNum;
        operatorCheck(op);
    }
    else if (currentNum ===""){
        operatorCheck(op);
    }
    else {
        calculate();
        operator= op;
        currentNumberDisplay.textContent="0";
        previousNumberDisplay.textContent=previousNum + " " + operator;

    }
}

function operatorCheck(text){
    operator = text ;
    previousNumberDisplay.textContent = previousNum + " " + operator;
    currentNumberDisplay.textContent = "0";
    currentNum = "";
}

function calculate(){
    previousNum = Number(previousNum);
    currentNum = Number(currentNum);
    if(operator==='+'){
        previousNum = previousNum + currentNum;
    }
    if(operator==='-'){
        previousNum = previousNum - currentNum;
    }
    if(operator==='*'){
        previousNum = previousNum * currentNum;
    }
    if(operator==='/'){
        previousNum = previousNum / currentNum;
    }
    previousNum = roundNum(previousNum);
    previousNum =previousNum.toString();
    displayResult();
}
function displayResult(){
    if(previousNum.length<=11){
        currentNumberDisplay.textContent = previousNum;
    }
    else {
        currentNumberDisplay.textContent = previousNum.slice(0,11)+'...';
    }
    previousNumberDisplay.textContent = "";
    operator="";
    currentNum="";
}
function roundNum(num){
    return Math.round(num*100000)/100000;
}

function addDec(){
    if(!currentNum.includes('.')){
        currentNum+='.';
        currentNumberDisplay.textContent=currentNum;
    }
}