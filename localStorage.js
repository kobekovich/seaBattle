
function addToLocalStorage(value) {
    if (localStorage.length) {
        counter = Number(counter) ;
    } else {
        counter = 0;
    }

    counter++;

    localStorage.setItem("counter", value);
}