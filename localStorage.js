function addToLocalStorage(player, shots, finishTime) {
    let resArray = [player, shots, finishTime];

    localStorage.setItem(localStorage.length, resArray);

    showRecordTable();
};

function showRecordTable() {
    for(let key in localStorage) {
        if (!localStorage.hasOwnProperty(key)) {
          continue; 
        }

        let resString = localStorage.getItem(key) + ',';
        let row = document.createElement('tr');
        let tbody = document.querySelector('#tbodyHere');

        tbody.append(row);

        for (let i=0; i<3; i++) {
            
            let td = document.createElement('td');

            td.innerHTML = resString.slice(0, resString.indexOf(','));
            document.querySelector('#tbodyHere tr:last-child').append(td);

            resString = resString.slice(resString.indexOf(',') + 1);
        }
    }
};

export { addToLocalStorage, showRecordTable };