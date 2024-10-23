let log = new Log(document.querySelector('.log'));

let char = new Sorcerer('Killua');  //Definindo o personagem, colocando o tipo dele e um nome nele
let monster = new BigMonster(); //Definindo o monstro, colocando o tipo dele

//Enviando o personagem e o mostro e o elemento onde eles se encontram
const stage = new Stage(
    char, monster, 
    document.getElementById('char'), 
    document.getElementById('monster'),
    log
);

//Iniciando a função
stage.start();