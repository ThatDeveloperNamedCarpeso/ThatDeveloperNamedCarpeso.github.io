window.addEventListener('load', (event) => {
    // Javascript Code here!
    fetch('content.json')
    .then(response => response.json())
    .then(data => {
        data.blog.forEach(element => {
            createPost(element.title, element.subtitle, element.content, element.date, 'Blog', true, element.post_id);
        });
        initialize_links();
    });
});

function createPost(title, subtitle, content, date, element_id, truncate = false, post_id) {
    let container = document.createElement('div');
    let titleElement = document.createElement('span');
    let subtitleElement = document.createElement('span');
    let contentElement = document.createElement('div');
    let dateElement = document.createElement('span');
    let anchor = document.createElement('a');

    titleElement.appendChild(document.createTextNode(title));
    subtitleElement.appendChild(document.createTextNode(subtitle));
    contentElement.appendChild(document.createTextNode(content));
    dateElement.appendChild(document.createTextNode(date));

    // Setup the link
    anchor.id = post_id;
    let a_text = document.createTextNode("Read more");
    anchor.appendChild(a_text);
    anchor.href = "#Post";
    anchor.className = "read_more";
    // Jumble all elements into one single HTML block
    container.appendChild(titleElement);
    container.appendChild(subtitleElement);
    container.appendChild(dateElement);
    container.appendChild(contentElement);

    if(truncate) {
        container.appendChild(anchor);
    }

    // Add some styles!
    container.className = "post-container"
    titleElement.className = "post-title";
    subtitleElement.className = "post-subtitle";
    contentElement.className = (truncate) ? "post-content truncate" : "post-content";
    dateElement.className = "post-date";

    let blog = document.getElementById(element_id);
    blog.appendChild(container);
}

function initialize_links() {
    let read_links = document.getElementsByClassName('read_more');
    
    for (let index = 0; index < read_links.length; index++) {
        const element = read_links[index];
        element.addEventListener('click', (event) => {
            event.preventDefault();
            fetch('content.json')
            .then(response => response.json())
            .then(data => {
                data.blog.forEach(element => {
                    console.log(event.target.id);
                    if(element.post_id == event.target.id) {
                        createPost(element.title, element.subtitle, element.content, element.date, 'Post');
                    } else {
                        console.log("did not find matches.");
                    }
                })
                window.location = `${window.location.origin}${window.location.pathname}#Post`;
            });
        });
    }
}