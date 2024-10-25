//https://jsonplaceholder.typicode.com/posts
let postArea = document.querySelector('.posts');

async function postRead() {
    postArea.innerHTML = 'Carregando...';

    let response = await fetch('https://jsonplaceholder.typicode.com/posts');
    let json = await response.json();

    if(json.length > 0) {
        postArea.innerHTML = '';
        
        for(let i in json){
            let divPostArea = document.createElement('div');
            let h1PostArea = document.createElement('h1');
            let hrPostArea = document.createElement('hr');
            let paragrafoPostArea = document.createElement('p');

            h1PostArea.innerHTML = json[i].title;
            divPostArea.appendChild(h1PostArea);
            
            paragrafoPostArea.innerHTML = json[i].body;
            divPostArea.appendChild(paragrafoPostArea);
            
            divPostArea.appendChild(hrPostArea);
            postArea.appendChild(divPostArea);
        }
    }else { 
        postArea.textContent = 'Nenhum Post Encontrado.';
    }
}

async function addNewPost(title, body) {
    await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
            'content-Type': 'application/json'
        },
        body: JSON.stringify({
            title,
            body,
            userId: 1
        })
    });

    document.querySelector('#titleField').value = null;
    document.querySelector('#bodyField').value = null;

    postRead();
    
}

document.querySelector('#insertButton').addEventListener('click', () => {
    let title = document.querySelector('#titleField').value;
    let body = document.querySelector('#bodyField').value;

    if(title && body) {
        addNewPost(title, body);
    }else {
        alert('Preencha todos os campos.');
    }
});

postRead();