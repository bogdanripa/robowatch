function Motor(angle, speed) {
    this.angle = angle;
    this.targetAngle = angle;
    this.speed = speed;
    this.status = 'stopped';
}

Motor.prototype.setSpeed = function(speed) {
    this.speed = speed;
}

Motor.prototype.setTarget = function(targetAngle) {
    this.targetAngle = targetAngle;
}

var motors = [];
motors[0] = new Motor(Math.PI/1.38, 0);
motors[1] = new Motor(Math.PI/1.38, 0);
motors[2] = new Motor(0, 0.05);

var moveMotors = function() {
    for (var i=0;i<motors.length;i++) {
        if (motors[i].angle < motors[i].targetAngle) {
            motors[i].angle += motors[i].speed;
            if (motors[i].angle>motors[i].targetAngle) {
                motors[i].angle=motors[i].targetAngle;
                motors[i].status = 'stopped';
            } else {
                motors[i].status = 'running';
            }
        } else {
            motors[i].angle -= motors[i].speed;
            if (motors[i].angle<motors[i].targetAngle) {
                motors[i].angle=motors[i].targetAngle;
                motors[i].status = 'stopped';
            } else {
                motors[i].status = 'running';
            }
        }
    }
};

setInterval(moveMotors, 5);
