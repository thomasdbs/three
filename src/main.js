import './main.css';
import Particle from './particle';

var canvas = document.querySelector("#canvas");
var c = canvas.getContext('2d');

var timer;
var mouseX;
var mouseY;

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

var canvasWidth = canvas.width;
var canvasHeight = canvas.height;

var maxRadius = 35;


var particles = [];

const NUM_PARTICLES = 250;

for (var i = 0; i < NUM_PARTICLES; i++) {
	var randomXCoordinate = Math.random() * canvasWidth;
	var randomYCoordinate = Math.random() * canvasHeight;
	var randomRadius = Math.random() * 5;
	particles.push(new Particle(randomXCoordinate,randomYCoordinate ,randomRadius))
}

canvas.onmousemove = function(e) {
	mouseX = e.clientX;
	mouseY = e.clientY;
}

window.addEventListener('resize', function() {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
});

const animate = () => {
	c.clearRect(0, 0, canvas.width, canvas.height);
	particles.forEach(p => {
		p.update(mouseX,mouseY,canvasWidth,canvasHeight,maxRadius);
		p.draw(c);
		p.line(p.xCoordinate,p.yCoordinate, particles,c);
	});
	requestAnimationFrame(animate);
};
animate();
