
'https://github.com/'

var rooms = [
    [
        'коридор',
        'Перед тобой дверь в столовую и дверь в аудиторию. Куда пойдешь?',
        ['налево', 'да', 'направо', 'нет'],
        [1, 1, 1, 3],
        null
    ], [
        'столовка',
        'Ты обожрался. Хочешь ещё поесть, или пойдешь учиться?',
        ['да', 'нет', 'хочуучиться!'],
        [1, 1, 0],
        1
    ], [
        'аудитория'
    ], [
        'туалет'
    ], [
        'военкомат'
    ]
];
var step = 0;

function stepTo() {
    if (step === null) {
        return;
    }
    var room = rooms[step];
    if (!room) {
        return;
    }
    var answer = document.getElementById('direction').value;
    document.getElementById('direction').value = '';
    if (!answer) {
        return;
    }
    answer = answer.toLowerCase().replace(' ', '');
    var isWayNotFound = true;
    for (var i = 0; i < room[2].length; i++) {
        if (answer === room[2][i]) {
            step = room[3][i];
            isWayNotFound = false;
            break;
        }
    }
    if (isWayNotFound) {
        step = room[4];
    }
    printRoomInfo();
}

function printRoomInfo() {
    if (step !== null && rooms[step]) {
        var room = rooms[step];
        // вывести название комнаты
        document.getElementById('roomName').innerHTML = room[0];
        // вывести описание комнаты
        document.getElementById('roomDescription').innerHTML = room[1];
        // вывести выходы из комнаты
        var exits = [];
        for (var i = 0; i < room[3].length; i++) {
            var isNameUnique = true;
            for (var j = 0; j < exits.length; j++) {
                if (exits[j] === rooms[room[3][i]][0]) {
                    isNameUnique = false;
                    break;
                }
            }
            if (isNameUnique) {
                exits.push(rooms[room[3][i]][0]);
            }
        }
        document.getElementById('exitNames').innerHTML = exits.join(', ');
    }
}

var stepToButton = document.getElementById('stepTo');
stepToButton.addEventListener('click', stepTo);

// start point
printRoomInfo();