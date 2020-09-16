window.addEventListener('load', event => {
    _event();
});

function _event() {
    var options = {
        strings: [
            'sites.',
            'articles.',
            'software.'
        ],
        backDelay: 3000,
        typeSpeed: 100,
        backSpeed: 100,
        smartBackspace: false,
        loop: true
    };
    var typed = new Typed('#change_text', options);

    document.getElementById('darkmode').addEventListener('change', event => {
        document.getElementsByTagName('body').item(0).classList.toggle('dark-mode');
        if(document.getElementById('darkmode').checked == true) {
            document.getElementById('toggle_text').innerText = "It's too dark!";
        } else {
            document.getElementById('toggle_text').innerText = "It's kinda bright!";
        }
    });
}