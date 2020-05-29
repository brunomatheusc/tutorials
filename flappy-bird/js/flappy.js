function newElement(tagName, className) {
    const elem = document.createElement(tagName);
    elem.className = className;

    return elem;
}

function Barrier(reverse = false) {
    this.element = newElement('div', 'barrier');

    const border = newElement('div', 'border');
    const body= newElement('div', 'body');

    this.element.appendChild(reverse ? body : border);
    this.element.appendChild(reverse ? border : body);

    this.setHeight = height => body.style.height = `${height}px`;
}

function barriersPairs(height, open, x) {
    this.element = newElement('div', 'barriers-pair');

    this.upper = new Barrier(true);
    this.lower = new Barrier(false);

    this.element.appendChild(this.upper.element);
    this.element.appendChild(this.lower.element);

    this.drawOpening = () => {
        const topHeight = Math.random() * (height - open);
        const bottomHeight = height - open - topHeight;
        
        this.upper.setHeight(topHeight);
        this.lower.setHeight(bottomHeight);
    };

    this.getX = () => parseInt(this.element.style.left.split('px')[0]);
    this.setX = x => this.element.style.left = `${x}px`;
    this.getWidth = () => this.element.clientWidth;

    this.drawOpening();
    this.setX(x);
} 

function Barriers(height, width, open, space, pointNotification) {
    this.pairs = [ 
        new barriersPairs(height, open, width),
        new barriersPairs(height, open, width + space),
        new barriersPairs(height, open, width + space * 2),
        new barriersPairs(height, open, width + space * 3),
    ];

    const displacement = 3;
    
    this.animate = () => {
        this.pairs.forEach(pair => {
            pair.setX(pair.getX() - displacement);

            if (pair.getX() < -pair.getWidth()) {
                pair.setX(pair.getX() + space * this.pairs.length);
                pair.drawOpening();
            }

            const middle = width / 2;
            const crossMiddle = pair.getX() + displacement >= middle && pair.getX() < middle ;
            
            if (crossMiddle) pointNotification();
        });
    }
} 

function Bird(gameHeight) {
    let flying = false;

    this.element = newElement('img', 'bird');
    this.element.src = 'img/passaro.png';

    this.getY = () => parseInt(this.element.style.bottom.split('px')[0]);
    this.setY = y => this.element.style.bottom = `${y}px`;

    window.onkeydown = e => flying = true;
    window.onkeyup = e => flying = false;

    this.animate = () => {
        const newY = this.getY() + (flying ? 8 : -5);
        const maxHeight = gameHeight - this.element.clientHeight;

        if (newY <= 0) {
            this.setY(0);
        } else if (newY >= maxHeight) {
            this.setY(maxHeight);
        } else {
            this.setY(newY);
        }
    }

    this.setY(gameHeight / 2);
}

function Progress() {
    this.element = newElement('span', 'progress');
    this.updateScore = points => {
        this.element.innerHTML = points;
    }

    this.updateScore(0);
}

function isColision(elementA, elementB) {
    const a = elementA.getBoundingClientRect();
    const b = elementB.getBoundingClientRect();

    const horizontal = ((a.left + a.width >= b.left) && (b.left + b.width >= a.left));
    const vertical = ((a.top + a.height >= b.top) && (b.top + b.height >= a.top));

    return horizontal && vertical;
}

function detectColision(bird, barriers) {
    let colision = false;

    barriers.pairs.forEach(barrierPair => {
        if (!colision) {
            const upper = barrierPair.upper.element;
            const lower = barrierPair.lower.element;

            colision = isColision(bird.element, upper) || isColision(bird.element, lower);
        }
    });

    return colision;
}

function FlappyBird() {
    let points = 0;

    const gameArea = document.querySelector('#app');
    const width = gameArea.clientWidth;
    const height = gameArea.clientHeight;

    const progress = new Progress();
    const barriers = new Barriers(height, width, 200, 400, () => progress.updateScore(++points));
    const bird = new Bird(height);

    gameArea.appendChild(progress.element);
    gameArea.appendChild(bird.element);

    barriers.pairs.forEach(pair => gameArea.appendChild(pair.element));

    this.start = () => {
        const timer = setInterval(() => {
            barriers.animate();
            bird.animate();
        
            if (detectColision(bird, barriers)) {
                clearInterval(timer);
            }
        }, 20);
    }
}

new FlappyBird().start();

// const barriers = new Barriers(500, 700, 200, 400);
// const bird = new Bird(490);
// const progress = new Progress();
// const gameArea = document.querySelector('#app');

// gameArea.appendChild(bird.element);
// gameArea.appendChild(progress.element);
// barriers.pairs.forEach(pair => gameArea.appendChild(pair.element));

// setInterval(() => {
//     barriers.animate();
//     bird.animate();
// }, 20);