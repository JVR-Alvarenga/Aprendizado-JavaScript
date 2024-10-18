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


class Knight extends Character {

    constructor(name) {
        super(name);
        this.life = 100;
        this.attack = 10;
        this.defense = 8;
        this.maxLife = 100;
    }
}


class Sorcerer extends Character {

    constructor(name) {
        super(name);
        this.life = 80;
        this.attack = 15;
        this.defense = 3;
        this.maxLife = 100;
    }
}


class LittleMonster extends Character {

    constructor() {
        super('Little Monster');
        this.life = 40;
        this.attack = 4;
        this.defense = 4;
        this.maxLife = 120;
    }
}


class BigMonster extends Character {

    constructor() {
        super('Big Monster');
        this.life = 120;
        this.attack = 18;
        this.defense = 8;
        this.maxLife = 120;
    }
}


class Stage {

    constructor(fighter1, fighter2, fighter1El, fighter2El) {
        this.fighter1 = fighter1;
        this.fighter2 = fighter2;
        this.fighter1El = fighter1El;
        this.fighter2El = fighter2El;
    }

    start() {
        this.update();

        this.fighter1El.querySelector('.attackButton').addEventListener('click', () => this.doAttack(this.fighter1, this.fighter2));
        this.fighter2El.querySelector('.attackButton').addEventListener('click', () => this.doAttack(this.fighter2, this.fighter1));
    }

    update() {
        //fighter1
        this.fighter1El.querySelector('.name').textContent = `Nome: ${this.fighter1.name} - HP: ${this.fighter1.life}`;
        let f1Pct = (this.fighter1.life / this.fighter1.maxLife) * 100;
        this.fighter1El.querySelector('.bar').style.width = `${f1Pct}%`


        //fighter2
        this.fighter2El.querySelector('.name').textContent = `Nome: ${this.fighter2.name} - HP: ${this.fighter2.life}`;
        let f2Pct = (this.fighter2.life / this.fighter2.maxLife) * 100;
        this.fighter2El.querySelector('.bar').style.width = `${f2Pct}%`
    }

    doAttack(attacking, attacked) {
        console.log(`${attacking.name} atacou à ${attacked.name}`);

        this.update();
    }
}
