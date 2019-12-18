var rovno = "m294.5,401.359375l-0.5,-521.359375";
var vlavo = "M 294.5,401.35937 V 262.03552 c 0,0 20.64057,-100.10676 -85.65837,-99.07473 -106.29893,1.03203 -520.14235,0 -520.14235,0";
var vpravo = "M 296.02224,399.09026 V 259.76641 c 0,0 -20.64056,-100.10676 85.65837,-99.07473 106.29894,1.03203 520.14236,0 520.14236,0";

var vlavo_car = new Motion($(".car"), {
	path: vlavo
});
var vpravo_car = new Motion($(".car"), {
	path: vpravo
});
var rovno_car = new Motion($(".car"), {
	path: rovno
});

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

/////// Prikaz Krizovatkov //////////////

var slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("demo");
  var captionText = document.getElementById("caption");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
  captionText.innerHTML = dots[slideIndex-1].alt;
}












