const images = [
    "static/images/background1.jpg",
    "static/images/background2.jpg",
    "static/images/background3.jpg",
    "static/images/background4.jpg",
    "static/images/background5.jpg",
    "static/images/background6.jpg",
    "static/images/background7.jpg",
]

let currentIndex = 0;

const bg1 = document.getElementById("bg1");
const bg2 = document.getElementById("bg2");

let activeDiv = bg1;
let nextDiv = bg2;

activeDiv.style.backgroundImage = `url(${images[currentIndex]})`;
activeDiv.classList.add('active');

function changeBackground() {
    // move to next image 
    currentIndex = (currentIndex + 1) % images.length;
    nextDiv.style.backgroundImage = `url(${images[currentIndex]})`;

    // show the next div
    nextDiv.classList.add('active');
    activeDiv.classList.remove('active');

    [nextDiv, activeDiv] = [activeDiv, nextDiv];
}

setInterval(changeBackground, 10000);