"use strict";


let element00 = document.getElementById('cell00');
let element01 = document.getElementById('cell01');
let element02 = document.getElementById('cell02');
let element03 = document.getElementById('cell03');

let element10 = document.getElementById('cell10');
let element11 = document.getElementById('cell11');
let element12 = document.getElementById('cell12');
let element13 = document.getElementById('cell13');

let element20 = document.getElementById('cell20');
let element21 = document.getElementById('cell21');
let element22 = document.getElementById('cell22');
let element23 = document.getElementById('cell23');

let element30 = document.getElementById('cell30');
let element31 = document.getElementById('cell31');
let element32 = document.getElementById('cell32');
let element33 = document.getElementById('cell33');

const valueArray = [[null, null, null, null], 
                    [null, null, null, null], 
                    [null, null, null, null],
                    [null, null, null, null]];

valueArray[1][1] = 4

document.addEventListener('keydown', function(event){
    if (event.code == 'ArrowLeft') moveLeft();

});

function moveLeft() {
   
    valueArray[1][0] = valueArray[1][1];
    refresh();

}

function refresh() {
    element00.innerText = valueArray[0][0];
    element01.innerText = valueArray[0][1];
    element02.innerText = valueArray[0][2];
    element03.innerText = valueArray[0][3];

    element10.innerText = valueArray[1][0];
    element11.innerText = valueArray[1][1];
    element12.innerText = valueArray[1][2];
    element13.innerText = valueArray[1][3];

    element20.innerText = valueArray[2][0];
    element21.innerText = valueArray[2][1];
    element22.innerText = valueArray[2][2];
    element23.innerText = valueArray[2][3];

    element30.innerText = valueArray[3][0];
    element31.innerText = valueArray[3][1];
    element32.innerText = valueArray[3][2];
    element33.innerText = valueArray[3][3];
}

