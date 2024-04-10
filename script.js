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

function displayValue (){
    display.textContent = `${total} clicks || ${clickMultiplier} click power || ${automaticClick} c/s`;
}