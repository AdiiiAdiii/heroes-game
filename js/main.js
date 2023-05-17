//1. Cream clasa parinte Hero
//2. Cream o metoda attacked ce va fi apelata de fiecare data cand un erou este atacat
//3. Conditii pentru metoda attacked: 
//   Verificam daca eroul are proprietatea this.canFly => cream o variabila chance = cu un numar random, iar daca chance > 0.5 atunci eroul nu isi ia damage deloc.
//   Verificam daca eroul are proprietatea this.shield => isi ia cu 0.2 mai putin damage
//   Actualizam hp scazand damage-ul (-=)
//   Logam numele eroului atacat si cat damage si-a luat + cu cat hp a ramas
//4. Cream clasele copii: Dwarf, Sprite si Dragon 
//   In fiecare clasa o sa suprascriem constructor-ul asfel: 
//   - Dwarf are shield, Sprite poate zbura iar Dragonul poate zbura si are si shield
//   - facem cate o metoda de attack pentru fiecare erou copil (cu obiectul otherHero ca si parametru), in care declaram o valoare pentru damage si ca raspuns al attack-ului, otherHero apeleasa metoda din parinte: attacked.
//4. Cream clasa fight pentru a conduce bataliile intre eroi, ca is parametrii avem hero1 si hero2 (obiecte) si o sa avem ca proprietate this.turn care se transmite cu valoare 0.
//   - cream o metoda (performAttack) pentru a executa un singur atac.
//HINT: verificam daca tura (this.turn) este 0 sau 1 si in functie de asta ataca primul erou sau al doilea
//   - cream o metoda pentru a schimba tura (changeTurn). HINT: tura trebuie sa fie 0 (ataca hero1) sau 1 (ataca hero2);
//   - cream o metoda (findWinner) pentru a determina cine este castigatorul, in funtie de hp ramas pentru fiecare erou
//   - cream o metoda (go) pentru a incepe lupta, iar in metoda vom avea un (do...while) in care se va executa atacul si se va schimba tura atat timp cat ambii eroi au hp > 0. La final se apeleaza metoda (findWinner).
//   - cream 3 obiecte pentru fiecare clasa copil: Dwarf, Sprite si Dragon.
//   - cream o lupta noua si ii dam drumul prin apelarea metodei (go).
class Hero {
    constructor(name, hp) {
        this.name = name;
        this.hp = hp;
        this.canFly = false;
        this.shield = false;
    }

    attacked(damage) {
        if(this.canFly) {
            let chance = Math.random();
            if(chance > 0.5) {
                console.log(this.name + " flew away.");
                damage = 0;
            }
        }

        if(this.shield) {
            damage *= 0.8; // damage = damage * 0.8;
            console.log(this.name + " defends with a shield.");
        }

        this.hp -= damage; //this.hp = this.hp - damage;
        console.log(this.name + " has been attacked. HP reduced by: " + damage + ". HP remaining: " + this.hp + ".");
    }
}

class Dwarf extends Hero {
    constructor(name, hp) {
        super(name, hp);
        this.shield = true;
    }
    
    attack(otherHero) {
        let damage = 10;
        console.log(this.name + " attacked with " + damage + " damage.");
        otherHero.attacked(damage);
    }
}

class Sprite extends Hero {
    constructor(name, hp) {
        super(name, hp);
        this.canFly = true;
    }
    
    attack(otherHero) {
        let damage = 15;
        console.log(this.name + " attacked with " + damage + " damage.");
        otherHero.attacked(damage);
    }
}

class Dragon extends Hero {
    constructor(name, hp) {
        super(name, hp);
        this.shield = true;
        this.canFly = true;
    }
    
    attack(otherHero) {
        let damage = 5;
        console.log(this.name + " attacked with " + damage + " damage.");
        otherHero.attacked(damage);
    }
}

class Fight {
    constructor(hero1, hero2) {
        this.hero1 = hero1;
        this.hero2 = hero2;
        this.turn = 0;
    }

    performAttack() {
        if(this.turn === 0) {
            this.hero1.attack(this.hero2);
        } else {
            this.hero2.attack(this.hero1);
        }
    }

    changeTurn() {
        this.turn = 1 - this.turn;
    }

    findWinner() {
        if(this.hero1.hp > 0) {
            console.log(this.hero1.name + " won with " + this.hero1.hp + " HP remaining.")
        } else if(this.hero2.hp > 0) {
            console.log(this.hero2.name + " won with " + this.hero2.hp + " HP remaining.")
        } else {
            console.log("No heroes left alive.");
        }
    }

    go() {
        do {
            this.performAttack();
            this.changeTurn();
        } while (this.hero1.hp > 0 && this.hero2.hp > 0);
        this.findWinner();
    }
}

let dwarf = new Dwarf("Khurbada Oakenguard Dwarf", 50);
let sprite = new Sprite("Prinna Bumblelace Sprite", 40);
let dragon = new Dragon("Aphat, The Pun Dragon", 60);

let epicFight = new Fight(dwarf, sprite);
