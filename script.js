const display = document.querySelector(".total-display");
const clickButton = document.querySelector(".click");

let intervalFunction;

const gameData = JSON.parse(localStorage.getItem('gameData')) || {
    total: 0,
    clickMult: 1,
    autoClicker: 0,
    diamond: 0,
    speed: 1,
    rebirths: 1,
    costMult: 1,
    shopMult: 1,
}

// Function to handle both button click and spacebar press
function addManualClick() {
    gameData.total += 1 * gameData.clickMult;
    displayValue();
  }

clickButton.addEventListener("click", addManualClick);

function displayValue (){
    display.querySelector('.total-click').textContent = gameData.total + ' clicks'
    display.querySelector('.total-click-power').textContent = gameData.clickMult + ' click power'
    display.querySelector('.total-click-per-sec').textContent = gameData.autoClicker + ' c/s'
    display.querySelector('.total-diamond').textContent = gameData.diamond + ' diamonds'
    display.querySelector('.total-rebirth').textContent = (gameData.rebirths - 1) + ' rebirths'
}

function updateTotalAndDisplay() {
    gameData.total += gameData.autoClicker;
    displayValue();
    getDiamond(10000, 1, 1);
    storeVariables();
}

function updateIntervalSpeed() {
    clearInterval(intervalFunction);
    intervalFunction = setInterval(updateTotalAndDisplay, (1000 / gameData.speed)); // Create new interval with updated speed
}

function getDiamond(range, diamondAmount, runningTime) {
    for (let i = 0; i < runningTime; i++) {
      const randomInt = Math.floor(Math.random() * range);
      if (randomInt === 0) {
        gameData.diamond += diamondAmount;
        storeVariables();
      }
    }
}

function storeVariables() {localStorage.setItem('gameData', JSON.stringify(gameData));}

const upgrade = {
    tierOne: () => tryPurchase({
        cost: 10 * gameData.costMult * gameData.shopMult,
        resource: { value: gameData.total, set value(v) { gameData.total = v }, get value() { return gameData.total } },
        onSuccess: () => {
            gameData.clickMult += gameData.shopMult;
            getDiamond(1000, 1, gameData.shopMult);
        }
    }),
    tierTwo: () => tryPurchase({
        cost: 100 * gameData.costMult * gameData.shopMult,
        resource: { value: gameData.total, set value(v) { gameData.total = v }, get value() { return gameData.total } },
        onSuccess: () => {
            gameData.autoClicker += gameData.shopMult;
            getDiamond(100, 1, gameData.shopMult);
        }
    }),
    tierThree: () => tryPurchase({
        cost: 1 * gameData.shopMult,
        resource: { value: gameData.diamond, set value(v) { gameData.diamond = v }, get value() { return gameData.diamond } },
        onSuccess: () => {
            gameData.clickMult *= 2 * gameData.shopMult;
            getDiamond(100, 1, gameData.shopMult);
        }
    }),
    tierFour: () => tryPurchase({
        cost: 10 * gameData.shopMult,
        resource: { value: gameData.diamond, set value(v) { gameData.diamond = v }, get value() { return gameData.diamond } },
        onSuccess: () => {
            gameData.autoClicker *= 2 * gameData.shopMult;
            getDiamond(100, 1, gameData.shopMult);
        }
    }),
    tierFive: () => tryPurchase({
        cost: 10000 * gameData.costMult,
        resource: { value: gameData.total, set value(v) { gameData.total = v }, get value() { return gameData.total } },
        onSuccess: rebirth
    })
}

function tryPurchase({cost, resource, onSuccess}) {
    if (resource.value < cost) {
        pushWarning(`Not enough, come back when you have ${cost}`);
        return false;
      }
    resource.value -= cost
    onSuccess()
    displayValue()
    storeVariables()
    return true
}

function rebirth() {
    gameData.total = 0
    gameData.clickMult = 1
    gameData.autoClicker = 0;
    gameData.speed *= 2
    gameData.rebirths += 1
    gameData.costMult *= 2
    gameData.diamond += gameData.rebirths - 1
    updateIntervalSpeed()
    updateButtonsText()
}

const upgradeButtons = document.querySelectorAll('.upgrade')
upgradeButtons.forEach(button => {
    const relation = {
     '1': upgrade.tierOne,
     '2': upgrade.tierTwo,
     '3': upgrade.tierThree,
     '4': upgrade.tierFour,
     '5': () => rebirthPopup.classList.add('active'),
    }
    button.addEventListener('click', () => {
        const tier = button.dataset.tier
        relation[tier]()
    })
})

document.addEventListener('keydown', (event) => {
    if (event.code === 'Space') addManualClick()
    if (event.code === 'Digit1') upgrade.tierOne()
    if (event.code === 'Digit2') upgrade.tierTwo()
    if (event.code === 'Digit3') upgrade.tierThree()
    if (event.code === 'Digit4') upgrade.tierFour()
    if (event.code === 'Digit5') rebirthPopup.classList.add('active')
    if (event.code === 'Digit6') {
        upgrade.tierFive()
        rebirthPopup.classList.remove('active')
    }
})

const rebirthPopup = document.querySelector('.rebirth-popup')
rebirthPopup.addEventListener('click', () => {
    upgrade.tierFive()
    rebirthPopup.classList.remove('active')
})

function updateButtonsText() {
    upgradeButtons.forEach(button => {
        const tier = button.dataset.tier
        const relation = {
            "1": 10 * gameData.costMult * gameData.shopMult,
            "2": 100 * gameData.costMult * gameData.shopMult,
            "3": gameData.shopMult,
            "4": 10 * gameData.shopMult,
            "5": 10000 * gameData.shopMult,
        }
        const productText = button.querySelector('span.product')
        const costText = button.querySelector('span.cost')
        costText.innerText = relation[tier].toString()
        if (tier === "5") return
        else if (tier === "3" || tier === "4") {
            if (gameData.shopMult == 1) productText.innerText = 'double'
            else productText.innerText = `${gameData.shopMult * 2}x`
        } 
        else productText.innerText = gameData.shopMult.toString()
    })
}

const warningContainer = document.querySelector(".warning-container");
function pushWarning(string) {
    const warning = document.createElement('p')
    warning.innerText = string;
    warning.classList.add('warning')
    warningContainer.appendChild(warning)
    setTimeout(() => {warning.remove();}, 2000)
}

function handleSelection() {
    let selectedValue = document.querySelector(".dropdownSelector").value;
    if (selectedValue === "enterNumber") {
        var num = prompt("Enter a number:")
        if (num !== null && !isNaN(num)) updateShop(Number(num))
    } else {
        updateShop(Number(selectedValue))
    }
    updateButtonsText()
}
  
function updateShop(value) {
    gameData.shopMult = value;
    updateButtonsText();
}
  
document.querySelector(".dropdownSelector").addEventListener("change", handleSelection);  

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

updateIntervalSpeed()
displayValue()
updateButtonsText()