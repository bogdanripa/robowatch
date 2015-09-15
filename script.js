var d = 100;
var s1 = 150;
var s2 = 150;

var m1 = [100, 10];
var m2 = [m1[0]+d, m1[1]];
var del = [150, 150];
var p;

var ref = [120, 200];
var table = [35, 180];
var cwidth = 50;
var drawing = 1;
var numbers = {
    0: [
        [0,10, 0],
        [10,0,1],
        [20,0, 1],
        [30,10,1],
        [30,50, 1],
        [20,60,1],
        [10,60, 1],
        [0,50,1],
        [0,10, 1]
    ],
    1: [
        [10,10, 0],
        [20,0, 1],
        [20,60, 1]
    ],
    2: [
        [0,10, 0],
        [10,0, 1],
        [20,0, 1],
        [30,10, 1],
        [30,20,1],
        [0,60, 1],
        [30,60, 1]
    ],
    3: [
        [0,10, 0],
        [10,0, 1],
        [20,0, 1],
        [30,10, 1],
        [30,20, 1],
        [15,30, 1],
        [30,40, 1],
        [30,50, 1],
        [20,60, 1],
        [10,60, 1],
        [0,50, 1]
    ],
    4: [
        [25,60, 0],
        [25,0, 1],
        [0,40, 1],
        [30,40, 1]
    ],
    5: [
        [30,0, 0],
        [0,0, 1],
        [0,30, 1],
        [20,30, 1],
        [30,40, 1],
        [30,50, 1],
        [20,60, 1],
        [10,60, 1],
        [0,50, 1]
    ],
    6: [
        [30,10, 0],
        [20,0, 1],
        [10,0, 1],
        [0,10, 1],
        [0,50, 1],
        [10,60, 1],
        [20,60, 1],
        [30,50, 1],
        [30,40, 1],
        [20,30, 1],
        [10,30, 1],
        [0,40, 1]
    ],
    7: [
        [0,0, 0],
        [30,0, 1],
        [0,60, 1]
    ],
    8: [
        [0,10, 0],
        [10,0,1],
        [20,0, 1],
        [30,10,1],
        [30,20,1],
        [0,40,1],
        [0,50,1],
        [10,60,1],
        [20,60,1],
        [30,50,1],
        [30,40,1],
        [0,20,1],
        [0,10,1]
    ],
    9: [
        [30,20,0],
        [20,30,1],
        [10,30,1],
        [0,20,1],
        [0,10,1],
        [10,0,1],
        [20,0,1],
        [30,10,1],
        [30,50,1],
        [20,60,1],
        [10,60,1],
        [0,50,1]
    ],
    ':': [
        [15,10,0],
        [15,11,1],
        [15,49,0],
        [15,50,1]
    ],
    'x': [
        [-135, -30, 0]
    ],
    'd': [
        [50,0, 1],
        [175,0,1],
        [300,0, 1],
        [50,20,1],
        [300,40,1],
        [50,60,1],
        [165,-30,1]
    ]
};

var deleting = true;
var state = 'time';
var nn;
var idx;
var time = 'update';

var nextPoint = function() {
    if (time[nn]) {
        if (numbers[time[nn]] && numbers[time[nn]][idx]) {
            var rref = numbers[time[nn]][idx];
            drawing = rref[2];
            if ((drawing && motors[2].angle <= 0.1) || (!drawing && motors[2].angle >= 0.9)) {
                ref[0]=rref[0];
                ref[1]=rref[1];
                ref[0]+=table[0] + cwidth*(nn-1);
                ref[1]+=table[1];
                idx++;
                state = 'start';
            } else {
                if (drawing && motors[2].angle >= 0.9) {
                    state = 'down';
                } else {
                    state = 'up';
                }
            }
        } else {
            state = 'done';
        }
    } else {
        state = 'time';
    }
};

var nextNumber = function() {   
    idx = 0;
    nn++;
    if (time[nn] && time[nn] == 'd') {
        deleting = true;
    } else {
        deleting = false;
    }
    nextPoint();
};

var oldstate = state;
var oldtime = '';

var drawTime = function() {
    nn=-1;
    nextNumber();
};

var run = function() {
    
    oldstate = state;
    
    switch(state) {
        case 'start':
            state = 'draw';
            var target = getAlpha(ref);
            motors[0].setTarget(target[0]);
            motors[1].setTarget(target[1]);
            
            motors[0].setSpeed(Math.abs((target[0]-motors[0].angle)/20));
            motors[1].setSpeed(Math.abs((target[1]-motors[1].angle)/20));

            break;
        case 'draw':
            if (motors[0].status == 'stopped' && motors[1].status == 'stopped' && motors[2].status == 'stopped' ) {
                state = 'next';
            }
            break;
        case 'next':
            nextPoint();
            break;
        case 'done':
            nextNumber();
            break;
        case 'up':
            state = 'draw';

            motors[2].setTarget(1);

            break;
        case 'down':
            state = 'draw';

            motors[2].setTarget(0);

            break;
            
        case 'time':
            time = 'd' + (hour()<10?'0'+hour():hour()) + ':' + (minute()<10?'0'+minute():minute()) + 'x';
            if (time !== oldtime) {
                oldtime = time;
                drawTime();
            }
            break;
    }
};

setInterval(run, 10);

