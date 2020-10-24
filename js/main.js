function f(x) {
    return x * x - 4;
}

function g(x) {
    return Math.cos(x);
}

window.onload = function () {
    var WINDOW = {
        LEFT: -10,
        BOTTOM: -10,
        WIDTH: 20,
        HEIGHT: 20
    };

    var graph = new Graph({ id: 'canvas', width: 800, height: 800, WINDOW: WINDOW });

    function printOXY() {
        // Ox
        graph.line(WINDOW.LEFT, 0, WINDOW.WIDTH + WINDOW.LEFT, 0, 'black', 1);
        // Oy
        graph.line(0, WINDOW.BOTTOM, 0, WINDOW.HEIGHT + WINDOW.BOTTOM, 'black', 1);
        for (var i = 1; i < WINDOW.WIDTH + WINDOW.LEFT; i++) {
            graph.line(i, 0.1, i, -0.1, 'black');
        }
        for (var i = -1; i > WINDOW.LEFT; i--) {
            graph.line(i, 0.1, i, -0.1, 'black');
        }
    }

    function printFunction(f) {
        var x = WINDOW.LEFT;
        var dx = WINDOW.WIDTH / 1000;
        while (x < WINDOW.WIDTH + WINDOW.LEFT) {
            graph.line(x, f(x), x + dx, f(x + dx));
            x += dx;
        }
    }

    function render() {
        graph.clear();
        printFunction(f);
        printFunction(g);
        printOXY();
        graph.text(1, 1, 'Вася');
    }
    render();
}