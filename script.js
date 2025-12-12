const display = document.getElementById('display');
const buttons = document.querySelectorAll('button');
let input = '';
function calculateExpression(expr) {
    try {
        expr = expr.replace(/,/g, '.');
        expr = expr.replace(/(\d+(\.\d+)?)%/g, '($1/100)');
        if (/[^0-9+\-*/.()%]/.test(expr)) return 'Помилка';
        return Function('"use strict"; return (' + expr + ')')();
    } catch {
        return 'Помилка';
    }
}
function adjustFontSize() {
    const maxFont = 2;
    const minFont = 1;
    const maxLength = 15;
    var length = display.value.length;
    var newSize = maxFont;
    if (length > maxLength) {
        newSize = Math.max(minFont, maxFont - (length - maxLength) * 0.1);
    }
    display.style.fontSize = newSize + 'em';
}
for (var i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', function() {
        var value = this.textContent;
        if (this.id === 'clear') {
            input = '';
            display.value = '';
        } else if (this.id === 'backspace') {
            input = input.slice(0, -1);
            display.value = input;
        } else if (value === '=') {
            var result = calculateExpression(input);
            display.value = result;
            input = result.toString();
        } else {
            if (/[+\-*/%]/.test(value) && /[+\-*/%]$/.test(input)) return;
            input += value;
            display.value = input;
        }
        adjustFontSize();
    });
}
document.addEventListener('keydown', function(e) {
    var validKeys = '0123456789.+-*/%';
    if (validKeys.indexOf(e.key) !== -1) {
        if (/[+\-*/%]/.test(e.key) && /[+\-*/%]$/.test(input)) return;
        input += e.key;
        display.value = input;
    } else if (e.key === 'Enter') {
        var result = calculateExpression(input);
        display.value = result;
        input = result.toString();
    } else if (e.key === 'Backspace') {
        input = input.slice(0, -1);
        display.value = input;
    } else if (e.key.toLowerCase() === 'c') {
        input = '';
        display.value = '';
    }
    adjustFontSize();
});