window.addEventListener('load', (event) => {
    // Javascript Code here!
    fetch('content.json')
    .then(response => response.json())
    .then(data => {
        data.blog.forEach(element => {
            createPost(element.title, element.subtitle, element.content, element.date, 'Blog', true, element.post_id);
        });
        initialize_links();
        requestUserRepos('ThatDeveloperNamedCarpeso');
    });
});

function createProject(title, content, link) {
    let codeBox = document.createElement('div');
    let codeTitle = document.createElement('span'),
    codeContent = document.createElement('p'),
    codeLink = document.createElement('a');

    codeTitle.appendChild(document.createTextNode(title));
    codeContent.appendChild(document.createTextNode(content));

    codeLink.href = link;
    let body = document.getElementById('Repos');
    codeLink.appendChild(document.createTextNode('Visit Repo'));

    // Set Class Names for each element
    codeTitle.className = 'code-title';
    codeContent.className = 'code-description';
    codeLink.className = 'code-link';

    codeBox.appendChild(codeTitle);
    codeBox.appendChild(codeContent);
    codeBox.appendChild(codeLink);

    codeBox.className = 'code-box';
    body.appendChild(codeBox);
}

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

// Taken from codesnippet.io
function requestUserRepos(username){
    // Create new XMLHttpRequest object
    const xhr = new XMLHttpRequest();
    // GitHub endpoint, dynamically passing in specified username
    const url = `https://api.github.com/users/${username}/repos`;
    // Open a new connection, using a GET request via URL endpoint
    // Providing 3 arguments (GET/POST, The URL, Async True/False)
    xhr.open('GET', url, true);
    // When request is received
    // Process it here
    xhr.onload = function() {
        // Parse API data into JSON
        const data = JSON.parse(this.response);
        // Loop over each object in data array
        for (let i in data) {
            createProject(data[i].name, data[i].description, data[i].html_url);
        }

    }
    
    // Send the request to the server
    xhr.send();
    
}