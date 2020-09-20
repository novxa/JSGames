import { ball } from './ball.js';
import { platform } from './platform.js';

const canvas = document.getElementById('myCanvas');
/** @type {CanvasRenderingContext2D} */
const ctx = canvas.getContext('2d');
document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);
let leftPressed, rightPressed = false;

// Tried following but would bug out when pressing 2 keys
// function logKey(e) {
// 	switch (e.code) {
// 	case 'ArrowLeft':
// 		leftPressed = !leftPressed;
// 		break;
// 	case 'ArrowRight':
// 		rightPressed = !rightPressed;
// 		break;

// 	}
// }

function keyDown(e) {
	switch (e.code) {
	case 'ArrowLeft':
		leftPressed = true;
		break;
	case 'ArrowRight':
		rightPressed = true;
		break;

	}
}
function keyUp(e) {
	switch (e.code) {
	case 'ArrowLeft':
		leftPressed = false;
		break;
	case 'ArrowRight':
		rightPressed = false;
		break;

	}
}


function detectCollisionPlatform() {
	// check height of ball so this doesnt run every frame
	if((ball.y + (ball.radius)) >= platform.y && (ball.y + (ball.radius)) < canvas.height) {
		if(ball.x >= platform.x && ball.x <= platform.x + platform.width) {
			ball.dy = -1;
		}
	}
}
function detectCollisionBorders() {
	if((ball.x - ball.radius) <= 0 || (ball.x + ball.radius) >= canvas.width) {
		ball.dx = ball.dx == 1 ? -1 : 1;
	}
	if((ball.y - ball.radius) <= 0) {
		ball.dy = ball.dy == 1 ? -1 : 1;
	}
	else if ((ball.y + ball.radius) >= canvas.height) {
		console.log('udedlol');
	}
}


function draw() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	detectCollisionPlatform();
	detectCollisionBorders();
	ball.draw();

	if (leftPressed) {
		if (platform.x > 0) {
			platform.x -= platform.v;
		}
	}

	if(rightPressed) {
		if (platform.x + platform.width < canvas.width) {
			platform.x += platform.v;
		}
	}
	platform.draw();

}

setInterval(draw, 10);