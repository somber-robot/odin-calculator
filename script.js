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

let num1, sign, num2;
let state = 0;
let new_num = true;

function operate(s, a, b){
    num1 = num2 = sign = null;
    switch(s){
        case '+': 
            result = add(a, b);
            break;
        case '-': 
            result = subtract(a, b);
            break;
        case '*': 
            result = multiply(a, b);
            break;
        case '/': 
            result = divide(a, b);
            break;
    }
    display = `${result}`;
    setDisplay();
    new_num = true;
    return result;
}


const digitBtns = document.querySelectorAll(".digit");
const signBtns = document.querySelectorAll(".sign");
const screen = document.querySelector("#display-content");

let display = "";
const MAX=12;
const setDisplay = () => screen.innerText = display;

digitBtns.forEach(button => {
    button.addEventListener("click", function(){
        if (display.length >= MAX && !new_num) return;
        if (!new_num) display += button.innerText;
        else {
            display = button.innerText;
            new_num = false;
        }
        setDisplay();
    });
});

let result = null;

signBtns.forEach(button => {
    button.addEventListener("click", function(){
        console.log(`num1: ${num1} num2: ${num2} sign: ${sign}`);
        if (display === "" && state === 0) return;

        if (display === "" || new_num){
            sign = button.innerText;
            console.log(`num1: ${num1} num2: ${num2} sign: ${sign}`);
            return;
        }

        switch(state){
            case 0:
                num1 = parseInt(display);
                display = "";
                setDisplay();
                sign = button.innerText;
                state = 1;
                break; 
            case 1:
                num2 = parseInt(display);
                result = operate(sign, num1, num2);
                num1 = result;
                sign = button.innerText;
                break;
        }
        console.log(`num1: ${num1} num2: ${num2} sign: ${sign}`);
    });
});