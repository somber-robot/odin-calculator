const add = (a,b) => Math.round((a+b) * 1000) / 1000;
const subtract = (a,b) => Math.round((a-b) * 1000) / 1000;
const multiply = (a,b) => Math.round((a*b) * 1000) / 1000;
const divide = (a,b) => {
    if (b === 0) {
        alert("ERROR: Cannot divide by 0");
        return 0;   
    }
    return Math.round((a/b) * 1000) / 1000;
};

let result;
let stack = [];
function operate(){
    switch(stack[1]){
        case "+": result = add(stack[0],stack[2]); break;
        case "-": result = subtract(stack[0],stack[2]); break;
        case "/": result = divide(stack[0],stack[2]); break;
        case "*": result = multiply(stack[0],stack[2]); break;
    }

    display = "" + result;
    setDisplay()
    stack = [];
    stack.push(result);
    newNum = true;
}

const screen = document.querySelector("#display-content");
let display = "";
const setDisplay = () => screen.innerHTML = display;

const digitBtns = document.querySelectorAll(".digit");
const MAX = 12;
let newNum = true;

function addDigit(digit){
    if (display.length >= MAX) return;
    if (digit === "0" && display === "0") return;
    
    if (display === "0" || newNum) {
        display = digit;
        newNum = false;
    }
    else display += digit;
    
    setDisplay();
}

digitBtns.forEach(button =>{
    button.addEventListener("click", function(){
        addDigit(button.innerText);
    });
});

const delBtn = document.querySelector(".delete");

function del(){
    if (display.length == 0) return;
    display = display.substring(0, display.length-1);
    setDisplay();
    newNum = false;
}

delBtn.addEventListener("click", del);

const clearBtn = document.querySelector(".clear");

function clear(){
    display = "";
    setDisplay();
    stack = [];
}

clearBtn.addEventListener("click", clear);

const signBts = document.querySelectorAll(".sign");

function addSign(sign){
    switch(stack.length){
        case 0:
            if (display === "") return;
            stack.push(+display);
            stack.push(sign);
            display = "";
            setDisplay();
            break;
        case 1:
            if (display === "") stack = [];
            else {
                newNum = true;
                stack.pop();
                stack.push(+display);
                stack.push(sign)
            }
            break;
        case 2:
            if (display === "" || newNum){
                stack.pop();
                stack.push(sign);
            }else{
                stack.push(+display);
                operate();
                stack.push(sign);
            }
            break;
    }
}

signBts.forEach(button => {
    button.addEventListener("click", function(){
        addSign(button.innerText);
    });
});

const equalBtn = document.querySelector(".equal");

function equals(){
    if (stack.length !== 2 || display === "" || newNum) return;
    stack.push(+display);
    operate();
}

equalBtn.addEventListener("click", equals);

const dotBtn = document.querySelector(".dot");

function dot(){
    if (display.includes(".")) return;
    if (display === "" || newNum) display = "0.";
    else display += ".";
    setDisplay();
    newNum = false;
}

dotBtn.addEventListener("click", dot);

document.body.addEventListener("keydown", function(event){
    if ("0123456789".includes(event.key)) addDigit(event.key);
    if (event.key === "Backspace") del();
    if (event.key === "c") clear();
    if ("+-*/".includes(event.key)) addSign(event.key);
    if (event.key === "=" || event.key === "Enter") equals();
    if (event.key === ".") dot();
});