// Slideshow simples com height ajustado antes da troca
let index = 0;
const slides = document.querySelector('.slides');
const slideshow = document.querySelector('.slideshow');
const slidesImgs = document.querySelectorAll('.slides img');
const totalSlides = slides.children.length;

function adjustSlideshowHeight(i) {
    const img = slidesImgs[i];

    if (img.complete) {
        slideshow.style.height = img.clientHeight + 'px';
    } else {
        // Remove listener antigo para evitar acúmulo
        img.onload = null;
        img.onload = () => {
            slideshow.style.height = img.clientHeight + 'px';
        }
    }
}

function showSlide() {
    index = (index + 1) % totalSlides;
    adjustSlideshowHeight(index);
    setTimeout(() => {
        slides.style.transform = `translateX(-${index * 100}%)`;
    }, 100);
}

function initSlideshow() {
    let loadedCount = 0;
    slidesImgs.forEach(img => {
        if (img.complete) loadedCount++;
        else img.onload = () => {
            loadedCount++;
            if (loadedCount === totalSlides) {
                adjustSlideshowHeight(index);
            }
        };
    });
    if (loadedCount === totalSlides) {
        adjustSlideshowHeight(index);
    }
}

initSlideshow();
setInterval(showSlide, 3000);

// Controle da música com feedback visual no botão
function toggleMusic() {
    const music = document.getElementById("bgMusic");
    const btn = document.getElementById("musicBtn");

    if (music.paused) {
        music.play();
        btn.textContent = "⏸️ Pause";
    } else {
        music.pause();
        btn.textContent = "🎵 Play";
    }
}

// Canvas dos corações
const canvasHearts = document.getElementById('hearts');
const ctxHearts = canvasHearts.getContext('2d');
let hearts = [];

function resizeCanvasHearts() {
    canvasHearts.width = window.innerWidth;
    canvasHearts.height = window.innerHeight;
}
window.addEventListener('resize', () => {
    resizeCanvasHearts();
    resizeCanvasCats();
});
resizeCanvasHearts();

function createHeart() {
    return {
        x: Math.random() * canvasHearts.width,
        y: canvasHearts.height + 10,
        size: Math.random() * 20 + 10,
        speed: Math.random() * 1 + 0.5,
        opacity: Math.random() * 0.5 + 0.5
    }
}

function drawHeart(heart) {
    ctxHearts.beginPath();
    ctxHearts.moveTo(heart.x, heart.y);
    ctxHearts.bezierCurveTo(heart.x - heart.size / 2, heart.y - heart.size / 2,
        heart.x - heart.size, heart.y + heart.size / 3,
        heart.x, heart.y + heart.size);
    ctxHearts.bezierCurveTo(heart.x + heart.size, heart.y + heart.size / 3,
        heart.x + heart.size / 2, heart.y - heart.size / 2,
        heart.x, heart.y);
    ctxHearts.fillStyle = `rgba(255, 0, 0, ${heart.opacity})`;
    ctxHearts.fill();
}

function animateHearts() {
    ctxHearts.clearRect(0, 0, canvasHearts.width, canvasHearts.height);
    hearts.forEach(heart => {
        heart.y -= heart.speed;
        drawHeart(heart);
    });
    hearts = hearts.filter(heart => heart.y + heart.size > 0);
    if (hearts.length < 50 && Math.random() < 0.07) hearts.push(createHeart()); // Limite max 50
    requestAnimationFrame(animateHearts);
}
animateHearts();

// Canvas dos gatinhos
const canvasCats = document.getElementById('cats');
const ctxCats = canvasCats.getContext('2d');
let cats = [];

function resizeCanvasCats() {
    canvasCats.width = window.innerWidth;
    canvasCats.height = window.innerHeight;
}
resizeCanvasCats();

const catImg = new Image();
catImg.src = 'img/cat-icon.png';  // coloque aqui a imagem do gatinho

function createCat() {
    return {
        x: Math.random() * canvasCats.width,
        y: canvasCats.height + 20,
        size: Math.random() * 30 + 20,
        speed: Math.random() * 1 + 0.5,
        opacity: Math.random() * 0.5 + 0.5,
    };
}

function drawCat(cat) {
    ctxCats.globalAlpha = cat.opacity;
    ctxCats.drawImage(catImg, cat.x, cat.y, cat.size, cat.size);
    ctxCats.globalAlpha = 1.0;
}

function animateCats() {
    ctxCats.clearRect(0, 0, canvasCats.width, canvasCats.height);
    cats.forEach(cat => {
        cat.y -= cat.speed;
        drawCat(cat);
    });
    cats = cats.filter(cat => cat.y + cat.size > 0);
    if (cats.length < 30 && Math.random() < 0.05) cats.push(createCat()); // Limite max 30
    requestAnimationFrame(animateCats);
}

catImg.onload = () => {
    animateCats();
};
