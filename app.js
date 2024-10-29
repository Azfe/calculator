const calculatorScreen = document.querySelector('.calculator-screen');
const screenProcess = document.querySelector('.screen-process');
let currentInput = '';
let previousInput = '';
let oper = '';
let shouldResetInput = false;
calculatorScreen.textContent = '0';

// Se  añade un "event listener" para manejar los clics en los botones de la calculadora
document.querySelector('.calculator-keys').addEventListener('click', function(event){
    // Se obtiene el elemento que se clicó y su valor
    const target = event.target;
    const value = target.value;

    // Se verifica que el elemento clicado sea un botón
    if (target.tagName !== 'BUTTON') return;   

    // TESTING
    console.log("1: " + calculatorScreen.textContent);

    // Se reinicia el valor de currentInput y se actualiza la pantalla de la calculadora /*Aquí se debe reiniciar todo el proceso de la operación*/
    if (value === 'all-clear') {
        currentInput = '0';
        shouldResetInput = false;
        
        calculatorScreen.textContent = `${currentInput}`;
        screenProcess.textContent = ''; // Se limpia el historial
        return;
    }

    // Se reinicia el valor de currentInput y se actualiza la pantalla de la calculadora
    if (value === 'clear-entry') {
        currentInput = '0';
        shouldResetInput = false;
        calculatorScreen.textContent = `${currentInput}`;
        return;
    }

    // Calcular usando operadores en vez del símbolo igual    
    if (target.classList.contains('operator')) { // Se verifica que existe un símbolo de operación
        if (previousInput !== '' && currentInput !== '') { // se opera si hay entradas previas y actuales            
            screenProcess.textContent += `${currentInput}`;
            currentInput = calcular(previousInput, currentInput, operator);
            calculatorScreen.textContent = `${currentInput}`;
        }

        operator = value;
        previousInput = currentInput;
        shouldResetInput = true;        
        screenProcess.textContent += `${currentInput} ${operator} `;     
        console.log('valor de operación: ' + operator);
        return;
    }

    // Se calcula usando símbolo igual y se finaliza el cálculo
    if (value === '=') {
        if (previousInput === '' || currentInput === '') return; // Evitar operaciones si falta una entrada

        screenProcess.textContent += ` ${currentInput} =`;
        currentInput = calcular(previousInput, currentInput, operator);
        calculatorScreen.textContent = `${currentInput}`;
        
        // TESTING
        console.log("= " + calculatorScreen.textContent);

        previousInput = '';
        operator = '';
        shouldResetInput = true;
        return;
    }

    // Botón conmuta el  número a negativo o positivo
    if (value === '+/-') { // Maneja el botón +/-
        currentInput = (parseFloat(currentInput) * -1).toString(); // conmuta el  número a negativo o positivo
        calculatorScreen.textContent = `${currentInput}`;
        return;
    }    

    // Se maneja el reseteo del input
    if (shouldResetInput) {
        currentInput = value;
        shouldResetInput = false;
    } else {
        // Si se hace clic en la coma decimal, verifica que no haya más de una coma en currentInput antes de agregarlo.
        if (value === ',' && currentInput.includes(',')) {
            return;
        }
        currentInput += value;
    }

    // Se actualiza el valor de la pantalla de la calculadora para que muestre el valor de currentInput
    calculatorScreen.textContent = `${currentInput}`;
});

// Función para calculo de operaciones aritméticas
function calcular(num1, num2, oper){
    num1 = parseFloat(num1);
    num2 = parseFloat(num2);

    switch(oper) {
        case '+':
            return num1 + num2;            
        case '-':
            return num1 - num2;
        case '*':
            return num1 * num2;
        case '/':
            if (num2 !== 0) {
                return num1 / num2;
            } else {
                return 'Error: División por cero';
            }
        default:
            return 'Operación no válida';
    }    
}