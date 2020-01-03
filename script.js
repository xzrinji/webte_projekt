var rovno = "m294.5,401.359375l-0.5,-521.359375";
var vlavo = "M 294.5,401.35937 V 262.03552 c 0,0 20.64057,-100.10676 -85.65837,-99.07473 -106.29893,1.03203 -520.14235,0 -520.14235,0";
var vpravo = "M 296.02224,399.09026 V 259.76641 c 0,0 -20.64056,-100.10676 85.65837,-99.07473 106.29894,1.03203 520.14236,0 520.14236,0";

car_down = "#path176";
var vlavo_car = new Motion($(car_down), {
	path: vlavo
});
/*var vpravo_car = new Motion($(car_down), {
	path: vpravo
});
var rovno_car = new Motion($("car_down), {
	path: rovno
});
*/

var vlavo = function(){
	vlavo_car.to(1, {duration:5000,easing:'swing'})

};

var stoj = function(){
	vlavo_car.to(0, {duration:5000,easing:'swing'})

};

var vpravo = function(){
	vpravo_car.to(1, {duration:5000,easing:'swing'})

};

var rovno = function(){
	rovno_car.to(1, {duration:5000,easing:'swing'})

};

$(function(){




	stoj();





});

function move()
{
	vpravo();
}
