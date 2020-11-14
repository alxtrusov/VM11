var graphs = [];

window.onload = function () {
    var WINDOW = {
        LEFT: -10,
        BOTTOM: -10,
        WIDTH: 20,
        HEIGHT: 20
    };

    var graph = new Graph({
        id: 'canvas',
        width: 800,
        height: 800,
        WINDOW: WINDOW,
        callbacks: { wheel, mouseup, mousedown, mousemove, mouseleave }
    });
    var ui = new UI({ 
        callbacks: { 
            enterFunction,
            delFunction
        }
    });

    var zoomStep = 0.2;
    var canScroll = false;

    function enterFunction(f, num) {
        graphs[num] = {
            f,
            color: '#f23',
            width: 3
        };
        render();
    }
    function delFunction(num) {
        graphs[num] = null;
        render();
    }

    function wheel(event) {
        var delta = (event.wheelDelta > 0) ? - zoomStep : zoomStep;
        if (WINDOW.WIDTH - zoomStep > 0) {
            WINDOW.WIDTH += delta;
            WINDOW.HEIGHT += delta;
            WINDOW.LEFT -= delta / 2;
            WINDOW.BOTTOM -= delta / 2;
        }
        render();
    }

    function mousedown() {
        canScroll = true;
    }
    function mouseup() {
        canScroll = false;
    }
    function mouseleave() {
        canScroll = false;
    }
    function mousemove(event) {
        if (canScroll) {
            WINDOW.LEFT -= graph.sx(event.movementX);
            WINDOW.BOTTOM -= graph.sy(event.movementY);
        }
        render();
    }

    function printFunction(f, color, width) {
        var x = WINDOW.LEFT;
        var dx = WINDOW.WIDTH / 300;
        while (x < WINDOW.WIDTH + WINDOW.LEFT) {
            try {
                graph.line(x, f(x), x + dx, f(x + dx), color, width);
            } catch (e) { }
            x += dx;
        }
    }

    function printOXY() {
        var size = 0.1;
        var MAIN_COLOR = '#000';
        var SEC_COLOR = '#bbb';
        // Ox
        graph.line(WINDOW.LEFT, 0, WINDOW.WIDTH + WINDOW.LEFT, 0, MAIN_COLOR, 1);
        // Oy
        graph.line(0, WINDOW.BOTTOM, 0, WINDOW.HEIGHT + WINDOW.BOTTOM, MAIN_COLOR, 1);
        // Ox >
        graph.line(WINDOW.WIDTH + WINDOW.LEFT, 0, WINDOW.WIDTH + WINDOW.LEFT - 1 / 2, size, MAIN_COLOR, 1);
        graph.line(WINDOW.WIDTH + WINDOW.LEFT, 0, WINDOW.WIDTH + WINDOW.LEFT - 1 / 2, -size, MAIN_COLOR, 1);
        // Oy >
        graph.line(0, WINDOW.HEIGHT + WINDOW.BOTTOM, +size, WINDOW.HEIGHT + WINDOW.BOTTOM - 1 / 2, MAIN_COLOR, 1);
        graph.line(0, WINDOW.HEIGHT + WINDOW.BOTTOM, -size, WINDOW.HEIGHT + WINDOW.BOTTOM - 1 / 2, MAIN_COLOR, 1);
        for (var i = 1; i < WINDOW.WIDTH + WINDOW.LEFT; i++) {
            graph.line(i, WINDOW.HEIGHT, i, WINDOW.BOTTOM, SEC_COLOR, 1);
            if (i % 5 == 0) {
                graph.line(i, -size * 2, i, size * 2, MAIN_COLOR, 2);
            } else {
                graph.line(i, -size, i, size, MAIN_COLOR, 1);
            }
        }
        for (var i = -1; i > WINDOW.LEFT; i--) {
            graph.line(i, WINDOW.HEIGHT, i, WINDOW.BOTTOM, SEC_COLOR, 1);
            if (i % -5 == 0) {
                graph.line(i, -size * 2, i, size * 2, MAIN_COLOR, 2);
            } else {
                graph.line(i, -size, i, size, MAIN_COLOR, 1);
            }
        }
        for (var i = 1; i < WINDOW.HEIGHT + WINDOW.BOTTOM; i++) {
            graph.line(WINDOW.LEFT, i, WINDOW.WIDTH, i, SEC_COLOR, 1);
            if (i % 5 == 0) {
                graph.line(-size * 2, i, size * 2, i, MAIN_COLOR, 2);
            } else {
                graph.line(-size, i, size, i, MAIN_COLOR, 1);
            }
        }
        for (var i = -1; i > WINDOW.BOTTOM; i--) {
            graph.line(WINDOW.LEFT, i, WINDOW.WIDTH, i, SEC_COLOR, 1);
            if (i % -5 == 0) {
                graph.line(-size * 2, i, size * 2, i, MAIN_COLOR, 2);
            } else {
                graph.line(-size, i, size, i, MAIN_COLOR, 1);
            }
        }
    }

    function printNumbers() {
        for (var i = 1; i < WINDOW.WIDTH + WINDOW.LEFT; i++) {
            graph.number(i, i, 0, 'x');
        }
        for (var i = 1; i < Math.abs(WINDOW.LEFT); i++) {
            graph.number(-i, -i, 0, 'x');
        }
        for (var i = 1; i < WINDOW.HEIGHT + WINDOW.BOTTOM; i++) {
            graph.number(i, 0, i, 'y');
        }
        for (var i = 1; i < Math.abs(WINDOW.BOTTOM); i++) {
            graph.number(-i, 0, -i, 'y');
        }
        graph.number('0', 0, 0, '0');
    }

    function getZero(f, a, b, eps) {
        if (isNaN(f(a) - 0) || isNaN(f(b) - 0)) {
            return null;
        }
        if (f(a) * f(b) > 0) {
            return null;
        }
        if (Math.abs(a - b) < eps) {
            return (a + b) / 2;
        }
        var half = (a + b) / 2;
        if (f(a) * f(half) <= 0) {
            return getZero(f, a, half, eps);
        }
        if (f(half) * f(b) <= 0) {
            return getZero(f, half, b, eps);
        }
    }

    function render() {
        graph.clear();
        printOXY();
        for (var i = 0; i < graphs.length; i++) {
            if (graphs[i]) {
                printFunction(graphs[i].f, graphs[i].color, graphs[i].width);
                graph.printFuncNames(graphs[i].name, graphs[i].nameCoor, graphs[i].f, graphs[i].color);
            }
        }
        printNumbers();
        // нарисовать ноль
        /*var x = getZero(graphs[0].f, 1, 4, 0.0001);
        if (x !== null) {
            // нарисовать асимптоты 
            // график другим цветом
            graph.point(x, 0, 3); // нарисовать точку
        }*/
    }

    render();
}