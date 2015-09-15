$(function() {
	$('body').append('<canvas id="_s2" width="400" height="400" style="position: absolute; top:0; left:0;"></canvas>');
	$('body').append('<canvas id="_s1" width="400" height="400" style="position: absolute; top:0; left:0;"></canvas>');
	useCanvas('s1');

	setInterval(drawOne, 10);
});

function useCanvas(cn) {
	window._canvas = document.getElementById("_"+cn);
	window._ctx = window._canvas.getContext("2d");
}

function background(r, g, b) {
	window._ctx.clearRect(0,0,window._canvas.width,window._canvas.height);

	window._ctx.fillStyle="rgba("+r+','+g+','+b+", "+0+")";
	window._ctx.rect(0,0,window._canvas.width,window._canvas.height);
	window._ctx.fill();
}

function stroke(r, g, b) {
	window._ctx.strokeStyle = "rgb("+r+','+g+','+b+")";
}

function fill(r, g, b) {
	window._ctx.fillStyle = "rgb("+r+','+g+','+b+")";
}

function ellipse(x1, y1, w, h) {
	window._ctx.beginPath();
	window._ctx.ellipse(x1, y1, w, h, 0, 0, 2 * Math.PI);
	window._ctx.closePath();
	window._ctx.stroke();
	window._ctx.fill();
}

function line(x1, y1, x2, y2) {
	window._ctx.beginPath();
	window._ctx.moveTo(x1, y1);
	window._ctx.lineTo(x2, y2);
	window._ctx.stroke();
}

function hour() {
	var d = new Date();
	return d.getHours();
}

function minute() {
	var d = new Date();
	return d.getMinutes();
}

function println(v) {
	console.log(v);
}

