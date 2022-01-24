const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");

//context styles
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
context.fillStyle = "white";
context.strokeStyle = "white";

// //mouse pointer position
const mouse = {
	x: 0,
	y: 0,
};

//reectangles
const drawFilledRectangle = () => {
	context.fillRect(mouse.x, mouse.y, 20, 20);
};

const drawStrokeRectangle = () => {
	context.strokeRect(mouse.x, mouse.y, 20, 20);
};
const rectangleEraser = () => {
	context.clearRect(mouse.x, mouse.y, 20, 20);
};

//circles
const drawFilledCircle = () => {
	context.beginPath();
	context.arc(mouse.x, mouse.y, 20, 0, 2 * Math.PI);
	context.fill();
};
const drawStrokeCircle = () => {
	context.beginPath();
	context.arc(mouse.x, mouse.y, 20, 0, 2 * Math.PI);
	context.stroke();
};

canvas.addEventListener("click", (e) => {
	mouse.x = e.x;
	mouse.y = e.y;
	updateParticles();
	move();
});
// canvas.addEventListener("mousemove", (e) => {
// 	mouse.x = e.x;
// 	mouse.y = e.y;
// 	updateParticles();
// 	move();
// });
// const animateFrame = () => {
// 	drawFilledCircle();
// 	requestAnimationFrame(animateFrame);
// };

// // animateFrame();
let hue = 0;
class Particle {
	constructor() {
		// this.x = Math.random() * canvas.width;
		// this.y = Math.random() * canvas.height;

		this.x = mouse.x + Math.random() * 20 - 10;
		this.y = mouse.y + Math.random() * 20 - 10;
		this.Vx = Math.random() * 6 - 3;
		this.Vy = Math.random() * 6 - 3;
	}
	updatePosition() {
		this.x += this.Vx;
		this.y += this.Vy;
	}
	drawCircle() {
		context.strokeStyle = `hsl(${hue},50%,50%)`;
		context.beginPath();
		context.arc(this.x, this.y, 20, 0, 2 * Math.PI);
		context.stroke();
	}
}
let i = 0;
let id;
let particles = [];
const move = () => {
	i++;
	hue++;
	context.clearRect(0, 0, canvas.width, canvas.height);
	for (let i = 0; i < particles.length; i++) {
		particles[i].updatePosition();
		particles[i].drawCircle();
		// context.beginPath();
		// context.strokeStyle = `hsl(${hue},50%,50%)`;
		// context.moveTo(particles[i].x, particles[i].y);
		// if (i == particles.length - 1)
		// 	context.lineTo(particles[0].x, particles[0].y);
		// else context.lineTo(particles[i + 1].x, particles[i + 1].y);
		// context.stroke();
		// context.closePath();
	}

	id = requestAnimationFrame(move);
	// if (i > 1000) cancelAnimationFrame(id);
};
function updateParticles() {
	cancelAnimationFrame(id);
	context.clearRect(0, 0, canvas.width, canvas.height);
	particles = [];
	for (let i = 0; i < 50; i++) {
		particles.push(new Particle());
		particles[i].drawCircle();
	}
}
