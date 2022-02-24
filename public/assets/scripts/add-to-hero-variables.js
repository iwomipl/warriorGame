const strengthInc = document.querySelector("#strength .inc");
const strengthDec = document.querySelector("#strength .dec");
const strengthVal = document.querySelector('#strength');

const defenceInc = document.querySelector("#defence .inc");
const defenceDec = document.querySelector("#defence .dec");
const defenceVal = document.querySelector('#defence');

const staminaInc = document.querySelector("#stamina .inc");
const staminaDec = document.querySelector("#stamina .dec");
const staminaVal = document.querySelector('#stamina');

const agilityInc = document.querySelector("#agility .inc");
const agilityDec = document.querySelector("#agility .dec");
const agilityVal = document.querySelector('#agility');

class TempWarrior {
    constructor() {

            this.strength = 1;
            this.defence = 1;
            this.stamina = 1;
            this.agility = 1;

    }
}

const tempWarrior = new TempWarrior();
