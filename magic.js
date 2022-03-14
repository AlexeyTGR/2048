"use strict";

let valueArray = [
    [null, null, null, null],
    [null, null, null, null],
    [null, null, null, null],
    [null, null, null, null]
];

let oldValuesArr = [];
let oldValuesStr = '';
let newValuesArr = [];
let newValuesStr = '';
const MATRIX_SIZE = 4;
const COMMON_RANDOM_VALUE = 2;
const RARE_RANDOM_VALUE = 4;
const VALUE_FOR_VICTORY = 2048;
const VICTORY_MESSAGE = 'VICTORY!';
const DEFEAT_MESSAGE = 'YOU DIED';
const START_NEW_GAME_QUESTION = 'Would you like to start a new game?'
let winCondition = false;
let toStringValueArray = null;
let restoredValueArray = null;
let scoreCouner = null;
let bestScore = null;

const newGameButton = document.getElementById('new-game');
newGameButton.onclick = startNewGame;

getLocalStorageValues();

function saveGameFieldToLocalStorage() {
    toStringValueArray = JSON.stringify(valueArray);
    localStorage.setItem("gameField", toStringValueArray);
    localStorage.setItem("scoreCouner", scoreCouner);
};

function checkBestScore() {
    if (+bestScore < +scoreCouner) {
        bestScore = scoreCouner;
        localStorage.setItem("bestScore", bestScore);
    };
};

function getLocalStorageValues() {
    if (localStorage["gameField"]) {
        let localValue = localStorage.getItem("gameField");
        restoredValueArray = JSON.parse(localValue);
        valueArray = restoredValueArray;
        renderGameField();
    };
    let localScore = localStorage.getItem("scoreCouner");
    scoreCouner = JSON.parse(localScore);
    let localBestScore = localStorage.getItem("bestScore");
    bestScore = JSON.parse(localBestScore);
    renderGameField();
};

function startNewGame() {
    winCondition = false;
    valueArray.forEach((item) => {
        for (let i = 0; i < valueArray.length; i++) {
            item[i] = null;
        }
    });
    createNextElement();
    createNextElement();
    scoreCouner = null;
    renderGameField();
};

function makeGameTurn() {
    const isChange = checkChanges();
    if (isChange) {
        createNextElement();
    };
    checkWinCondition();
    renderGameField();
    if (winCondition) {
        setTimeout(() => showVictoryMessage(), 0)
    };
    checkDefeatConditions();
    saveGameFieldToLocalStorage();
}

function checkChanges() {
    return oldValuesStr !== newValuesStr;
}

function checkWinCondition() {
    valueArray.forEach(function (item) {
        item.forEach(function (element) {
            if (element == VALUE_FOR_VICTORY) {
                winCondition = true;
            };
        });
    });
};

function showVictoryMessage() {
    alert(VICTORY_MESSAGE);
    startNewGame();
};

function checkDefeatConditions() {
    let checkEmptyCell = false;
    let checkMatch = false;

    valueArray.forEach(function (item) {
        if (item.includes(null)) checkEmptyCell = true
    });
    for (let i = 0; i < valueArray.length; i++) {
        for (let j = 0; j < valueArray.length - 1; j++) {
            if (valueArray[i][j] == valueArray[i][j + 1]) checkMatch = true;
        }
    };
    for (let i = 0; i < valueArray.length - 1; i++) {
        for (let j = 0; j < valueArray.length; j++) {
            if (valueArray[i][j] == valueArray[i + 1][j]) checkMatch = true;
        }
    };
    if (!(checkMatch || checkEmptyCell)) {
        alert(DEFEAT_MESSAGE);
        let question = confirm(START_NEW_GAME_QUESTION);
        if (question) startNewGame();
    };
};

function createNextElement() {
    let arr = [];
    let a = null;
    let b = [];
    for (let i = 0; i < valueArray.length; i++) { arr.push(i); }

    arr.sort(() => Math.random() - 0.5);
    arr.forEach(function (item, index) {
        if (valueArray[item].includes(null)) {
            a = arr[index];
        }
    })

    valueArray[a].forEach(function (item, index) {
        if (item == null) b.push(index);
    })

    b.sort(() => Math.random() - 0.5)
    b = b[0]

    let num = Math.random()
    if (num < 0.89) num = COMMON_RANDOM_VALUE;
    else num = RARE_RANDOM_VALUE;

    valueArray[a][b] = num;
};

function moveLeft() {
    oldValuesArr = [...valueArray];
    oldValuesStr = oldValuesArr.join('');

    valueArray.forEach(function (elem) {
        for (let k = 0; k < elem.length; k++) {
            if (elem[k] == null) {
                elem.splice(k, 1);
                k--;
            }
        }
        for (let j = 0; j < elem.length; j++) {
            if (elem[j] == null) elem.splice(j, 1);
            else if (elem[j] == elem[j + 1]) {
                elem[j] *= 2;
                scoreCouner += parseInt(elem[j]);
                elem.splice(j + 1, 1);
            }
        }
        while (elem.length < MATRIX_SIZE) elem.push(null);
    })

    newValuesArr = [...valueArray];
    newValuesStr = newValuesArr.join('');
};

