    
    function left() {
        if (randomNumberFirstCell%10 >= shipArray[0].length-1) { //left
            for (let k=0; k<shipArray[0].length; k++) { //check allowed cells
                if (document.querySelector('#' + CSS.escape(randomNumberFirstCell-k)).innerHTML === 2) {
                    getRandom();
                }
            }
            for (let i=0; i<shipArray[0].length; i++) {
                document.querySelector('#' + CSS.escape(randomNumberFirstCell-i)).innerHTML=1;
            } 
            shipArray.shift();

            if(shipArray.length > 0) {
                getRandom();  
            }
        } else {
            getRandom();
        }
    };
    
    function up() {       
        if (randomNumberFirstCell/10 >= shipArray[0].length-1) { //up

            let sum = 0;
            for (let k=0; k<shipArray[0].length; k++) { //check allowed cells
                if ((document.querySelector('#' + CSS.escape(randomNumberFirstCell-k*10)).innerHTML === ' ') || 
                   (document.querySelector('#' + CSS.escape(randomNumberFirstCell-k*10)).innerHTML === '1')) {
                    sum++;
                }
            }
            if (sum === 0) {
                for (let i=0; i<shipArray[0].length; i++) {
                    document.querySelector('#' + CSS.escape(randomNumberFirstCell-i*10)).innerHTML=1;
                    if (i === 0 && randomNumberFirstCell/10 < 9) {
                        if (randomNumberFirstCell%10 > 0) {
                            document.querySelector('#' + CSS.escape(randomNumberFirstCell+9)).innerHTML=' ';
                        }
                        document.querySelector('#' + CSS.escape(randomNumberFirstCell+10)).innerHTML=' ';
                        if (randomNumberFirstCell%10 < 9) {
                            document.querySelector('#' + CSS.escape(randomNumberFirstCell+11)).innerHTML=' ';
                        }
                    }
                    if (0 < i <= shipArray[0].length-1) {
                        if (randomNumberFirstCell%10 > 0) {
                            document.querySelector('#' + CSS.escape(randomNumberFirstCell-i*10-1)).innerHTML=' ';
                        }
                        if (randomNumberFirstCell%10 < 9) {
                            document.querySelector('#' + CSS.escape(randomNumberFirstCell-i*10+1)).innerHTML=' ';
                        }
                    }
                    if ((i === shipArray[0].length-1) && (randomNumberFirstCell - 10*i-10) >= 0) {
                        if (randomNumberFirstCell%10 > 0) {
                            document.querySelector('#' + CSS.escape(randomNumberFirstCell-i*10-11)).innerHTML=' ';
                        }
                        document.querySelector('#' + CSS.escape(randomNumberFirstCell-i*10-10)).innerHTML=' ';
                        if (randomNumberFirstCell%10 < 9) {
                            document.querySelector('#' + CSS.escape(randomNumberFirstCell-i*10-9)).innerHTML=' ';
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
