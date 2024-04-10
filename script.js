const display = document.querySelector(".total-display");
const warningContainer = document.querySelector(".warning-container");
const warning = document.querySelector(".warning");
const clickButton = document.querySelector(".click");

const tier1 = document.querySelector(".tier1");
const tier2 = document.querySelector('.tier2');
const tier3 = document.querySelector('.tier3');
const tier4 = document.querySelector('.tier4');
const tier5 = document.querySelector('.tier5');

let total = 0;
let clickMultiplier = 1;
let automaticClick = 0;
let diamond = 0;
let speed = 1;
let rebirthed = 1;
let costMultiplier = 1;
let shopMultiplier = 1;
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

function getDiamond(range, diamondAmount, runningTime) {
    for (let i = 0; i < runningTime; i++) {
      const randomInt = Math.floor(Math.random() * range);
      if (randomInt === 0) {
        diamond += diamondAmount;
      }
    }
}

tier1.addEventListener("click", () => {
  if (total < (10 * costMultiplier * shopMultiplier)) {
    pushWarning(`not enough, come back when you have ${10 * costMultiplier} clicks`)
    return;
  }
  total -= 10 * costMultiplier * shopMultiplier
  clickMultiplier += shopMultiplier;
  getDiamond(100, 1, shopMultiplier)
  displayValue()
});

tier2.addEventListener('click', ()=> {
    if (total < (100 * costMultiplier * shopMultiplier)) {
        pushWarning(`not enough, come back when you have ${100 * costMultiplier} clicks`)
        return;
    }
    total -= 100 * costMultiplier * shopMultiplier
    automaticClick += shopMultiplier;
    getDiamond(3, 1, shopMultiplier)
    displayValue()
})

tier3.addEventListener('click', () => {
    if (diamond < (1 * shopMultiplier)) {
        pushWarning('not enough, come back when you have 1 diamonds')
        return;
    }
    diamond -= 1 * shopMultiplier
    clickMultiplier *= 2 * shopMultiplier;
    displayValue()
})

tier4.addEventListener('click', () => {
    if (diamond < (10 * shopMultiplier)) {
        pushWarning('not enough, come back when you have 10 diamonds')
        return;
    }
    diamond -= 10 * shopMultiplier
    automaticClick *= 2 * shopMultiplier;
    displayValue()
})

tier5.addEventListener('click', () => {
    if (total < (10000 * costMultiplier)) {
        pushWarning(`not enough, come back when you have ${1000 * costMultiplier} clicks`)
        return;
    }
    total = 0;
    clickMultiplier = 1;
    automaticClick = 0;
    speed *= 2
    rebirthed += 1
    costMultiplier *= 2
    updateIntervalSpeed()
    updateButtonsText()
    displayValue()
})

function updateButtonsText() {
    let multiplyString;
    if (shopMultiplier == 1) {
        multiplyString = 'double'
    }
    else {
        multiplyString = `${shopMultiplier * 2}x`
    }
    tier1.textContent = `+${shopMultiplier} click power / cost ${10 * costMultiplier * shopMultiplier} clicks`
    tier2.textContent = `+${shopMultiplier} click per second / cost ${100 * costMultiplier * shopMultiplier} clicks`
    tier3.textContent = `${multiplyString} click power / cost ${shopMultiplier} diamonds`
    tier4.textContent = `${multiplyString} click per second / cost ${10 * shopMultiplier} diamonds`
    tier5.textContent = `speed up the game x2! / rebirth ~ cost ${10000 * costMultiplier}+ clicks`
}

function pushWarning(string) {
    const warning = document.createElement('p')
    warning.innerText = string;
    warning.classList.add('warning')
    warningContainer.appendChild(warning)

    setTimeout(() => {
        warning.remove();
    }, 2000)
}

function handleSelection() {
    let selectedValue = document.querySelector(".dropdownSelector").value;
    if (selectedValue === "enterNumber") {
      var num = prompt("Enter a number:");
      if (num !== null && !isNaN(num)) {
        updateShop(Number(num));
      }
    } else {
      updateShop(Number(selectedValue));
    }
  }
  
function updateShop(value) {
    shopMultiplier = value;
    updateButtonsText();
  }
  
  document.querySelector(".dropdownSelector").addEventListener("change", handleSelection);
  

updateIntervalSpeed()