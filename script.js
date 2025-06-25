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

let stack = [];

// SCREEN
const screen = document.querySelector("#display-content");
let display = "";
const setDisplay = () => screen.innerHTML = display;

// DIGITS
const digitBtns = document.querySelectorAll(".digit");
const MAX = 12;
let newNum = true;

digitBtns.forEach(button =>{
    button.addEventListener("click", function(){
        if (display.length >= MAX) return;
        if (button.innerHTML === "0" && display === "0") return;
        
        if (display === "0" || newNum) {
            display = button.innerHTML;
            newNum = false;
        }
        else display += button.innerHTML;
        
        setDisplay();
    });
});

// DELETE
const delBtn = document.querySelector(".delete");

delBtn.addEventListener("click", function(){
    if (display.length == 0) return;
    display = display.substring(0, display.length-1);
    setDisplay();
    newNum = false;
});


// CLEAR
const clearBtn = document.querySelector(".clear");

clearBtn.addEventListener("click", function(){
    display = "";
    setDisplay();
    stack = [];
    console.log("stack: " + stack);
});

// SIGNS
const signBts = document.querySelectorAll(".sign");

signBts.forEach(button => {
    button.addEventListener("click", function(){
        switch(stack.length){
            case 0:
                if (display === "") return;
                stack.push(+display);
                stack.push(button.innerText);
                display = "";
                setDisplay();
                break;
            case 1:
                if (display === "") stack = [];
                else {
                    newNum = true;
                    stack.pop();
                    stack.push(+display);
                    stack.push(button.innerText)
                };
                break;
            case 2:
                if (display === "" || newNum){
                    stack.pop();
                    stack.push(button.innerText);
                }else{
                    stack.push(+display);
                    operate();
                    stack.push(button.innerText);
                }
                break;
        }
        console.log("stack: " + stack);
    });
});

// EQUALS TO
const equalBtn = document.querySelector(".equal");

equalBtn.addEventListener("click", function(){
    switch(stack.length){
        case 2:
            if (display === "" || newNum) return;
            stack.push(+display);
            operate();
            break;
    }
    console.log("stack: " + stack);
});

// DOT
const dotBtn = document.querySelector(".dot");

dotBtn.addEventListener("click", function (){
    if (display.includes(".")) return;
    if (display === "" || newNum) display = "0.";
    else display += ".";
    setDisplay();
    newNum = false;
});