"use strict";

let valueArray = [];
let oldValuesArr = [];
let oldValuesStr = '';
let newValuesArr = [];
let newValuesStr = '';
let matrixSize = null;
const COMMON_RANDOM_VALUE = 2;
const RARE_RANDOM_VALUE = 4;
const VALUE_FOR_VICTORY = 2048;
const VICTORY_MESSAGE = 'VICTORY!';
const DEFEAT_MESSAGE = 'YOU DIED';
const START_NEW_GAME_QUESTION = 'Would you like to start a new game?'
const FIELD_SIZE_QUESTION = 'Input the size of game field';
let winCondition = false;
let toStringValueArray = null;
let scoreCounter = null;
let bestScore = null;
const newGameButton = document.getElementById('new-game');
newGameButton.onclick = startNewGame;

getLocalStorageValues();
createGameField();
renderGameField();

function createGameField() {
    for (let row = 0; row < matrixSize; row++) {
        for (let column = 0; column < matrixSize; column++) {
            let divElement = document.createElement('div');
            net.append(divElement);
            divElement.id = `cell${row}${column}`;
        }
    }
    let styleAttribute = document.querySelector('.grid');
    styleAttribute.setAttribute('style', `display: grid; 
                                grid-template-columns: repeat(${matrixSize}, 100px); 
                                grid-template-rows: repeat(${matrixSize}, 100px);
                                justify-content: center;`);
}

function removeGameField() {
    let element = document.getElementById("net");
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
}

function saveGameFieldToLocalStorage() {
    toStringValueArray = JSON.stringify(valueArray);
    localStorage.setItem("gameField", toStringValueArray);
    localStorage.setItem("scoreCouner", scoreCounter);
    localStorage.setItem("matrixSize", matrixSize)
};

function checkBestScore() {
    if (+bestScore < +scoreCounter) {
        bestScore = scoreCounter;
        localStorage.setItem("bestScore", bestScore);
    };
};

function getLocalStorageValues() {
    matrixSize = localStorage.getItem("matrixSize");
    if (localStorage["gameField"]) {
        let localValue = localStorage.getItem("gameField");
        valueArray = JSON.parse(localValue);
    }
    let localScore = localStorage.getItem("scoreCouner");
    scoreCounter = JSON.parse(localScore);
    let localBestScore = localStorage.getItem("bestScore");
    bestScore = JSON.parse(localBestScore);
};

function createValueArray() {
    valueArray = new Array(matrixSize);
    for (let row = 0; row < matrixSize; row++) {
        valueArray[row] = new Array(matrixSize)
    };
    valueArray.forEach((item) => {
        for (let i = 0; i < matrixSize; i++) {
            item[i] = null;
        }
    });
}

function startNewGame() {
    winCondition = false;
    removeGameField();
    let askMatrixSize = prompt(FIELD_SIZE_QUESTION, 4);
    matrixSize = askMatrixSize;
    createValueArray();
    createGameField();
    valueArray.forEach((item) => {
        for (let i = 0; i < matrixSize; i++) {
            item[i] = null;
        }
    });
    createNextElement();
    createNextElement();
    scoreCounter = null;
    renderGameField();
};

function makeGameTurn() {
    const isChange = checkChanges();
    if (isChange) {
        createNextElement();
    };
    checkVictoryCondition();
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

function checkVictoryCondition() {
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
    for (let i = 0; i < matrixSize; i++) {
        for (let j = 0; j < matrixSize - 1; j++) {
            if (valueArray[i][j] == valueArray[i][j + 1]) checkMatch = true;
        }
    };
    for (let i = 0; i < matrixSize - 1; i++) {
        for (let j = 0; j < matrixSize; j++) {
            if (valueArray[i][j] == valueArray[i + 1][j]) checkMatch = true;
        }
    };
    if (!(checkMatch || checkEmptyCell)) {
        setTimeout(() => alert(DEFEAT_MESSAGE), 0)
        let question = confirm(START_NEW_GAME_QUESTION);
        if (question) startNewGame();
    };
};

function createNextElement() {
    let arr = [];
    let a = null;
    let b = [];
    for (let i = 0; i < matrixSize; i++) { 
        arr.push(i); 
    }
    arr.sort(() => Math.random() - 0.5);
    arr.forEach(function (item, index) {
        if (valueArray[item].includes(null)) {
            a = arr[index];
        }
    });

    valueArray[a].forEach(function (item, index) {
        if (item == null) b.push(index);
    });
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
                scoreCounter += parseInt(elem[j]);
                elem.splice(j + 1, 1);
            }
        }
        while (elem.length < matrixSize) elem.push(null);
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
                scoreCounter += parseInt(elem[j]);
                elem.splice(j + 1, 1);
            }
        }
        while (elem.length < matrixSize) elem.push(null)
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

    for (let i = 0; i < matrixSize; i++) {
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
                scoreCounter += parseInt(elem[j]);
                elem.splice(j + 1, 1);
            }
        }
        while (elem.length < matrixSize) elem.push(null)
        for (let h = 0; h < matrixSize; h++) {
            valueArray[h][i] = elem[h];
        }
    }
    newValuesArr = [...valueArray];
    newValuesStr = newValuesArr.join('');
};

function moveDown() {
    oldValuesArr = [...valueArray];
    oldValuesStr = oldValuesArr.join('');

    for (let i = 0; i < matrixSize; i++) {
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
                scoreCounter += parseInt(elem[j]);
                elem.splice(j + 1, 1);
            }
        }
        while (elem.length < matrixSize) elem.push(null)
        elem.reverse();

        for (let h = 0; h < matrixSize; h++) {
            valueArray[h][i] = elem[h];
        }
    }
    newValuesArr = [...valueArray];
    newValuesStr = newValuesArr.join('');
};

function renderGameField() {
    checkBestScore();

    for (let i = 0; i < matrixSize; i++) {
        for (let j = 0; j < matrixSize; j++) {
            document.getElementById(`cell${i}${j}`).innerText = valueArray[i][j]
        }
    }
    document.getElementById('score').innerText = scoreCounter;
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
});
