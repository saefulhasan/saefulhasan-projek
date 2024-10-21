// Mendapatkan elemen layar kalkulator
const calculatorScreen = document.querySelector('.calculator-screen');

// Variabel untuk menyimpan nilai sementara
let currentNumber = '';
let previousNumber = '';
let operator = null;

function goBack() {
    window.history.back();
}

function deleteLast() {
    let display = document.getElementById("display").value;
    document.getElementById("display").value = display.slice(0, -1);
}

// Fungsi untuk memperbarui layar
function updateScreen(number) {
    calculatorScreen.value = number;
}

// Fungsi untuk menangani input angka
function inputNumber(number) {
    currentNumber = currentNumber === '0' ? number : currentNumber + number;
}

// Fungsi untuk menangani input operator
function inputOperator(op) {
    if (operator !== null) {
        calculate();
    }
    previousNumber = currentNumber;
    currentNumber = '';
    operator = op;
}

// Fungsi untuk menghitung hasil operasi
function calculate() {
    let result;
    const prev = parseFloat(previousNumber);
    const curr = parseFloat(currentNumber);

    if (isNaN(prev) || isNaN(curr)) return;

    switch (operator) {
        case '+':
            result = prev + curr;
            break;
        case '-':
            result = prev - curr;
            break;
        case '*':
            result = prev * curr;
            break;
        case '/':
            result = prev / curr;
            break;
        default:
            return;
    }
    currentNumber = result.toString();
    operator = null;
}

// Fungsi untuk menghapus semua input
function clearAll() {
    currentNumber = '';
    previousNumber = '';
    operator = null;
}


// Fungsi untuk menangani tombol "="
function handleEqual() {
    if (operator !== null) {
        calculate();
        updateScreen(currentNumber);
    }
}

// Event listener untuk tombol angka
const numberButtons = document.querySelectorAll('button:not(.operator)');
numberButtons.forEach(button => {
    button.addEventListener('click', (event) => {
        inputNumber(event.target.value);
        updateScreen(currentNumber);
    });
});

// Event listener untuk tombol operator
const operatorButtons = document.querySelectorAll('.operator');
operatorButtons.forEach(button => {
    button.addEventListener('click', (event) => {
        if (event.target.value === "clear") {
            clearAll();
            updateScreen('0');
        } else if (event.target.value === "=") {
            handleEqual();
        } else {
            inputOperator(event.target.value);
        }
    });
});

// Awal layar kosong
clearAll();
updateScreen('0');
