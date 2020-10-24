function Graph(options) {
    options = options || {};
    var id = options.id;
    var width = options.width || 300;
    var height = options.height || 300;
    var WINDOW = options.WINDOW || {};
    var canvas;
    if (id) {
        canvas = document.getElementById(id);
    } else {
        canvas = document.createElement('canvas');
        document.querySelector('body').appendChild(canvas);
    }
    canvas.width = width;
    canvas.height = height;
    var ctx = canvas.getContext('2d');

    function xs(x) {
        return (x - WINDOW.LEFT) / WINDOW.WIDTH * canvas.width;
    }

    function ys(y) {
        return canvas.height - (y - WINDOW.BOTTOM) / WINDOW.HEIGHT * canvas.height;
    }

    this.clear = function () {
        ctx.fillStyle = '#eee';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    this.line = function (x1, y1, x2, y2, color, width) {
        ctx.beginPath();
        ctx.strokeStyle = color || '#0f0';
        ctx.lineWidth = width || 2;
        ctx.moveTo(xs(x1), ys(y1));
        ctx.lineTo(xs(x2), ys(y2));
        ctx.stroke();
    }

    this.text = function(x, y, text) {
        ctx.fillStyle = 'red';
        ctx.font = 'bold 24pt Arial';
        ctx.fillText(text, xs(x), ys(y));
    }
}