
const NAME = "Marjona";

const pages = [
    {
        title: `Aziz ${NAME}!`,
        symbol: "💌",
        decor: ["✦", "✧", "♡"],
        colors: ["#ffc1dc", "#ffdfb0", "#ffffff"],
        text: `Bugun oddiy kun emas...

Bugun dunyoga yana bir go‘zal tabassum kelgan kun.

Ushbu kichik maktub sening kuningga ozgina bo‘lsa ham quvonch olib kelsin.`
    },
    {
        title: "Yulduzlar senga atalgan",
        symbol: "🌙",
        decor: ["✦", "✧", "⋆"],
        colors: ["#ffffff", "#9ebdff", "#c2abff"],
        text: `Osmondagi yulduzlar kabi orzularing ham cheksiz bo‘lsin.

Hayotingning har bir yangi kuni senga baxt, omad va go‘zal imkoniyatlar olib kelsin.`
    },
    {
        title: "Go‘zal tabassum",
        symbol: "🌸",
        decor: ["🌸", "🌷", "🦋"],
        colors: ["#ffb7d4", "#ffd5e5", "#ffffff"],
        text: `Yuzingdan tabassum hech qachon arimasin.

Qalbing bahordek beg‘ubor, kunlaring esa gullardek rang-barang bo‘lsin.

Doimo o‘zingga ishongan holda yashagin.`
    },
    {
        title: "Eng go‘zal orzular",
        symbol: "🏮",
        decor: ["🏮", "✦", "✨"],
        colors: ["#ffce73", "#ff9a55", "#ffe9ba"],
        text: `Hatto hech kimga aytmagan eng kichik orzularing ham amalga oshsin.

Oldingda seni ajoyib imkoniyatlar va unutilmas lahzalar kutib tursin.`
    },
    {
        title: "Baxtli lahzalar",
        symbol: "💎",
        decor: ["✧", "💎", "✦"],
        colors: ["#7fffd4", "#7ce1ff", "#ffffff"],
        text: `Hayoting samimiy insonlar, go‘zal xotiralar va quvonchli kunlarga boy bo‘lsin.

Har bir yangi tong sen uchun yaxshilik olib kelsin.

Baxt doimo hamrohing bo‘lsin!`
    },
    {
        title: `${NAME.toUpperCase()}!`,
        symbol: "🎂",
        decor: ["🎉", "✦", "✨"],
        colors: ["#ffd700", "#ff83c6", "#c8a2ff"],
        text: `TUG‘ILGAN KUNING BILAN!

Yangi yoshing hayotingning eng go‘zal sahifalaridan biri bo‘lsin.

Barcha ezgu tilaklaring amalga oshsin.

Bugun sening bayraming!`
    }
];

const intro = document.getElementById("intro");
const book = document.getElementById("book");
const page = document.getElementById("page");

const openBtn = document.getElementById("openBtn");
const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");

const message = document.getElementById("message");
const decoration = document.getElementById("decoration");

const music = document.getElementById("music");
const musicBtn = document.getElementById("musicBtn");

let currentPage = 0;
let typingTimer;
let celebration = false;
let opened = false;

const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
).matches;

/* MUSIQA */

async function toggleMusic() {
    if (music.paused) {
        try {
            await music.play();
            musicBtn.classList.add("playing");
            musicBtn.textContent = "♫";
            musicBtn.setAttribute("aria-label", "Musiqani o‘chirish");
        } catch {
            alert("Papka ichiga music.mp3 faylini joylashtiring.");
        }
    } else {
        music.pause();
        musicBtn.classList.remove("playing");
        musicBtn.textContent = "♪";
        musicBtn.setAttribute("aria-label", "Musiqani yoqish");
    }
}

musicBtn.addEventListener("click", toggleMusic);

/* KONVERTNI OCHISH */

openBtn.addEventListener("click", () => {
    if (opened) return;

    opened = true;
    openBtn.classList.add("open");
    openBtn.disabled = true;

    music.play().then(() => {
        musicBtn.classList.add("playing");
    }).catch(() => {});

    setTimeout(() => {
        intro.hidden = true;
        book.hidden = false;

        showPage(0);
    }, reducedMotion ? 0 : 1250);
});

/* HARFLARNING ASTA YOZILISHI */

function typeText(text) {
    clearInterval(typingTimer);
    message.textContent = "";

    if (reducedMotion) {
        message.textContent = text;
        return;
    }

    const letters = Array.from(text);
    let index = 0;

    typingTimer = setInterval(() => {
        message.textContent += letters[index];
        index++;

        if (index >= letters.length) {
            clearInterval(typingTimer);
        }
    }, 24);
}

message.addEventListener("click", () => {
    clearInterval(typingTimer);
    message.textContent = pages[currentPage].text;
});

/* SAHIFALARNI ALMASHTIRISH */

