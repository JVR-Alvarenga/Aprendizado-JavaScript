//Class Pae, onde vamos ter as variaveis de criacao de personagem
class Character {
    _life = 1;
    maxLife = 1;
    attack = 0;
    defense = 0;

    constructor(name) {
        this.name = name;
    }
    
    set life(newLife) {
        this._life = newLife < 0 ? 0 : newLife;
    }
    get life() {return this._life}
}

//Class do Personagem Knight(Cavalheiro), herdando as propriedades da class pae
class Knight extends Character {

    constructor(name) {
        super(name);
        this.life = 100;
        this.attack = 10;
        this.defense = 10;
        this.maxLife = 100;
    }
}

//Class do Personagem Sorcerer(Feiticeiro/Mago), herdando as propriedades da class pae
class Sorcerer extends Character {

    constructor(name) {
        super(name);
        this.life = 80;
        this.attack = 22;
        this.defense = 5;
        this.maxLife = 100;
    }
}

//Class do Monstro Little Monster(Pequeno Monstro), herdando as propriedades da class pae
class LittleMonster extends Character {

    constructor() {
        super('Little Monster');
        this.life = 60;
        this.attack = 9;
        this.defense = 15;
        this.maxLife = 120;
    }
}

//Class do Monstro Big Monster(Grande Monstro), herdando as propriedades da class pae
class BigMonster extends Character {

    constructor() {
        super('Big Monster');
        this.life = 120;
        this.attack = 18;
        this.defense = 7;
        this.maxLife = 120;
    }
}


//Class que comanda o cenario de forma geral
class Stage {

    //Pegando pelo Constructor Um Personagem e um Monstro e o elementos deles na tela e um objeto da class LOG
    constructor(fighter1, fighter2, fighter1El, fighter2El, logObject) {
        this.fighter1 = fighter1;
        this.fighter2 = fighter2;
        this.fighter1El = fighter1El;
        this.fighter2El = fighter2El;
        this.log = logObject;
    }

    //Função que starta a tela, ela usa a funcao update e pega quando algum personagem ataca o outro
    start() {
        this.update();

        this.fighter1El.querySelector('.attackButton').addEventListener('click', () => this.doAttack(this.fighter1, this.fighter2));
        this.fighter2El.querySelector('.attackButton').addEventListener('click', () => this.doAttack(this.fighter2, this.fighter1));
    }

    //Função que atualiza a tela com as vidas dos personagens
    update() {
        //fighter1
        this.fighter1El.querySelector('.name').textContent = `Nome: ${this.fighter1.name} - HP: ${this.fighter1.life.toFixed(1)}`;
        let f1Pct = (this.fighter1.life / this.fighter1.maxLife) * 100;
        this.fighter1El.querySelector('.bar').style.width = `${f1Pct}%`


        //fighter2
        this.fighter2El.querySelector('.name').textContent = `Nome: ${this.fighter2.name} - HP: ${this.fighter2.life.toFixed(1)}`;
        let f2Pct = (this.fighter2.life / this.fighter2.maxLife) * 100;
        this.fighter2El.querySelector('.bar').style.width = `${f2Pct}%`
    }

    //Função que mostra qual personagem atacou o outro para deixar registrado
    doAttack(attacking, attacked) {
        if(attacking.life <= 0 || attacked.life <= 0) {
            this.log.addMessage('Atacando Personagem Morto.');
            return;
        }

        let attackFactory = (Math.random() * 2).toFixed(2);
        let defenseFactory = (Math.random() * 2).toFixed(2);

        let attackValue = attacking.attack * attackFactory;
        let defenseValue = attacked.defense * defenseFactory;

        if(attackValue > defenseValue) {
            attacked.life -= attackValue;
            this.log.addMessage(`${attacking.name} causou um dano de ${attackValue.toFixed(2)} em ${attacked.name}`);
        }else {
            this.log.addMessage(`${attacked.name} conseguiu defender...`);
        }

        this.update();
    }
}


class Log {
    list = [];

    constructor(listEl) {
        this.listEl = listEl;
    }

    addMessage(msg) {
        this.list.push(msg);
        this.render();
    }

    render() {
        let newLi = document.createElement('li');
        
        for(let listSelect of this.list) {
            newLi.textContent = listSelect;
            this.listEl.appendChild(newLi);
        }
    }
}

