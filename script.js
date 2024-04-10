const display = document.querySelector(".total-display");
const warning = document.querySelector(".warning");
const clickButton = document.querySelector(".click");

let total = 0;
let clickMultiplier = 1;
let automaticClick = 0

clickButton.addEventListener("click", () => {
  total += 1 * clickMultiplier;
    displayValue()
});

function displayValue (){
    display.textContent = `${total} clicks || ${clickMultiplier} click power || ${automaticClick} c/s`;
}

setInterval(() => {
    total += automaticClick;
    displayValue()
}, 1000)

const tier1 = document.querySelector(".tier1");

tier1.addEventListener("click", () => {
  if (total < 10) {
    warning.textContent = 'not enough, come back when you have 10 clicks';
    return;
  }
  total -= 10
  clickMultiplier += 1;
  displayValue()
});

const tier2 = document.querySelector('.tier2');

tier2.addEventListener('click', ()=> {
    if (total < 100) {
        warning.textContent = 'not enough, come back when you have 100 clicks';
        return;
    }
    total -= 100
    automaticClick += 1;
    displayValue()
})



