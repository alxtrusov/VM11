
'https://github.com/'

var r = 15, 
    x = prompt('Введи Х') - 0, 
    y = prompt('Введи Y') - 0;

if (isNaN(x) || isNaN(y)) {
    alert('Введены нечисленные значения!');
} else {
    // стреляем в кружок
    if (Math.sqrt(x*x + y*y) <= r) {
        alert('Попал!');
    } else {
        alert('Промазал!!!');
    }
}
// залить монохромным цветом 
var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
context.fillStyle = 'yellow';
context.fillRect(0, 0, canvas.width, canvas.height);
// нарисовать мишень
context.beginPath();
context.strokeStyle = 'green'; // цвет линии
context.arc(canvas.width/2, canvas.height/2, canvas.width/2, 0, 2*Math.PI);
context.stroke();
// нарисовать координатные оси
context.beginPath();
context.strokeStyle = 'black'; // цвет линии
// Oy
context.moveTo(canvas.width/2, 0);
context.lineTo(canvas.width/2, canvas.height);
// Ox
context.moveTo(0, canvas.height/2);
context.lineTo(canvas.width, canvas.height/2);
context.stroke();
// нарисовать результат попадание
context.beginPath();
context.fillStyle = 'red'; // цвет заливки
context.strokeStyle = 'red'; // цвет линии
context.arc(canvas.width/2 + x, canvas.height/2 + y, 10, 0, 2*Math.PI);
context.fill();

// стреляем в квадрат
// стреляем в ромб
// стреляем в прямоугольник