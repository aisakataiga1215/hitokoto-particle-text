const canvas = document.getElementById("particleCanvas");
const ctx = canvas.getContext("2d");
const hitokotoTextDiv = document.getElementById("hitokoto_text");
const hintText = document.getElementById("hint_text");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];
let text = "加载中...";
let isParticlesVisible = true; // 控制粒子和文本切换
let mouseRadius = Math.min(canvas.width, canvas.height) / 8;
let mouse = { x: null, y: null };

window.addEventListener("mousemove", (event) => {
    mouse.x = event.x;
    mouse.y = event.y;
});

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // 重新计算 mouseRadius，使其适应新的屏幕尺寸
    mouseRadius = Math.min(canvas.width, canvas.height) / 8;

    if (isParticlesVisible) createTextParticles();
});

window.addEventListener("click", () => {
    if (isParticlesVisible) {
        fadeOutParticles(() => fadeInText());
    } else {
        fadeOutText(() => fadeInParticles());
    }
    isParticlesVisible = !isParticlesVisible;
});

class Particle {
    constructor(x, y, text) {
        this.x = x;
        this.y = y;
        this.baseX = x;
        this.baseY = y;
        this.text = text;
        this.speedX = 0;
        this.speedY = 0;
        this.fontSize = Math.min(canvas.width, canvas.height) /60;
    }

    update() {
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < mouseRadius) {
            let angle = Math.atan2(dy, dx);
            let force = (mouseRadius - distance) / mouseRadius;
            let forceX = Math.cos(angle) * force * 10;
            let forceY = Math.sin(angle) * force * 10;

            this.speedX -= forceX;
            this.speedY -= forceY;
        }

        this.speedX *= 0.9;
        this.speedY *= 0.9;

        this.x += this.speedX;
        this.y += this.speedY;

        let homeDX = this.baseX - this.x;
        let homeDY = this.baseY - this.y;
        this.speedX += homeDX * 0.05;
        this.speedY += homeDY * 0.05;
    }

    draw() {
        ctx.fillStyle = "white";
        ctx.font = `${this.fontSize}px Arial`;
        ctx.fillText(this.text, this.x, this.y);
    }
}

function createTextParticles() {
    particles = [];
    let tempCanvas = document.createElement("canvas");
    let tempCtx = tempCanvas.getContext("2d");

    tempCanvas.width = canvas.width;
    tempCanvas.height = canvas.height;

    let fontSize = Math.min(canvas.width, canvas.height) / 8; // 根据画布大小动态计算字体大小
    tempCtx.fillStyle = "white";
    tempCtx.font = `${fontSize}px Arial`;
    tempCtx.textAlign = "center";
    tempCtx.textBaseline = "middle";

    let maxWidth = canvas.width * 0.8;
    let breakChars = ['，', '。', '！', '？', '；', '、', '”'];
    let lines = [];
    let line = '';
    let lineHeight = fontSize + 20;

    for (let char of text) {
        let testLine = line + char;
        let testWidth = tempCtx.measureText(testLine).width;

        if (testWidth > maxWidth && line) {
            let lastBreakIndex = -1;
            for (let breakChar of breakChars) {
                let index = line.lastIndexOf(breakChar);
                if (index > lastBreakIndex) {
                    lastBreakIndex = index;
                }
            }

            if (lastBreakIndex !== -1) {
                lines.push(line.slice(0, lastBreakIndex + 1));
                line = line.slice(lastBreakIndex + 1) + char;
            } else {
                lines.push(line);
                line = char;
            }
        } else {
            line = testLine;
        }
    }
    lines.push(line);

    let totalHeight = lines.length * lineHeight;
    let startY = (canvas.height - totalHeight) / 2;

    lines.forEach((line, index) => {
        tempCtx.fillText(line, canvas.width / 2, startY + (index * lineHeight));
    });

    let imageData = tempCtx.getImageData(0, 0, tempCanvas.width, tempCanvas.height).data;
    let gap = Math.max(3, Math.floor(Math.min(canvas.width, canvas.height) / 150));

    for (let y = 0; y < tempCanvas.height; y += gap) {
        for (let x = 0; x < tempCanvas.width; x += gap) {
            let index = (y * tempCanvas.width + x) * 4;
            if (imageData[index + 3] > 128) {
                let charIndex = (x / gap + y / gap) % text.length;
                particles.push(new Particle(x, y, text[charIndex]));
            }
        }
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let particle of particles) {
        particle.update();
        particle.draw();
    }
    requestAnimationFrame(animate);
}

async function fetchHitokoto() {
    try {
        const response = await fetch('https://v1.hitokoto.cn');
        const data = await response.json();
        text = data.hitokoto;
        hitokotoTextDiv.textContent = text;
        createTextParticles();
    } catch (error) {
        console.error("获取一言失败:", error);
        text = "获取失败，请重试";
        createTextParticles();
    }
}

function fadeOutParticles(callback) {
    hintText.style.opacity = 0;
    setTimeout(() => {
        particles = [];
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        callback();
    }, 500);
}

function fadeInText() {
    hitokotoTextDiv.style.opacity = 1;
}

function fadeOutText(callback) {
    hitokotoTextDiv.style.opacity = 0;
    setTimeout(callback, 500);
}

function fadeInParticles() {
    hintText.style.opacity = 1;
    createTextParticles();
}

fetchHitokoto();
createTextParticles();
animate();