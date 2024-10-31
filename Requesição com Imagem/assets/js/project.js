function mostrar() {
    let reader = new FileReader();
    const arquivo = document.querySelector('.arquivo').files[0];

    reader.onload = function() {    
        let img = document.createElement('img');
        img.src = reader.result;

        document.querySelector('.container').appendChild(img);
    }

    reader.readAsDataURL(arquivo);  
}

async function enviar() {
    const arquivo = document.querySelector('.arquivo').files[0];

    let body = new FormData();
    body.append('title', 'Novo Arquivo');
    body.append('file', arquivo);

    let request = await fetch('http://localhost/js/Ensinamentos/projectOne/', {
        method: 'POST',
        headers: {
            'Content-Type': 'multipart/form-data'
        }, 
        body: body,
    });

    if (request.ok) {
        alert('Arquivo enviado com sucesso!');
        document.querySelector('.arquivo').value = null;
    } else {
        alert('Falha ao enviar o arquivo.');
    }
}



