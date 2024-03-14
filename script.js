const screens = document.querySelectorAll('.screen');
const choose_insect_btns = document.querySelectorAll('.choose-insect-btn');
const quit_btn = document.getElementById('quit-btn');
const start_btn = document.getElementById('start-btn')
const game_container = document.getElementById('game-container')
const timeEl = document.getElementById('time');
const scoreEl = document.getElementById('score');
const message = document.getElementById('message');
const mosquitoSound = document.getElementById('mosquitoSound');
const flySound = document.getElementById('flySound');
const cockroachSound = document.getElementById('cockroachSound');
const spiderSound = document.getElementById('spiderSound');

let seconds = 0;
let score = 0;
let selected_insect = {};
let gameInterval;

start_btn.addEventListener('click', () => {
    screens[0].classList.add('up');
    quit_btn.classList.add('visible'); 
});

quit_btn.addEventListener('click', () => {
    screens[1].classList.remove('up');
    resetGame(); 
    stopSounds();
});

function resetGame() {

    seconds = 0;
    score = 0;
    selected_insect = {};

    timeEl.innerHTML = 'Time: 00:00';
    scoreEl.innerHTML = 'Score: 0';
    message.classList.remove('visible');

    const insects = document.querySelectorAll('.insect');
    insects.forEach(insect => insect.remove());

    quit_btn.classList.remove('visible');
}

choose_insect_btns.forEach(btn => {
    btn.addEventListener('click', () => {
        const insectType = btn.querySelector('p').textContent.toLowerCase();
        switch (insectType) {
            case 'mosquito':
                playMosquitoSound();
                break;
            case 'fly':
                playFlySound();
                break;
            case 'roach':
                playCockroachSound();
                break;
            case 'spider':
                playSpiderSound();
                break;
        }
        const img = btn.querySelector('img');
        const src = img.getAttribute('src');
        const alt = img.getAttribute('alt');
        selected_insect = { src, alt };
        screens[1].classList.add('up');
        setTimeout(createInsect, 1000);
        startGame();
    });
});

function startGame() {
    gameInterval = setInterval(increaseTime, 1000);
}

function increaseTime() {
    if (seconds >= 120) { 
        endGame(); 
        return;
    }
    let m = Math.floor(seconds / 60);
    let s = seconds % 60;
    m = m < 10 ? `0${m}` : m;
    s = s < 10 ? `0${s}` : s;
    timeEl.innerHTML = `Time: ${m}:${s}`;
    seconds++;
}

function endGame() {
    screens[1].classList.remove('up'); 
    resetGame(); 
    stopSounds();
}

function createInsect() {
    const insect = document.createElement('div')
    insect.classList.add('insect')
    const { x, y } = getRandomLocation()
    insect.style.top = `${y}px`
    insect.style.left = `${x}px`
    insect.innerHTML = `<img src="${selected_insect.src}" alt="${selected_insect.alt}" style="transform: rotate(${Math.random() * 360}deg)" />`

    insect.addEventListener('click', catchInsect)

    game_container.appendChild(insect)
}

function getRandomLocation() {
    const width = window.innerWidth
    const height = window.innerHeight
    const x = Math.random() * (width - 200) + 100
    const y = Math.random() * (height - 200) + 100
    return { x, y }
}

function catchInsect() {
    increaseScore()
    this.classList.add('caught')
    setTimeout(() => this.remove(), 2000)
    addInsects()
}

function addInsects() {
    setTimeout(createInsect, 1000)
    setTimeout(createInsect, 1500)
}

function increaseScore() {
    score++
    if(score > 19) {
        message.classList.add('visible')
    }
    scoreEl.innerHTML = `Score: ${score}`
}

function playMosquitoSound() {
    mosquitoSound.play();
}

function playFlySound() {
    flySound.play();
}

function playCockroachSound() {
    cockroachSound.play();
}

function playSpiderSound() {
    spiderSound.play();
}

function stopSounds() {
    mosquitoSound.pause();
    mosquitoSound.currentTime = 0;
    flySound.pause();
    flySound.currentTime = 0;
    cockroachSound.pause();
    cockroachSound.currentTime = 0;
    spiderSound.pause();
    spiderSound.currentTime = 0;
}
