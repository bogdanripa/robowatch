var angle = function(d12, d13, d23) {
    return Math.acos((d13*d13 + d23*d23 - d12*d12) / (2*d23*d13));
};

var lineLength = function(p1, p2) {
    return Math.sqrt((p2[0]-p1[0])*(p2[0]-p1[0])+(p2[1]-p1[1])*(p2[1]-p1[1]));
};

var getLineFor = function(l1, l2, alpha) {
    return Math.sqrt(l1*l1+l2*l2-2*l1*l2*Math.cos(alpha));
};

var getAngleFor = function(p, m1, m2) {
    var a = lineLength(m1, p);
    var b = lineLength(m2, p);

    if (a > s1+s2 || b > s1+s2) {
        return;
    }

    var alpha = angle(b, a, d) + angle(s2, s1, a);
    var alphap = angle(a, b, d) + angle(s2, s1, b);
    
    return [alpha, alphap];
};

var getAlpha = function(p) {
    var PM1 = lineLength(m1, p);
    var PM2 = lineLength(m2, p);
    
    var alpha = angle(PM2, PM1, d);
    var beta = angle(s2, s1, PM1);

    var alphap = angle(PM1, PM2, d);
    var betap = angle(s2, s1, PM2);
    return [alpha+beta, alphap+betap];
};

var drawOne = function() {
    background(255, 255, 255);

    stroke(0, 0, 0);
    ellipse(m1[0], m1[1], 10, 10);
    ellipse(m2[0], m2[1], 10, 10);

    var e = s1 * Math.cos(Math.PI - motors[0].angle);
    var f = s1 * Math.sin(Math.PI - motors[0].angle);
    var ep = s1 * Math.cos(Math.PI - motors[1].angle);
    var fp = s1 * Math.sin(Math.PI - motors[1].angle);
    var n1 = [m1[0]-e, m1[1]+f];
    var n2 = [m2[0]+ep, m2[1]+fp];

    stroke(0, 0, parseInt(255-(motors[2].angle*255)));
    line(m1[0], m1[1], n1[0], n1[1]);
    line(m2[0], m2[1], n2[0], n2[1]);
    
    var M1N2 = getLineFor(d, s1, motors[1].angle);
    var N2M1M2 = angle(s1, d, M1N2);
    var N1M1N2 = motors[0].angle - N2M1M2;
    var N1N2 = getLineFor(s1, M1N2, N1M1N2);
    var M1N1N2 = angle(M1N2, s1, N1N2);
    var PN1N2 = angle(s2, s2, N1N2);
    var PN1M1 = M1N1N2 + PN1N2;
    var PM1 = getLineFor(s1, s2, PN1M1);
    var PM1N1 = angle(s2, s1, PM1);
    var PM1M2 = motors[0].angle - PM1N1;
    
    var h  = PM1 * Math.sin(PM1M2);
    var dx = PM1 * Math.cos(PM1M2);
    
    p = [m1[0]+dx, m1[1]+h];
    
    if(Math.abs(1 - lineLength(p, n2) / s2) > 0.1) {
        return false;
    }

    line(n1[0], n1[1], p[0], p[1]);
    line(n2[0], n2[1], p[0], p[1]);

    if (deleting) {
        del[0] = p[0];
        del[1] = p[1];
    }
    stroke(0, 255, 0);
    ellipse(del[0], del[1], 20, 20);

    if (drawing) {
        useCanvas('s2');
    }

    if (deleting) {
        stroke(255,240,240);
        fill(255,240,240);
        ellipse(del[0], del[1], 20, 20);
    } else {
        stroke(255, 0, 0);
        fill(255,0,0);
        ellipse(p[0], p[1], 5, 5);
    }

    if (drawing) {
        useCanvas('s1');
    }
    
    return true;
};