function moveRight() {
    oldValuesArr = [...valueArray];
    oldValuesStr = oldValuesArr.join('');

    valueArray.forEach(function (elem) {
        elem.reverse();

        for (let k = 0; k < elem.length; k++) {
            if (elem[k] == null) {
                elem.splice(k, 1);
                k--;
            }
        }
        for (let j = 0; j < elem.length; j++) {
            if (elem[j] == null) elem.splice(j, 1)
            else if (elem[j] == elem[j + 1]) {
                elem[j] *= 2;
                scoreCouner += parseInt(elem[j]);
                elem.splice(j + 1, 1);
            }
        }
        while (elem.length < MATRIX_SIZE) elem.push(null)
        elem.reverse();
    })

    newValuesArr = [...valueArray];
    newValuesStr = newValuesArr.join('');
};
// function doIt(line) {
//     console.log('here');
//     let elem = [...line];
//     for (let k = 0; k < elem.length; k++) {
//         if (elem[k] == null) {
//             elem.splice(k, 1);
//             k--;
//         }
//     }

//     for (let j = 0; j < elem.length; j++) {
//         if (elem[j] == null) elem.splice(j, 1)
//         else if (elem[j] == elem[j + 1]) {
//             elem[j] *= 2;
//             elem.splice(j + 1, 1);
//         }
//     }
//     return elem;
// }
function moveUp() {
    oldValuesArr = [...valueArray];
    oldValuesStr = oldValuesArr.join('');

    for (let i = 0; i < valueArray.length; i++) {
        let elem = [];
        valueArray.forEach(function (item) { elem.push(item[i]) });
        for (let k = 0; k < elem.length; k++) {
            if (elem[k] == null) {
                elem.splice(k, 1);
                k--;
            }
        }
        for (let j = 0; j < elem.length; j++) {
            if (elem[j] == null) elem.splice(j, 1)
            else if (elem[j] == elem[j + 1]) {
                elem[j] *= 2;
                scoreCouner += parseInt(elem[j]);
                elem.splice(j + 1, 1);
            }
        }
        while (elem.length < MATRIX_SIZE) elem.push(null)
        for (let h = 0; h < valueArray.length; h++) {
            valueArray[h][i] = elem[h];
        }
    }
    newValuesArr = [...valueArray];
    newValuesStr = newValuesArr.join('');
};

function moveDown() {
    oldValuesArr = [...valueArray];
    oldValuesStr = oldValuesArr.join('');

    for (let i = 0; i < valueArray.length; i++) {
        let elem = [];
        valueArray.forEach(function (item) { elem.push(item[i]) });
        elem.reverse();
        for (let k = 0; k < elem.length; k++) {
            if (elem[k] == null) {
                elem.splice(k, 1);
                k--;
            }
        }
        for (let j = 0; j < elem.length; j++) {
            if (elem[j] == null) elem.splice(j, 1)
            else if (elem[j] == elem[j + 1]) {
                elem[j] *= 2;
                scoreCouner += parseInt(elem[j]);
                elem.splice(j + 1, 1);
            }
        }
        // elem = doIt(elem);
        while (elem.length < MATRIX_SIZE) elem.push(null)
        elem.reverse();

        for (let h = 0; h < valueArray.length; h++) {
            valueArray[h][i] = elem[h];
        }
    }
    newValuesArr = [...valueArray];
    newValuesStr = newValuesArr.join('');
};

function renderGameField() {
    checkBestScore();

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

    document.getElementById('score').innerText = scoreCouner;
    document.getElementById('best-score').innerText = bestScore;
};

document.addEventListener('keydown', function (event) {
    const eventType = event.code;

    switch (eventType) {
        case 'ArrowLeft':
            moveLeft();
            makeGameTurn();
            break;
        case 'ArrowRight':
            moveRight();
            makeGameTurn();
            break;
        case 'ArrowUp':
            moveUp();
            makeGameTurn();
            break;
        case 'ArrowDown':
            moveDown();
            makeGameTurn();
            break;  
    }
    // if (eventType == 'ArrowLeft') {
    //     moveLeft();
    //     makeGameTurn();
    // }
    // else if (eventType == 'ArrowRight') {
    //     moveRight();
    //     makeGameTurn();
    // }
    // else if (eventType == 'ArrowUp') {
    //     moveUp();
    //     makeGameTurn();
    // }
    // else if (eventType == 'ArrowDown') {
    //     moveDown();
    //     makeGameTurn();
    // }
});
