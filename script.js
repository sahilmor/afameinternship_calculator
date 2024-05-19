document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('display');
    const buttons = document.querySelectorAll('.btn');

    let currentInput = '';
    let firstOperand = null;
    let operator = null;
    let shouldResetDisplay = false;

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const value = button.getAttribute('data-value');

            if (value === 'C') {
                clearDisplay();
            } else if (value === 'DEL') {
                deleteLast();
            } else if (value === 'Result') {
                calculate(); // Call calculate function when RESULT button is clicked
            } else if (['+', '-', '*', '/', '%'].includes(value)) {
                setOperator(value);
            } else {
                appendNumber(value);
            }
        });
    });

    function clearDisplay() {
        currentInput = '';
        display.textContent = '0';
    }

    function deleteLast() {
        if (currentInput.length > 0) {
            currentInput = currentInput.slice(0, -1);
            display.textContent = currentInput || '0';
        }
    }

    function calculate() {
        if (operator === null || shouldResetDisplay) return;

        const secondOperand = parseFloat(currentInput);
        if (isNaN(secondOperand)) return;

        let result;
        switch (operator) {
            case '+':
                result = firstOperand + secondOperand;
                break;
            case '-':
                result = firstOperand - secondOperand;
                break;
            case '*':
                result = firstOperand * secondOperand;
                break;
            case '/':
                result = firstOperand / secondOperand;
                break;
            case '%':
                result = firstOperand % secondOperand;
                break;
        }

        display.textContent = result;
        firstOperand = result;
        operator = null;
        shouldResetDisplay = true;
        currentInput = result.toString();
    }

    function setOperator(op) {
        if (currentInput === '') return;
        if (operator !== null && !shouldResetDisplay) calculate();
        firstOperand = parseFloat(currentInput);
        operator = op;
        shouldResetDisplay = true;
    }

    function appendNumber(number) {
        if (number === '.' && currentInput.includes('.')) return;
        if (currentInput === '0' || shouldResetDisplay) {
            currentInput = number;
            shouldResetDisplay = false;
        } else {
            currentInput += number;
        }
        display.textContent = currentInput;
    }
});
