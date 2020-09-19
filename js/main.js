
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
    ], 'аудитория', 'туалет', 'военкомат'
];
var step = 0;

while (1) {
    if (step === null) {
        break;
    }
    var room = rooms[step];
    if (!room) {
        break;
    }
    var answer = prompt(room[1]);
    if (!answer) {
        continue;
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
}
