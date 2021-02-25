let fieldArray = [];
let fieldArrayCoordinates = [];
let fieldArrayCoordClosest = [];
let fieldArrayCoordinatesHelper = [];

function placeShip() {
    const shipArray = [[1,1,1,1],[1,1,1],[1,1,1],[1,1],[1,1],[1,1],[1],[1],[1],[1]];
    const directionArray = [up,left];
    let randomNumberFirstCell;
    let randomNumberDirection;
    let x;
    let y;
    
    createArrayField();
    getRandom();

    function createArrayField() {
        for (let i=0; i<10; i++) {
            fieldArray.push([]);
    
            for(let j=0; j<10; j++) {
                fieldArray[i].push(0);
            }
        }
    };
    
    function up() {       
        if (randomNumberFirstCell/10 >= shipArray[0].length-1) { //up

            let sum = 0;
            for (let k=0; k<shipArray[0].length; k++) { //check allowed cells
                if ((fieldArray[x-k][y] === 1) || (fieldArray[x-k][y] === 2)) {
                    sum++;
                }
            }
            if (sum === 0) {

                fieldArrayCoordinates.push([]);
                fieldArrayCoordClosest.push([]);
                fieldArrayCoordinatesHelper.push([]);

                for (let i=0; i<shipArray[0].length; i++) {
                    fieldArray[x-i][y] = 1;
                    fieldArrayCoordinates[fieldArrayCoordinates.length-1].push([x-i,y]);
                    fieldArrayCoordinatesHelper[fieldArrayCoordinatesHelper.length-1].push([x-i,y]);

                    if (i === 0 && randomNumberFirstCell/10 < 9) {
                        if (randomNumberFirstCell%10 > 0) {
                            fieldArray[x+1][y-1] = 2;
                            fieldArrayCoordClosest[fieldArrayCoordClosest.length-1].push([x+1,y-1]);
                        }

                        fieldArray[x+1][y] = 2;
                        fieldArrayCoordClosest[fieldArrayCoordClosest.length-1].push([x+1,y]);

                        if (randomNumberFirstCell%10 < 9) {
                            fieldArray[x+1][y+1] = 2;
                            fieldArrayCoordClosest[fieldArrayCoordClosest.length-1].push([x+1,y+1]);
                        }
                    }
                    if (0 < i <= shipArray[0].length-1) {
                        if (randomNumberFirstCell%10 > 0) {
                            fieldArray[x-i][y-1] = 2;
                            fieldArrayCoordClosest[fieldArrayCoordClosest.length-1].push([x-i,y-1]);
                        }
                        if (randomNumberFirstCell%10 < 9) {
                            fieldArray[x-i][y+1] = 2;
                            fieldArrayCoordClosest[fieldArrayCoordClosest.length-1].push([x-i,y+1]);
                        }
                    }
                    if ((i === shipArray[0].length-1) && (randomNumberFirstCell - 10*i-10) >= 0) {
                        if (randomNumberFirstCell%10 > 0) {
                            fieldArray[x-i-1][y-1] = 2;
                            fieldArrayCoordClosest[fieldArrayCoordClosest.length-1].push([x-i-1,y-1]);
                        }

                        fieldArray[x-i-1][y] = 2;
                        fieldArrayCoordClosest[fieldArrayCoordClosest.length-1].push([x-i-1,y]);

                        if (randomNumberFirstCell%10 < 9) {
                            fieldArray[x-i-1][y+1] = 2;
                            fieldArrayCoordClosest[fieldArrayCoordClosest.length-1].push([x-i-1,y+1]);
                        }                   
                    }
                } 
            } else {
                getRandom();
            }
            shipArray.shift();
            getRandom();
        } else {
            getRandom();
        }
    };
    function left() {       
        if (randomNumberFirstCell%10 >= shipArray[0].length-1) { //left

            let sum = 0;
            for (let k=0; k<shipArray[0].length; k++) { //check allowed cells
                if ((fieldArray[x][y-k] === 1) || (fieldArray[x][y-k] === 2)) {
                    sum++;
                }
            }
            if (sum === 0) {

                fieldArrayCoordinates.push([]);
                fieldArrayCoordClosest.push([]);
                fieldArrayCoordinatesHelper.push([]);

                for (let i=0; i<shipArray[0].length; i++) {
                    fieldArray[x][y-i] = 1;
                    fieldArrayCoordinates[fieldArrayCoordinates.length-1].push([x,y-i]);
                    fieldArrayCoordinatesHelper[fieldArrayCoordinatesHelper.length-1].push([x,y-i]);

                    if (i === 0 && randomNumberFirstCell%10 < 9) {
                        if (randomNumberFirstCell/10 > 1) {
                            fieldArray[x-1][y+1] = 2;
                            fieldArrayCoordClosest[fieldArrayCoordClosest.length-1].push([x-1,y+1]);
                        }

                        fieldArray[x][y+1] = 2;
                        fieldArrayCoordClosest[fieldArrayCoordClosest.length-1].push([x,y+1]);

                        if (randomNumberFirstCell/10 < 9) {
                            fieldArray[x+1][y+1] = 2;
                            fieldArrayCoordClosest[fieldArrayCoordClosest.length-1].push([x+1,y+1]);
                        }
                    }
                    if (0 < i <= shipArray[0].length-1) {
                        if (randomNumberFirstCell/10 > 1) {
                            fieldArray[x-1][y-i] = 2;
                            fieldArrayCoordClosest[fieldArrayCoordClosest.length-1].push([x-1,y-i]);
                        }
                        if (randomNumberFirstCell/10 < 9) {
                            fieldArray[x+1][y-i] = 2;
                            fieldArrayCoordClosest[fieldArrayCoordClosest.length-1].push([x+1,y-i]);
                        }
                    }
                    if ((i === shipArray[0].length-1) && (randomNumberFirstCell%10-i-1) >= 0) {
                        if (randomNumberFirstCell/10 > 1) {
                            fieldArray[x-1][y-i-1] = 2;
                            fieldArrayCoordClosest[fieldArrayCoordClosest.length-1].push([x-1,y-i-1]);
                        }

                        fieldArray[x][y-i-1] = 2;
                        fieldArrayCoordClosest[fieldArrayCoordClosest.length-1].push([x,y-i-1]);

                        if (randomNumberFirstCell/10 < 9) {
                            fieldArray[x+1][y-i-1] = 2;
                            fieldArrayCoordClosest[fieldArrayCoordClosest.length-1].push([x+1,y-i-1]);
                        }                   
                    }
                } 
            } else {
                getRandom();
            }
            shipArray.shift();
            getRandom();
        } else {
            getRandom();
        }
    };
console.log(fieldArray);
    function getRandom() {
        if (shipArray.length > 0) {
            randomNumberFirstCell = Math.floor(Math.random()*99);
            randomNumberDirection = Math.floor(Math.random()*2);
            x = Math.floor(randomNumberFirstCell/10);
            y = Math.floor(randomNumberFirstCell%10);

            directionArray[randomNumberDirection]();
        }
    };
};

export { placeShip, fieldArray, fieldArrayCoordinates, fieldArrayCoordClosest, fieldArrayCoordinatesHelper };