function sin(x) { return Math.sin(x); }
function cos(x) { return Math.cos(x); }
function tan(x) { return Math.tan(x); }
function abs(x) { return Math.abs(x); }
function sqrt(x) { return Math.sqrt(x); }

function UI(options) {
    var callbacks = options.callbacks;
    var input = document.getElementById('func');
    input.addEventListener('keyup', keyup);

    function keyup() {
        try {
            var f;
            eval(`f = function(x) { return ${this.value}; }`);
            callbacks.enterFunction(f);
        } catch(e) {
            //console.log(e);
        }
    }
}