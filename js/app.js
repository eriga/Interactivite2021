const url = "http://127.0.0.1:5501/chats.json";

setTimeout(() => {
    fetch(url).then(data => {
        return data.json();
    }).then(json => {

        let contenu = JSON.stringify(json, null, ' ');

        document.body.innerHTML += `<pre>${contenu}</pre>`;

    });
}, 3000);