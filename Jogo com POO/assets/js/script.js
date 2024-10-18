let char = new Sorcerer('Killua');
let monster = new BigMonster();

const stage = new Stage(
    char, monster, 
    document.getElementById('char'), 
    document.getElementById('monster')
);


stage.start();