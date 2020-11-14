function sin(x) { return Math.sin(x); }
function cos(x) { return Math.cos(x); }
function tan(x) { return Math.tan(x); }
function abs(x) { return Math.abs(x); }
function sqrt(x) { return Math.sqrt(x); }

function UI(options) {
    var callbacks = options.callbacks;
    document.getElementById('addFunction').addEventListener('click', addFunction);
    document.getElementById('showHide').addEventListener('click', showHide);
    var num = 0;

    function showHide() {
        var div = document.querySelector('.over');
        div.classList.toggle('hide');
    }

    function addFunction() {
        // инпут для функции
        var input = document.createElement('input');
        input.setAttribute('placeholder', `function №${num}`);
        input.dataset.num = num;
        input.addEventListener('keyup', keyup);
        // кнопка для удаления функции
        var button = document.createElement('button');
        button.innerHTML = 'Удалить';
        button.addEventListener('click', function() {
            callbacks.delFunction(input.dataset.num);
            divFuncs.removeChild(input);
            divFuncs.removeChild(button);
        });
        // добавить элементы на страницу
        var divFuncs = document.getElementById('funcs');
        divFuncs.appendChild(input);
        divFuncs.appendChild(button);
        num++;
    }

    function keyup() {
        try {
            var f;
            eval(`f = function(x) { return ${this.value}; }`);
            callbacks.enterFunction(f, this.dataset.num);
        } catch(e) {
            //console.log(e);
        }
    }
}