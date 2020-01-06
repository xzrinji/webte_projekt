// arrow constructor
var Arrow = function(obj, path) {
	this.obj = obj;
	this.pos = 0;
	this.path = path;
	this.length = path.getTotalLength();
	this.speed = path.getTotalLength() / 300;
	this.box = obj.getBBox();
	this.running = false;
};
Arrow.prototype.update = function() {
	this.pos += this.speed;
	this.pos = this.pos >= this.length ? 0 : this.pos;
	this.render();
};
Arrow.prototype.pathDir = function(path) {
	// path direction
	var pt1 = path.getPointAtLength(this.pos - 2);
	var pt2 = path.getPointAtLength(this.pos + 2);
	var angle = Math.atan2(pt1.y - pt2.y, pt1.x - pt2.x) * (180 / Math.PI);
	return angle;
};
Arrow.prototype.render = function() {
	// as the arrow doesn't start at 0,0 we need to calculate its centre
	var X = +(this.box.x + (this.box.width / 2)).toFixed(1),
		 Y = +(this.box.y + (this.box.height / 2)).toFixed(1);
	// find out it's point along the path, then calculate the new X and Y positions:
	var mp = this.path.getPointAtLength(this.pos),
		tX = mp.x - X,
		tY = mp.y - Y;
	// get the rotation at the path point:
	var tR = this.pathDir(this.path) - 90; // adjusted to face the correct direction
	// apply the new attributes - note: setting X and Y on the rotate is essential if not at 0,0! 
	this.obj.setAttribute('transform', 'translate(' + tX + ', ' + tY + ') rotate(' + tR  + ' ' + X + ' ' + Y + ')');
	this.obj.setAttribute('opacity', 1);
};
// objects
var a;
var svgDoc;
var path;
var arrow;
var raf;
var interval;
var car_one,car_two,car_three,car_four;
var path_one,path_two,path_three,path_four;
var current;
window.onload=function() {
a = document.getElementById("five");
	// Get the SVG document inside the Object tag
svgDoc = a.getSVGDocument();

console.log(svgDoc);

//path_one = svgDoc.querySelector('#car_one_path');
//path_two = svgDoc.querySelector('#car_two_path');
//path_three = svgDoc.querySelector('#car_three_path');


path_one = svgDoc.querySelector('#path_hore_vlavo');
path_two = svgDoc.querySelector('#path_vpravo_vlavo');
path_three = svgDoc.querySelector('#path_dole_vpravo');
path_four = svgDoc.querySelector('#path_vlavo_vpravo');

car_one = new Arrow(svgDoc.querySelector('#car_one'), path_one);
car_two = new Arrow(svgDoc.querySelector('#car_two'), path_two);
car_three = new Arrow(svgDoc.querySelector('#car_three'), path_three);
car_four = new Arrow(svgDoc.querySelector('#car_four'), path_four);

// animator
raf, interval = NaN;
function animator(car) {
	var now = new Date().getTime(),
		dt = now - (interval || now);
	interval = now;
	raf = window.requestAnimationFrame(animator);
	current.update(dt); // update the arrow on each call
}
// buttons
function play(car) {
    window.requestAnimationFrame(animator);
    current = car
}
function pause() {
	window.cancelAnimationFrame(raf);
	interval = NaN;
}


car_one.obj.onclick = function() { play(car_one); };
car_two.obj.onclick = function() { play(car_two); };
car_three.obj.onclick = function() { play(car_three);};
car_four.obj.onclick = function() { play(car_four);};
};

