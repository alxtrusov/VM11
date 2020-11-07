var graphs = [
    {
        func: function (x) {
            return Math.sin(x);
        },
        color: 'red', 
        width: 1, 
        name: 'y = sin x', 
        nameCoor: -8
    },
    {
        func: function (x) {
            return Math.cos(x)*x/2;
        }, 
        color: 'blue', 
        width: 2, 
        name: 'y = cos x', 
        nameCoor: 2.3
    }
]

window.onload = function () {
    var WINDOW = {
        LEFT: -10,
        BOTTOM: -10,
        WIDTH: 20,
        HEIGHT: 20
    };

    var graph = new Graph({ id: 'canvas', width: 800, height: 800, WINDOW: WINDOW, callBacks: { wheel, mouseup, mousedown, mousemove, mouseleave } });

    var zoomStep = 0.2;
    var canScroll = false;

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
        var dx = WINDOW.WIDTH / 1000;
        while (x < WINDOW.WIDTH + WINDOW.LEFT) {
            graph.line(x, f(x), x + dx, f(x + dx), color, width);
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
                graph.line(i, -size*2, i, size*2, MAIN_COLOR, 2);
            } else {
                graph.line(i, -size, i, size, MAIN_COLOR, 1);
            }
        }
        for (var i = -1; i > WINDOW.LEFT; i--) {
            graph.line(i, WINDOW.HEIGHT, i, WINDOW.BOTTOM, SEC_COLOR, 1);
            if (i % -5 == 0) {
                graph.line(i, -size*2, i, size*2, MAIN_COLOR, 2);
            } else {
                graph.line(i, -size, i, size, MAIN_COLOR, 1);
            }
        }
        for (var i = 1; i < WINDOW.HEIGHT + WINDOW.BOTTOM; i++) {
            graph.line(WINDOW.LEFT, i, WINDOW.WIDTH, i, SEC_COLOR, 1);
            if (i % 5 == 0) {
                graph.line(-size*2, i, size*2, i, MAIN_COLOR, 2);
            } else {
                graph.line(-size, i, size, i, MAIN_COLOR, 1);
            }
        }
        for (var i = -1; i > WINDOW.BOTTOM; i--) {
            graph.line(WINDOW.LEFT, i, WINDOW.WIDTH, i, SEC_COLOR, 1);
            if (i % -5 == 0) {
                graph.line(-size*2, i, size*2, i, MAIN_COLOR, 2);
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

    function getZero(f, a, b) {
        var c;
        var E = 0.001;
        while (Math.abs(f(a) - f(b)) >= E) {
            if (f(a) * f(b) > 0) {
                return false;
            }
            c = (a + b) / 2;
            if (f(a) * f(c) <= 0) {
                b = c;
                c = (a + b) / 2;
            }
            if (f(c) * f(b) <= 0) {
                a = c;
                c = (a + b) / 2;
            }
        }
        return a;
    }

    function render() {
        graph.clear();
        printOXY();
        for (var i = 0; i < graphs.length; i++) {
            printFunction(graphs[i].func, graphs[i].color, graphs[i].width);
            graph.printFuncNames(graphs[i].name, graphs[i].nameCoor, graphs[i].func, graphs[i].color);
            /*var a, b;
            a = WINDOW.LEFT;
            b = a + 1;
            while (b <= WINDOW.WIDTH + WINDOW.LEFT) {
                if (getZero(graphs[i].func, a, b) != false) {
                    x = getZero(graphs[i].func, a, b);
                }
                graph.point(x, 0, graphs[i].color, 5);
                a = b;
                b += 1;
            }*/
        }
        printNumbers();
    }

    render();
}