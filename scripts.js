window.addEventListener('load', event => {
    _event();
});

function _event() {
    var options = {
        strings: [
            'sites',
            'articles',
            'software'
        ],
        backDelay: 3000,
        typeSpeed: 100,
        backSpeed: 100,
        smartBackspace: false,
        loop: true
    };

    var typed = new Typed('#change_text', options);
}