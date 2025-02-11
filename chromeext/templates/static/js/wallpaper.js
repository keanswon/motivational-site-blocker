const images = [
    "static/images/background1.jpg",
    "static/images/background2.jpg",
    "static/images/background3.jpg",
    "static/images/background4.jpg",
    "static/images/background5.jpg",
    "static/images/background6.jpg",
    "static/images/background7.jpg",
    "static/images/background8.jpg",
    "static/images/background9.jpg",
    "static/images/background10.jpg",
    "static/images/background11.jpg",
]

// randomly pick images to go next
let currentIndex = Math.floor(Math.random() * images.length);

const bg1 = document.getElementById("bg1");
const bg2 = document.getElementById("bg2");

let activeDiv = bg1;
let nextDiv = bg2;

activeDiv.style.backgroundImage = `url(${images[currentIndex]})`;
activeDiv.classList.add('active');

function changeBackground() {
    // move to next image
    nextImage = Math.floor(Math.random() * (images.length - 1)) + 1;
    currentIndex = (currentIndex + nextImage) % images.length;
    nextDiv.style.backgroundImage = `url(${images[currentIndex]})`;

    // show the next div
    nextDiv.classList.add('active');
    activeDiv.classList.remove('active');

    [nextDiv, activeDiv] = [activeDiv, nextDiv];
}

setInterval(changeBackground, 10000);