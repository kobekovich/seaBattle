function addToLocalStorage(player, shots, finishTime) {
    let resArray = [player, shots, finishTime];

    localStorage.setItem(localStorage.length, resArray);

    getResultArray();
};

function getResultArray() {
    let localStorageArray = [];

    if (localStorage.length !== 0 ) {
        for (let key=0; key<localStorage.length; key++) {
            if (!localStorage.hasOwnProperty(key)) {
                continue; 
            }
    
            let resString = localStorage.getItem(key) + ',';
            
            localStorageArray.push([]);
              
            for (let i=0; i<3; i++) {
                
                localStorageArray[key].push(resString.slice(0, resString.indexOf(',')));
                resString = resString.slice(resString.indexOf(',') + 1);
            }
        }
  
        localStorageArray.sort((x,y) => {
            if ((x[1] === y[1])) { //sort results by time;
                if (x[2].slice(0,2) === y[2].slice(0,2)) {
                    return +x[2].slice(3) - +y[2].slice(3);
                } else {
                    return +x[2].slice(0,2) - +y[2].slice(0,2)
                }
            } else { //sort results by shots;
                return +x[1] - +y[1]; 
            }
        }); 
    }
   
    if (localStorage.length > 10 ) {
        localStorageArray.pop(); //delete the worst result
        localStorage.clear(); //clear localStorage

        localStorageArray.forEach((item) => localStorage.setItem(localStorage.length, item)) 
    }
    
    showRecordTable(localStorageArray);
};

function showRecordTable(arr) {

    arr.forEach((item, index) => {
        let row = document.createElement('tr');
        let tbody = document.querySelector('#tbodyHere');
        
        tbody.append(row);

        arr[index].forEach((nestedItem) => {
            let td = document.createElement('td');
            td.className = 'fs-5';

            td.innerHTML = nestedItem;
            document.querySelector('#tbodyHere tr:last-child').append(td);
        });        
    });
};

export { addToLocalStorage, showRecordTable, getResultArray };