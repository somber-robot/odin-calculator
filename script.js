const add = (a,b) => a+b;
const subtract = (a,b) => a-b;
const multiply = (a,b) => a*b;
const divide = (a,b) => {
    if (b === 0) {
        alert("ERROR: Cannot divide by 0");
        return 0;   
    }
    return a/b;
};

function operate(sign, a, b){
    switch(sign){
        case "+": return add(a,b);
        case "-": return subtract(a,b);
        case "/": return divide(a,b);
        case "*": return multiply(a,b);
    }
}

let stack = [];

// SCREEN
const screen = document.querySelector("#display-content");
let display = "";
const setDisplay = () => screen.innerHTML = display;

// DIGITS
const digitBtns = document.querySelectorAll(".digit");
const MAX = 12;

digitBtns.forEach(button =>{
    button.addEventListener("click", function(){
        if (display.length >= MAX) return;
        display += button.innerHTML;
        setDisplay();
    });
});

// DELETE
const delBtn = document.querySelector(".delete");

delBtn.addEventListener("click", function(){
    if (display.length == 0) return;
    display = display.substring(0, display.length-1);
    setDisplay();
});