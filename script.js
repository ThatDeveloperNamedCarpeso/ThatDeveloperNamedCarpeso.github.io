const source = 'https://raw.githubusercontent.com/ThatDeveloperNamedCarpeso/content-repo/master/posts';
const create_post = (date, title, excerpt, id) => {
    let post = document.createElement('div'),
    postDate = document.createElement('div'),
    postDescriptor = document.createElement('div'),
    postTitle = document.createElement('span'),
    postExcerpt = document.createElement('span'),
    postLink = document.createElement('a');

    post.className = 'post';
    postDate.className = 'post-date';
    postDescriptor.className = 'post-descriptor';
    postTitle.className = 'post-title';
    postExcerpt.className = 'post-excerpt';
    postLink.className = 'post-link';

    postDate.appendChild(document.createTextNode(date));
    postTitle.appendChild(document.createTextNode(title));
    postExcerpt.appendChild(document.createTextNode(excerpt));
    postLink.append("Read More...");
    postLink.href = `page.html?id=${id}`;

    postDescriptor.append(postTitle, postExcerpt, postLink);
    post.append(postDate, postDescriptor);

    return post;
}
const fetch_data = url => {
    return(fetch(url).then(res => res.json()));
}
window.addEventListener('load', event => {
    fetch_data(source)
    .then(data => {
        document.getElementById('posts').innerHTML = '';
        data.forEach(e => {
            let appendable = create_post(e.date, e.title, e.excerpt, e.id);
            document.getElementById('posts').appendChild(appendable);
        });
    });
    for (let index = 0; index < document.getElementsByClassName('post-link').length; index++) {
        const element = document.getElementsByClassName('post-link').item(index);
        element.addEventListener('click', event => {
            event.preventDefault();
        });
    }
});

if(!window.indexedDB) {
    console.log("Your browser doesn't support a stable version of IndexedDB. Such and such feature will not be available.");
}
var db = window.indexedDB.open('ContentDB', 3);
