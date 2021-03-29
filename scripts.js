window.addEventListener('load', event => {
    document.querySelector('.loader').classList.add('hide');

    document.querySelector('.exit').addEventListener('click', event => {
        document.querySelector('.modal').classList.add('hide');
    });

    document.querySelector('.article-open').addEventListener('click', event => {
        document.querySelector('.modal').classList.remove('hide');
    });
});