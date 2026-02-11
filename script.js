const canvas = document.getElementById("heart");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let hearts = [];

class Heart {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = canvas.height + 20;
        this.size = Math.random() * 20 + 10;
        this.speed = Math.random() * 2 + 1;
        this.opacity = 1;
    }

    draw() {
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = "red";
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.bezierCurveTo(
            this.x - this.size, this.y - this.size,
            this.x - this.size * 2, this.y + this.size / 3,
            this.x, this.y + this.size
        );
        ctx.bezierCurveTo(
            this.x + this.size * 2, this.y + this.size / 3,
            this.x + this.size, this.y - this.size,
            this.x, this.y
        );
        ctx.fill();
        ctx.globalAlpha = 1;
    }

    update() {
        this.y -= this.speed;
        this.opacity -= 0.005;
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (Math.random() < 0.05) {
        hearts.push(new Heart());
    }

    hearts.forEach((heart, index) => {
        heart.update();
        heart.draw();

        if (heart.opacity <= 0) {
            hearts.splice(index, 1);
        }
    });

    requestAnimationFrame(animate);
}

animate();

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
