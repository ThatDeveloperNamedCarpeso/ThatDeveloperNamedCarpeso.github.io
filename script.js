const btn = document.getElementById('switch');
const body = document.getElementsByTagName('body');
const image = document.getElementById('image_url');
const secretbtn = document.getElementById('secretButton');
const image_github = document.getElementById('image_url_github');
const businesscard = document.getElementById('b-box');

let src = true;

btn.addEventListener('click', (event) => {
    event.preventDefault();
    btn.classList.toggle("toggle-on");
    body.item(0).classList.toggle('night-mode');
    businesscard.classList.toggle('night-mode-box');
    if(src) {
        image.src = "./assets/php_white.png";
        image_github.src = "./assets/github-logo_white.png";
    } else {
        image.src = "./assets/php.png";
        image_github.src = "./assets/github-logo.png"
    }
    src = !src;

    secretbtn.classList.toggle('display-secret');
});