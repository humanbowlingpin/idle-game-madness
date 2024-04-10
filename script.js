const display = document.querySelector(".total-display");
const warning = document.querySelector(".warning");
const clickButton = document.querySelector(".click");

const tier1 = document.querySelector(".tier1");
const tier2 = document.querySelector('.tier2');
const tier3 = document.querySelector('.tier3');
const tier4 = document.querySelector('.tier4');

let total = 10000;
let clickMultiplier = 12;
let automaticClick = 40;
let diamond = 10;
let speed = 1;
let rebirthed = 1;
let costMultiplier = 1;
let intervalFunction;

clickButton.addEventListener("click", () => {
  total += 1 * clickMultiplier;
    displayValue()
});

function displayValue (){
    display.textContent = `${total} clicks || ${clickMultiplier} click power || ${automaticClick} c/s || ${diamond} diamonds || ${rebirthed - 1} rebirths`;
}

function updateTotalAndDisplay() {
    total += automaticClick;
    displayValue();
}

function updateIntervalSpeed() {
    clearInterval(intervalFunction);
    intervalFunction = setInterval(updateTotalAndDisplay, (1000 / speed)); // Create new interval with updated speed
}

function getDiamond(range, diamondAmount) {
    const randomInt = Math.floor(Math.random() * range)
    console.log(randomInt)
    if (randomInt == 0) {
        diamond += diamondAmount
    };
  }

tier1.addEventListener("click", () => {
  if (total < 10 * costMultiplier) {
    warning.textContent = `not enough, come back when you have ${10 * costMultiplier} clicks`;
    return;
  }
  total -= 10 * costMultiplier
  clickMultiplier += 1;
  getDiamond(100, 1)
  displayValue()
});

tier2.addEventListener('click', ()=> {
    if (total < 100 * costMultiplier) {
        warning.textContent = `not enough, come back when you have ${100 * costMultiplier} clicks`;
        return;
    }
    total -= 100 * costMultiplier
    automaticClick += 1;
    getDiamond(3, 1)
    displayValue()
})

tier3.addEventListener('click', () => {
    if (diamond < 10) {
        warning.textContent = 'not enough, come back when you have diamonds';
        return;
    }
    diamond -= 10
    automaticClick *= 2;
    displayValue()
})

tier4.addEventListener('click', () => {
    if (total < 10000 * costMultiplier) {
        warning.textContent = `not enough, come back when you have ${1000 * costMultiplier} clicks`;
        return;
    }
    total = 0;
    clickMultiplier = 1;
    automaticClick = 0;
    speed *= 2
    rebirthed += 1
    costMultiplier *= 2
    updateIntervalSpeed()
    displayValue()
})


