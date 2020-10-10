window.onload = function() {
    var input = document.getElementById('input');
    var clear = document.getElementById('clear');
    var numbers = document.getElementsByClassName('number');
    var operands = document.getElementsByClassName('operand');
    var radios = document.getElementsByClassName('numberSystem');

    var value = 0;
    var operand;
    var numberSystem = 10;
    
    // переводы в разные системы исчисления
    for (var i = 0; i < radios.length; i++) {
        radios[i].addEventListener('click', function() {
            var number = input.value;
            number = parseInt(number, numberSystem); // сначала в десятичную
            numberSystem = this.dataset.system - 0;
            input.value = number.toString(numberSystem); // потом в ту, в которую надо
        });
    }

    // вешаем обработчики на цирфы
    for (var i = 0; i < numbers.length; i++) {
        numbers[i].addEventListener('click', function() {
            if (input.value === '0') {
                input.value = this.innerHTML;
            } else {
                input.value += this.innerHTML;
            }
        });
    }
    // вешаем обработчики на операции
    for (var i = 0; i < operands.length; i++) {
        operands[i].addEventListener('click', function() {
            switch (this.innerHTML) {
                case '+':
                    value = input.value - 0;
                    operand = '+';
                    input.value = 0;
                break;
                case '=':
                    if (operand === '+') {
                        input.value = value + (input.value - 0);
                    }
                break;
            }
        });
    }

    clear.addEventListener('click', function() {
        input.value = 0;
    });
};