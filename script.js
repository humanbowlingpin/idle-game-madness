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

// Function to handle both button click and spacebar press
function addManualClick() {
    total += 1 * clickMultiplier;
    displayValue();
  }

clickButton.addEventListener("click", addManualClick);
document.addEventListener("keydown", (event) => {
    if (event.code === 'Space') {
      addManualClick();
    }
});  

function displayValue (){
    const totalClickDisplay = display.querySelector('.total-click')
    const totalClickPowerDisplay = display.querySelector('.total-click-power')
    const totalClickPerSecDisplay = display.querySelector('.total-click-per-sec')
    const totalDiamondDisplay = display.querySelector('.total-diamond')
    const totalRebirthDisplay = display.querySelector('.total-rebirth')
    totalClickDisplay.textContent = total + ' clicks'
    totalClickPowerDisplay.textContent = clickMultiplier + ' click power'
    totalClickPerSecDisplay.textContent = automaticClick + ' c/s'
    totalDiamondDisplay.textContent = diamond + ' diamonds'
    totalRebirthDisplay.textContent = (rebirthed - 1) + ' rebirths'
}

function updateTotalAndDisplay() {
    total += automaticClick;
    displayValue();
    getDiamond(10000, 1, 1)
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

function upgradeTierOne() {
    if (total < (10 * costMultiplier * shopMultiplier)) {
        pushWarning(`not enough, come back when you have ${10 * costMultiplier} clicks`)
        return;
    }
    total -= 10 * costMultiplier * shopMultiplier
    clickMultiplier += shopMultiplier;
    getDiamond(1000, 1, shopMultiplier)
    displayValue()
}

tier1.addEventListener("click", upgradeTierOne);
document.addEventListener("keydown", (event) => {
    if (event.code === 'Digit1') {
        upgradeTierOne();
    }
});  

function upgradeTierTwo() {
    if (total < (100 * costMultiplier * shopMultiplier)) {
        pushWarning(`not enough, come back when you have ${100 * costMultiplier} clicks`)
        return;
    }
    total -= 100 * costMultiplier * shopMultiplier
    automaticClick += shopMultiplier;
    getDiamond(100, 1, shopMultiplier)
    displayValue()
}

tier2.addEventListener("click", upgradeTierTwo);
document.addEventListener("keydown", (event) => {
    if (event.code === 'Digit2') {
        upgradeTierTwo();
    }
});  

function upgradeTierThree() {
    if (diamond < (1 * shopMultiplier)) {
        pushWarning('not enough, come back when you have 1 diamonds')
        return;
    }
    diamond -= 1 * shopMultiplier
    clickMultiplier *= 2 * shopMultiplier;
    displayValue()
}

tier3.addEventListener('click', upgradeTierThree);
document.addEventListener("keydown", (event) => {
    if (event.code === 'Digit3') {
        upgradeTierThree();
    }
});  

function upgradeTierFour() {
    if (diamond < (10 * shopMultiplier)) {
        pushWarning('not enough, come back when you have 10 diamonds')
        return;
    }
    diamond -= 10 * shopMultiplier
    automaticClick *= 2 * shopMultiplier;
    displayValue()
}

tier4.addEventListener('click', upgradeTierFour)
document.addEventListener("keydown", (event) => {
    if (event.code === 'Digit4') {
        upgradeTierFour();
    }
});  

function upgradeTierFive() {
    if (total < (10000 * costMultiplier)) {
        pushWarning(`not enough, come back when you have ${10000 * costMultiplier} clicks`)
        return;
    }
    total = 0;
    clickMultiplier = 1;
    automaticClick = 0;
    speed *= 2
    rebirthed += 1
    costMultiplier *= 2
    diamond += rebirthed - 1
    updateIntervalSpeed()
    updateButtonsText()
    displayValue()
}

tier5.addEventListener('click', () => {
    rebirthPopup.classList.add('active')
})
document.addEventListener("keydown", (event) => {
    if (event.code === 'Digit5') {
        rebirthPopup.classList.add('active')
    }
});  

const rebirthPopup = document.querySelector('.rebirth-popup')
document.querySelector('.rebirth-button').addEventListener('click', () => {
    upgradeTierFive()
})
document.addEventListener("keydown", (event) => {
    if (event.code === 'Digit6') {
        upgradeTierFive()
    }
});  


function updateButtonsText() {
    const product1 = tier1.querySelector('.product')
    const product2 = tier2.querySelector('.product')
    const product3 = tier3.querySelector('.product')
    const product4 = tier4.querySelector('.product')
    const product5 = tier5.querySelector('.product')
    const cost1 = tier1.querySelector('.cost')
    const cost2 = tier2.querySelector('.cost')
    const cost3 = tier3.querySelector('.cost')
    const cost4 = tier4.querySelector('.cost')
    const cost5 = tier5.querySelector('.cost')
    let multiplyString;
    if (shopMultiplier == 1) {
        multiplyString = 'double'
    }
    else {
        multiplyString = `${shopMultiplier * 2}x`
    }
    product1.textContent = `+${shopMultiplier} click power`
    cost1.textContent = `cost ${10 * costMultiplier * shopMultiplier} clicks`

    product2.textContent = `+${shopMultiplier} click per second`
    cost2.textContent = `cost ${100 * costMultiplier * shopMultiplier} clicks`

    product3.textContent = `${multiplyString} click power`
    cost3.textContent = `cost ${shopMultiplier} diamonds`

    product4.textContent = `${multiplyString} click per second`
    cost4.textContent = `cost ${10 * shopMultiplier} diamonds`

    product5.textContent = `speed up the game x2!`
    cost5.textContent = `cost ${10000 * costMultiplier}+ clicks`
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


const infoPopup = document.querySelector('.info-popup')

document.querySelector('.faq-button').addEventListener('click', () => {
    console.log('ayo i dot click')
    infoPopup.classList.add('active')
})
document.querySelectorAll('.hide-button').forEach(button => {
    button.addEventListener('click', () => {
        infoPopup.classList.remove('active')
        rebirthPopup.classList.remove('active')
    })
})