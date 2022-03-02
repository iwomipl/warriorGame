import {Warrior, WarriorRecordResult} from "../records/warrior";

export class Fight{
    private warrior1: Warrior;
    private warrior2: Warrior;
    private rounds: object[];
    private attacker: Warrior;
    private attacked: Warrior;
    constructor(warrior1: Warrior, warrior2: Warrior) {
        this.rounds = [];
        this.attacker = Math.random() > 0.5 ? warrior1 : warrior2;
        this.attacked = warrior1 === this.attacker ? warrior2 : warrior1;
    }

    hit(): number {
        const attack = ((this.attacked.defence + this.attacked.agility) > this.attacker.strength) ?
            this.attacker.strength - (Math.round(this.attacked.defence / (Math.random()*4))) :
            this.attacker.strength;
        const wounds: number = attack > 0 ? attack : 1;
        return wounds;
    }

    async roundProcess(): Promise<object[]> {
        try {
            this.attacked.hp = this.attacked.hp - this.hit();
            if (this.attacked.hp > 0 && this.attacker.hp > 0) {
                this.rounds.push({attName: this.attacker.name, hit: this.hit(), defName: this.attacked.name, defHp: this.attacked.hp,});
                const tempAttacked: Warrior = this.attacked;
                this.attacked = this.attacker;
                this.attacker = tempAttacked;
                return await this.roundProcess();
            } else if (this.attacked.hp <= 0) {
                this.rounds.push({attName: this.attacker.name, hit: this.hit(), defName: this.attacked.name});
                const warriorWon: Warrior = await (await Warrior.findWarrior(this.attacker.name))[0];
                await Warrior.addWin(warriorWon.name);

                return this.rounds;
            }
        } catch {
            console.log('error')
        }
    }
}
