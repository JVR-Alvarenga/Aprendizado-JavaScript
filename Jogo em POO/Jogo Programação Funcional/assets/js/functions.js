const defaultCharacter = {
    name: '',
    life: 1,
    maxLife: 1,
    attack: 0,
    defense: 0
}

const KnightCharacter = (name) => {
    return {
        ...defaultCharacter,
        name: name,
        life: 100,
        attack: 10,
        defense: 12,
        maxLife: 100,
    }
}

const SorcererCharacter = (name) => {
    return {
        ...defaultCharacter,
        name: name,
        life: 80,
        attack: 22,
        defense: 5,
        maxLife: 80,
    }
}

const LittleMonster = () => {
    return {
        ...defaultCharacter,
        name: 'Little Monster',
        life: 60,
        attack: 12,
        defense: 4,
        maxLife: 60,
    }
}

const BigMonster = () => {
    return {
        ...defaultCharacter,
        name: 'Big Monster',
        life: 120,
        attack: 18,
        defense: 10,
        maxLife: 120,
    }
}


const stage = {
    fighter1: null,
    fighter2: null,
    fighter1El: null,
    fighter2El: null,
    log: null,

    start(fighter1, fighter2, fighter1El, fighter2El)  {
        this.fighter1 = fighter1,
        this.fighter2 = fighter2,
        this.fighter1El = fighter1El,
        this.fighter2El = fighter2El,

        this.update();

        fighter1El.querySelector('.attackButton').addEventListener('click', () => this.doAttack(this.fighter1, this.fighter2));
        fighter2El.querySelector('.attackButton').addEventListener('click', () => this.doAttack(this.fighter2, this.fighter1));

    },

    update() {
        this.fighter1El.querySelector('.name').textContent = `Nome: ${this.fighter1.name} - HP: ${this.fighter1.life.toFixed(1)}`;
        let f1Pct = (this.fighter1.life / this.fighter1.maxLife) * 100;
        this.fighter1El.querySelector('.bar').style.width = `${f1Pct}%`;

        this.fighter2El.querySelector('.name').textContent = `Nome: ${this.fighter2.name} - HP: ${this.fighter2.life.toFixed(1)}`;
        let f2Pct = (this.fighter2.life / this.fighter2.maxLife) * 100;
        this.fighter2El.querySelector('.bar').style.width = `${f2Pct}%`;
    },

    doAttack(attacking, attacked) {
        if(attacking.life <= 0 || attacked.life <= 0) {
            log.addMessage('Batendo em cadáver.');
            return;
        }

        let damage = (Math.random() * 2).toFixed(2);
        let defense = (Math.random() * 2).toFixed(2);

        let actualDamage = attacking.attack * damage;
        let actualDefense = attacked.defense * defense;


        if(actualDamage > actualDefense) {
            attacked.life -= actualDamage;
            log.addMessage(`${attacking.name} causou ${actualDamage.toFixed(1)} de dano em ${attacked.name}`);
            attacked.life = attacked.life <= 0 ? 0 : attacked.life;
        }else {
            log.addMessage(`${attacked.name} conseguiu defender`);
        }

        this.update();
    }
}

const log = {
    list: [],
    addMessage(message) {
        this.list.push(message);
        this.render();
    },
    render() {
        const logEl = document.querySelector('.log');
        
        let newLi = document.createElement('li');
        for(let i in this.list) {
            newLi.textContent = this.list[i];
            logEl.appendChild(newLi);
        }
    }
}
