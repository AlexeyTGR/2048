"use strict";

const valueArray = [
    [null, null, null, null],
    [null, null, null, null],
    [null, null, null, null],
    [null, null, null, null]
];

let oldValuesArr = [];
let oldValuesStr = '';
let newValuesArr = [];
let newValuesStr = '';

nextElement();
nextElement();
refresh();

document.addEventListener('keydown', function (event) {
    if (event.code == 'ArrowLeft') {
        moveLeft();
        if (checkChanges()) {
            nextElement();
            refresh();
            isWin();
        } else isDefeat()
    }
    else if (event.code == 'ArrowRight') {
        moveRight();
        if (checkChanges()) {
            nextElement();
            refresh();
            isWin();
        } else isDefeat()
    }
    else if (event.code == 'ArrowUp') {
        moveUp();
        if (checkChanges()) {
            nextElement();
            refresh();
            isWin();
        } else isDefeat()
    }
    else if (event.code == 'ArrowDown') {
        moveDown();
        if (checkChanges()) {
            nextElement();
            refresh();
            isWin();
        } else isDefeat()
    }
});

function checkChanges() {
    return oldValuesStr === newValuesStr ? false : true
}

function isWin() {
    valueArray.forEach(function (item) {
        item.forEach(function (element) {
            if (element == 2048) alert('You WINiamin!')
        })
    })
}

function isDefeat() {
    let checkEmptyCell = false;
    let checkMatch = false;

    valueArray.forEach(function(item){
        if (item.includes(null)) checkEmptyCell = true
    });

    for (let i = 0; i < valueArray.length; i++){
        for (let j = 0; j < valueArray.length - 1; j++) {
            if (valueArray[i][j] == valueArray[i][j + 1]) checkMatch = true
                      
        }
    }
   
    for (let i = 0; i < valueArray.length - 1; i++){
        for (let j = 0; j < valueArray.length; j++){
            if (valueArray[i][j] == valueArray[i+1][j]) checkMatch = true
            }
        }

    if (!(checkMatch || checkEmptyCell)) return alert('YOU DEAD')
}

function nextElement() {

    let arr = [];
    let a;
    let b = [];
    for (let i = 0; i < 4; i++) arr.push(i);

    arr.sort(() => Math.random() - 0.5)

    arr.forEach(function (item, index) {
        if (valueArray[item].includes(null)) {
            a = index
            return a = arr[a]
        }
    })

    valueArray[a].forEach(function (item, index) {
        if (item == null) {
            b.push(index)
        }
    })

    b.sort(() => Math.random() - 0.5)
    b = b[0]

    let num = Math.random()
    if (num < 0.89) num = 2
    else num = 4

    valueArray[a][b] = num

}

function moveLeft() {

    oldValuesArr = [...valueArray];
    oldValuesStr = oldValuesArr.join('');

    valueArray.forEach(function (elem) {

        for (let k = 0; k < elem.length; k++) {
            if (elem[k] == null) {
                elem.splice(k, 1);
                k--
            }
        }

        for (let j = 0; j < elem.length; j++) {

            if (elem[j] == null) elem.splice(j, 1)
            else if (elem[j] == elem[j + 1]) {
                elem[j] *= 2;
                elem.splice(j + 1, 1);
            }
        }

        while (elem.length < 4) elem.push(null)
    })

    newValuesArr = [...valueArray];
    newValuesStr = newValuesArr.join('');

};

function moveRight() {

    oldValuesArr = [...valueArray];
    oldValuesStr = oldValuesArr.join('');

    valueArray.forEach(function (elem) {

        elem.reverse()

        for (let k = 0; k < elem.length; k++) {
            if (elem[k] == null) {
                elem.splice(k, 1);
                k--
            }
        }

        for (let j = 0; j < elem.length; j++) {

            if (elem[j] == null) elem.splice(j, 1)
            else if (elem[j] == elem[j + 1]) {
                elem[j] *= 2;
                elem.splice(j + 1, 1);
            }
        }

        while (elem.length < 4) elem.push(null)

        elem.reverse()
    })

    newValuesArr = [...valueArray];
    newValuesStr = newValuesArr.join('');

};

function moveUp() {

    oldValuesArr = [...valueArray];
    oldValuesStr = oldValuesArr.join('');

    for (let i = 0; i < valueArray.length; i++) {

        let elem = [];

        valueArray.forEach(function (item) { elem.push(item[i]) })

        for (let k = 0; k < elem.length; k++) {
            if (elem[k] == null) {
                elem.splice(k, 1);
                k--
            }
        }

        for (let j = 0; j < elem.length; j++) {

            if (elem[j] == null) elem.splice(j, 1)
            else if (elem[j] == elem[j + 1]) {
                elem[j] *= 2;
                elem.splice(j + 1, 1);
            }
        }

        while (elem.length < 4) elem.push(null)
        for (let h = 0; h < valueArray.length; h++) {
            valueArray[h][i] = elem[h];
        }

    }

    newValuesArr = [...valueArray];
    newValuesStr = newValuesArr.join('');

}

function moveDown() {

    oldValuesArr = [...valueArray];
    oldValuesStr = oldValuesArr.join('');

    for (let i = 0; i < valueArray.length; i++) {

        let elem = [];

        valueArray.forEach(function (item) { elem.push(item[i]) })

        elem.reverse()

        for (let k = 0; k < elem.length; k++) {
            if (elem[k] == null) {
                elem.splice(k, 1);
                k--
            }
        }

        for (let j = 0; j < elem.length; j++) {

            if (elem[j] == null) elem.splice(j, 1)
            else if (elem[j] == elem[j + 1]) {
                elem[j] *= 2;
                elem.splice(j + 1, 1);
            }
        }

        while (elem.length < 4) elem.push(null)
        elem.reverse()
        for (let h = 0; h < valueArray.length; h++) {
            valueArray[h][i] = elem[h];
        }

    }

    newValuesArr = [...valueArray];
    newValuesStr = newValuesArr.join('');

};

function refresh() {

    document.getElementById('cell00').innerText = valueArray[0][0];
    document.getElementById('cell01').innerText = valueArray[0][1];
    document.getElementById('cell02').innerText = valueArray[0][2];
    document.getElementById('cell03').innerText = valueArray[0][3];

    document.getElementById('cell10').innerText = valueArray[1][0];
    document.getElementById('cell11').innerText = valueArray[1][1];
    document.getElementById('cell12').innerText = valueArray[1][2];
    document.getElementById('cell13').innerText = valueArray[1][3];

    document.getElementById('cell20').innerText = valueArray[2][0];
    document.getElementById('cell21').innerText = valueArray[2][1];
    document.getElementById('cell22').innerText = valueArray[2][2];
    document.getElementById('cell23').innerText = valueArray[2][3];

    document.getElementById('cell30').innerText = valueArray[3][0];
    document.getElementById('cell31').innerText = valueArray[3][1];
    document.getElementById('cell32').innerText = valueArray[3][2];
    document.getElementById('cell33').innerText = valueArray[3][3];

}

