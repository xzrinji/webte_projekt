
var Car = function(obj, path, id) {
	this.obj = obj;
	this.pos = 0;
	this.path = path;
	this.length = path.getTotalLength();
	this.speed = path.getTotalLength() / 150;
	this.box = obj.getBBox();
	this.running = false;
	this.id = id;
};
Car.prototype.update = function() {
	this.pos += this.speed;

	if(this.pos >= 3/4 * this.length && this.running)
	{
		console.log("done");
		this.running = false;
	}
	this.render();
};
Car.prototype.pathDir = function(path) {
	// path direction
	var pt1 = path.getPointAtLength(this.pos - 2);
	var pt2 = path.getPointAtLength(this.pos + 2);
	var angle = Math.atan2(pt1.y - pt2.y, pt1.x - pt2.x) * (180 / Math.PI);
	return angle;
};
Car.prototype.render = function() {
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

var userInput = [];
var riesenia = [[1, 2, 3],[1,2,3],
				[1,2,3],[2,1],
				[2,3,1],[2,1,4,3],
				[2,1,4,3],[2,1,4,3],
				[3,1,2],[1,2,3],
				[3,1,2],[1,2],
				[2,1,4,3],[1,2,3],
				[1,2,3]
			];
var cars;
var score = 0;
var game = 0;
var animationFrame;

window.onload=function() {
	loadAnimation();
	
};

function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
  }


  function isEqual(a,b) 
  { 
	if(a.length!=b.length) 
	 return false; 
	else
	{ 
	 for(var i=0;i<a.length;i++) 
	 if(a[i]!=b[i]) 
	  return false; 
	  return true; 
	} 
  } 

async function loadAnimation(krizovatka) {
	await sleep(500);
	userInput = [];
	console.log("new animation");
a = document.getElementById("active");
	// Get the SVG document inside the Object tag
svgDoc = a.getSVGDocument();



path_one = svgDoc.querySelector('#path1');
path_two = svgDoc.querySelector('#path2');



car_one = new Car(svgDoc.querySelector('#car1'), path_one, 1);
car_two = new Car(svgDoc.querySelector('#car2'), path_two, 2);

var four = false;
if (svgDoc.querySelector('#car4') != null){
	
	path_four = svgDoc.querySelector('#path4');
	car_four = new Car(svgDoc.querySelector('#car4'), path_four, 4);
	path_three = svgDoc.querySelector('#path3');
	car_three = new Car(svgDoc.querySelector('#car3'), path_three, 3);
	
	cars = [car_one,car_two,car_three,car_four];
	
	
	four = true;
}else if (svgDoc.querySelector('#car3') != null)
{
	path_three = svgDoc.querySelector('#path3');
	car_three = new Car(svgDoc.querySelector('#car3'), path_three, 3);
	cars = [car_one,car_two,car_three];
}else
{
	cars = [car_one,car_two];	
}




async function checkTraffic(id)
{
	var el = document.getElementsByClassName("caption-container")[0].firstElementChild.innerHTML;
	var num = parseInt(el.slice(-2)) - 1;
	console.log(num);

	if(game >= 15)
		document.getElementById("gameover").style.display = "flex";

	if(isEqual(riesenia[num],userInput))
	{
		await sleep(2000);
		alert("Správne");
		score++;
		game++;
		document.getElementById("score").innerHTML = String(score);
	}
	
	else if(riesenia[num].length == userInput.length)
	{
		await sleep(2000);
		alert("Nesprávne");
		score--;
		game++;
		document.getElementById("score").innerHTML = String(score);
	}

	if(game >= 15)
		document.getElementById("gameover").style.display = "flex";

}

function run(current)
{
	
	var running = false; 
	for (var car of cars)
	{
		if(car.running)
		{
			running = true;
		}
	}
	if(!running){
		pause();
		play(current);
		current.running = true;
		current.running = true;
		userInput.push(current.id);
		checkTraffic(current.id);

	} 
	
}


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
		
    animationFrame  = window.requestAnimationFrame(animator);
	current = car;
}
function pause() {
	window.cancelAnimationFrame(raf);
	interval = NaN;
}



cars.forEach(function (car) {
    car.obj.onclick = function()
	{
		console.log(car.id);
		run(car);
	}
});


}
