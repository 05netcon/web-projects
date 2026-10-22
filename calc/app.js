let currentValue = '0';
let resultValue = '0';
// [null, '+', '-', '*', '/', '%', '**', '=']
let lastOperation = null;
// [null, 'delimiter', 'digit', 'operation']
let lastAction = null;

let buttonElements = document.getElementsByTagName('button');
Array.from(buttonElements).forEach(el => {
    el.addEventListener('click', buttonClick, false);
});

function buttonClick(e) {
    let buttonName = e.target.name;
    if (isNaN(Number(buttonName))) {
        switch (buttonName) {
            case 'C':
                resetAll();
                break;
            case 'B':
                deleteDigit();
                break;
            case '.':
                putDelimiter();
                break;
            default:
                doCalc(buttonName);
                break;
        };
    } else if (buttonName === '0' && currentValue !== '0') {
        currentValue += '0';
        lastAction = 'digit';
    } else {
        if (currentValue === '0' || lastAction === 'operation') {
            currentValue = buttonName;
        } else {
            currentValue += buttonName;
        };
        lastAction = 'digit';
    };
    updateValue();
}

function resetAll() {
    currentValue = '0';
    resultValue = '0';
    lastOperation = null;
    lastAction = null;
}

function deleteDigit() {
    if (currentValue !== '0') {
        if (currentValue.length > 1) {
            currentValue = currentValue.slice(0, -1);
        } else {
            resetAll();
        };
    };
}

function putDelimiter() {
    // Delimiter must be after digit
    if (currentValue === '0' || lastAction === 'digit') {
        // Only one delimiter is allowed
        if (currentValue.indexOf('.') < 0) {
            currentValue += '.';
            lastAction = 'delimiter';
        };
    };
}

function doCalc(operation) {
    if (lastAction === 'digit' || lastOperation === '=') {
        if (lastOperation !== null && lastOperation !== '=') {
            // Devision by 0 is not allowed
            if (currentValue === '0' && lastOperation === '/') {
                resetAll();
            } else {
                resultValue = String(eval(resultValue + lastOperation + currentValue));
                if (resultValue.indexOf('.') >= 0) {
                    resultValue = Number(resultValue).toFixed(2);
                };
                currentValue = resultValue;
            };
        } else {
            resultValue = currentValue;
        };
        lastOperation = operation
        lastAction = 'operation';
    };
}

function updateValue() {
    let outputField = document.getElementById('output');
    outputField.value = currentValue;
}