function showPage(index) {
    currentPage = index;

    const data = pages[index];

    document.body.dataset.theme = index;

    document.getElementById("pageNumber").textContent =
        `SAHIFA ${index + 1} / ${pages.length}`;

    document.getElementById("pageTitle").textContent =
        data.title;

    document.getElementById("symbol").textContent =
        data.symbol;

    page.classList.remove("enter");
    void page.offsetWidth;
    page.classList.add("enter");

    typeText(data.text);
    createDecorations(data.decor);
    createDots();

    prevBtn.disabled = index === 0;

    nextBtn.textContent =
        index === pages.length - 1
        ? "Qayta boshlash ↻"
        : "Keyingi sahifa →";

    celebration = index === pages.length - 1;

    if (celebration && !reducedMotion) {
        launchFireworks();
    }
}

nextBtn.addEventListener("click", () => {
    if (currentPage < pages.length - 1) {
        showPage(currentPage + 1);
    } else {
        showPage(0);
    }
});

prevBtn.addEventListener("click", () => {
    if (currentPage > 0) {
        showPage(currentPage - 1);
    }
});

/* SAHIFA INDIKATORLARI */

function createDots() {
    const dots = document.getElementById("dots");

    dots.innerHTML = "";

    pages.forEach((item, index) => {
        const dot = document.createElement("span");

        dot.className = index === currentPage
            ? "dot active"
            : "dot";

        dots.appendChild(dot);
    });
}

/* HAR BIR SAHIFADA TURLI BEZAKLAR */

function createDecorations(symbols) {
    decoration.innerHTML = "";

    if (reducedMotion) return;

    for (let i = 0; i < 22; i++) {
        const item = document.createElement("span");

        item.className = "floating-item";

        item.textContent =
            symbols[Math.floor(Math.random() * symbols.length)];

        item.style.left = Math.random() * 100 + "%";
        item.style.fontSize = 12 + Math.random() * 25 + "px";

        item.style.animationDuration =
            9 + Math.random() * 13 + "s";

        item.style.animationDelay =
            -Math.random() * 20 + "s";

        decoration.appendChild(item);
    }
}

/* CANVAS ANIMATSIYALARI */

const canvas = document.getElementById("effects");
const ctx = canvas.getContext("2d");

let width;
let height;
let stars = [];
let particles = [];
let meteors = [];

function resize() {
    width = window.innerWidth;
    height = window.innerHeight;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    canvas.width = width * dpr;
    canvas.height = height * dpr;

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    stars = Array.from({ length: 140 }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.8 + .3,
        phase: Math.random() * Math.PI * 2
    }));
}

window.addEventListener("resize", resize);
resize();

/* UCHAYOTGAN YULDUZLAR */

function createMeteor() {
    meteors.push({
        x: Math.random() * width,
        y: Math.random() * height * .4,
        vx: -6,
        vy: 4,
        life: 1
    });
}

/* MUSH AKBOZLIK EFFEKTI */

function explode(x, y) {
    const colors = pages[5].colors;

    const color =
        colors[Math.floor(Math.random() * colors.length)];

    for (let i = 0; i < 85; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 1 + Math.random() * 5;

        particles.push({
            x,
            y,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            life: 1,
            color,
            size: Math.random() * 2.2 + .7
        });
    }
}

function launchFireworks() {
    for (let i = 0; i < 4; i++) {
        setTimeout(() => {
            if (!celebration) return;

            explode(
                width * (.1 + Math.random() * .8),
                height * (.08 + Math.random() * .55)
            );
        }, i * 260);
    }
}

setInterval(() => {
    if (celebration && !reducedMotion) {
        launchFireworks();
    }
}, 2400);

setInterval(() => {
    if (currentPage === 1 && opened && !reducedMotion) {
        createMeteor();
    }
}, 1800);

/* ASOSIY ANIMATSIYA */

function animate(time) {
    ctx.clearRect(0, 0, width, height);

    const colors = pages[currentPage].colors;

    stars.forEach((star, i) => {
        ctx.globalAlpha = reducedMotion
            ? .7
            : .5 + Math.sin(time * .002 + star.phase) * .45;

        ctx.fillStyle = colors[i % colors.length];

        ctx.beginPath();
        ctx.arc(
            star.x,
            star.y,
            star.radius,
            0,
            Math.PI * 2
        );
        ctx.fill();
    });

    meteors = meteors.filter(m => m.life > 0);

    meteors.forEach(m => {
        m.x += m.vx;
        m.y += m.vy;
        m.life -= .015;

        ctx.globalAlpha = Math.max(0, m.life);

        const gradient = ctx.createLinearGradient(
            m.x, m.y,
            m.x + 100, m.y - 65
        );

        gradient.addColorStop(0, "#ffffff");
        gradient.addColorStop(1, "#ffffff00");

        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2;

        ctx.beginPath();
        ctx.moveTo(m.x, m.y);
        ctx.lineTo(m.x + 100, m.y - 65);
        ctx.stroke();
    });

    particles = particles.filter(p => p.life > 0);

    particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;

        p.vy += .035;
        p.vx *= .99;
        p.life -= .011;

        ctx.globalAlpha = Math.max(0, p.life);
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 10;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
    });

    ctx.globalAlpha = 1;
    ctx.shadowBlur = 0;

    if (!reducedMotion) {
        requestAnimationFrame(animate);
    }
}

requestAnimationFrame(animate);
