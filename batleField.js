import { fieldArray, fieldArrayCoordinates, fieldArrayCoordClosest, fieldArrayCoordinatesHelper } from './ships.js';
let startTimer;

function createBatleField(range) { //first square creation
    let myFieldHere = document.querySelector('.square');
    let myField = document.createElement('div');
    let logo = document.createElement('img');

    myFieldHere.prepend(myField);
    myField.prepend(logo);
    myField.className = 'squareTop float-start';
    myField.setAttribute('id', 'showMe');
    logo.setAttribute('src', './img/anchor.svg');
    logo.className = 'img-fluid';
    
    fillFieldHead(range, myFieldHere);
    fillFieldBody(range, myFieldHere);
};

function fillFieldHead(range, myFieldHere) { //creation and filling out the first row
    let letters = ['A','B','C','D','E','F','K','L','M','N'];

    for(let i=0; i<range; i++) {
        let myField = document.createElement('div');

        myField.className = 'squareTop float-start border border-light bg-info';

        myFieldHere.append(myField);
        document.querySelector('.square div:last-child').innerHTML = letters[i];
    }
};

function fillFieldBody(range, myFieldHere) { //creation the body and fillig out the rest of field
    let numbers = [1,2,3,4,5,6,7,8,9,10];
    
    for(let i=0; i<range; i++){
        let myField = document.createElement('div');

        myField.className = 'squareTop float-start border border-light bg-info';
        myFieldHere.append(myField);
        document.querySelector('.square div:last-child').innerHTML = numbers[i];

        for(let j=0; j<range; j++) {
            let myField = document.createElement('div');

            myField.className = 'square1 float-start border rounded border-info';
            myField.setAttribute('id', 10*i+j); //adding id attribute
            myFieldHere.append(myField);
        }
    }
};

function showPlayerName(name) { //shows player's name on the top
    document.querySelector('#playerNameHere').innerHTML = name;
};

function showTime() { //game timer
    let time = document.querySelector('#timeHere');
    time.innerHTML = '00:00';
    let minutes = 0;
    let seconds = 0;

    startTimer = setInterval(function showTime() {
        if (seconds < 59) {
            seconds++;
            minutes = +minutes;
        } else {
            seconds = 0;
            minutes++;
        };
        
        seconds = seconds < 10 ? '0' + seconds : seconds;
        minutes = minutes < 10 ? '0' + minutes : minutes;
        
        time.innerHTML = minutes + ':' + seconds;
    }, 1000);
}

function showShots(arr) { // shows shots field
    let total = 30;
    let toGo = 30;
    let totalShots = 0;
    
    let shots = document.querySelector('#shotsHere');
    shots.innerHTML = '30/30';

    return function(e) { //game logic
        if (toGo > 0) {
            if (e.target.id && e.target.id !== 'showMe') {
                let x = Math.floor(+e.target.id/10);
                let y = +e.target.id%10;
                let ship = document.createElement('img');
                let miss = document.createElement('img');

                if (arr[x][y] === 1) {
                    toGo+=1;
                    e.target.prepend(ship);
                    ship.setAttribute('src', './img/ship.svg');
                    ship.className = 'img-fluid bg-warning border-3 border-warning rounded';

                    for (let i=0; i<fieldArrayCoordinatesHelper.length; i++) {
                        for (let j=0; j<fieldArrayCoordinatesHelper[i].length; j++) {
                            if (fieldArrayCoordinatesHelper[i][j][0] === x && fieldArrayCoordinatesHelper[i][j][1] === y) {
                                let element = document.querySelector('#' + CSS.escape(i) + '0' + CSS.escape(j));
                                element.classList.add('bg-warning');
                            }
                        }
                    }
                    for (let i=0; i<fieldArrayCoordinates.length; i++) {
                        for (let j=0; j<fieldArrayCoordinates[i].length; j++) {
                            
                            if (fieldArrayCoordinates[i][j][0] === x && fieldArrayCoordinates[i][j][1] === y) {
                                
                                fieldArrayCoordinates[i].splice(j,1);
                                if (fieldArrayCoordinates[i].length === 0) {
                                    
                                    for (let k=0; k<fieldArrayCoordClosest[i].length; k++) { //put miss cells around ship
                                        if(!document.querySelector('#' + CSS.escape(10*fieldArrayCoordClosest[i][k][0]
                                        + fieldArrayCoordClosest[i][k][1]) + ' img')) {
                                            let miss = document.createElement('img');
                                            let element = document.querySelector('#' + CSS.escape(10*fieldArrayCoordClosest[i][k][0]
                                                                                                    +fieldArrayCoordClosest[i][k][1]));
                                            element.prepend(miss);
                                            miss.setAttribute('src', './img/miss.svg');
                                            miss.className = 'img-fluid';
                                        }
                                    }

                                    for (let r=0; r<fieldArrayCoordinatesHelper[i].length; r++) { //color as red
                                        console.log(fieldArrayCoordinatesHelper[i]);
                                        let element = document.querySelector('#' + CSS.escape(10*fieldArrayCoordinatesHelper[i][r][0]
                                            +fieldArrayCoordinatesHelper[i][r][1]) + ' img');
                                        let elementPanel = document.querySelector('#' + CSS.escape(i) + '0' + CSS.escape(r));
                                        
                                        element.className = 'img-fluid bg-danger border border-3 border-dark rounded';
                                        elementPanel.classList.add('bg-danger');  
                                        elementPanel.classList.add('border-dark');                                       
                                    }
                                }
                            } 
                        }
                    }
                } else {
                    e.target.prepend(miss);
                    miss.setAttribute('src', './img/miss.svg');
                    miss.className = 'img-fluid';
                }

                toGo--;
                totalShots++;

                let arraysLen = fieldArrayCoordinates.reduce((sum, current) => sum + current.length, 0);

                if (arraysLen === 0) { //win logic
                    showResult(totalShots);
                    document.querySelector('#winOrLose').innerHTML = 'You Won!'
                }

                if (toGo === 0) { //gameover logic
                    showResult(totalShots); 
                    document.querySelector('#winOrLose').innerHTML = 'Game Over';
                }

                shots.innerHTML = toGo + '/' + total;
            }  
        }
    };
};

function showResult(shots) {
    clearInterval(startTimer);
    
    let tableResult = document.querySelector('#records');
    let finishTime = document.querySelector('#timeHere').innerHTML;
    let player = document.querySelector('#playerNameHere').innerHTML;

    let firstDiv = document.body.firstElementChild;
    let secondDiv = firstDiv.nextElementSibling;
    let thirdDiv = secondDiv.nextElementSibling;

    secondDiv.classList.add('d-none');
    thirdDiv.classList.remove('d-none');

    tableResult.innerHTML = (player + ', ' + shots + ', ' + finishTime);
};

let displayShots = showShots(fieldArray);

export { createBatleField, showPlayerName, showTime, displayShots, showResult };