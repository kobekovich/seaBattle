import { createBatleField, showPlayerName, showTime, displayShots } from './batleField.js';
import { placeShip, fieldArray } from './ships.js';

function enableStart() {
    let inputElement = document.querySelector('#inlineFormInputGroupUsername');
    let startButton = document.querySelector('#startGameButton');

    //enable start button just after there is smth in input field
    if (inputElement.value.trim()) {
        startButton.classList.remove('disabled');
    } else { //or disable if nothing's there
        startButton.className = 'btn btn-primary btn-lg disabled';
    }
};

function getStarted() {
    let inputElement = document.querySelector('#inlineFormInputGroupUsername');
    let firstDiv = document.body.firstElementChild;
    let secondDiv = firstDiv.nextElementSibling;
    let playerName = inputElement.value;

    inputElement.removeEventListener('keyup', enableStart); //stop listening input of username
    firstDiv.classList.add('d-none'); //disable input form
    secondDiv.classList.remove('d-none'); //enable batleField

    showPlayerName(playerName);
    showTime();
    createBatleField(10);
    placeShip();
};

document.querySelector('#inlineFormInputGroupUsername').addEventListener('keyup', enableStart);
document.querySelector('#startGameButton').addEventListener('click', getStarted, { once : true }); //one time event
document.querySelector('.square').addEventListener('click', displayShots);
