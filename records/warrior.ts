import {pool} from "../data/db";
import {FieldPacket} from "mysql2";

export type WarriorRecordResult = [Warrior[], FieldPacket[]];
export interface WarriorSkills{
    name: string;
    strength: number;
    defence: number;
    stamina: number;
    agility: number;
    wins: number;
    hp: number;
}

export class Warrior implements WarriorSkills{
    name: string;
    strength: number;
    defence: number;
    stamina: number;
    agility: number;
    wins: number;
    hp: number;
    constructor(
        name: string,
        strength?: number,
        defence?: number,
        stamina?: number,
        agility?: number,
        wins?: number,
        ) {
        if (name.length <= 3 || name.length >= 25 || !name){
            throw new Error('Sorry, name should be longer, than 3 and shorter, than 15 characters');
        }
        this.name = name;
        this.strength = strength ?? 1;
        this.defence = defence ?? 1;
        this.stamina = stamina ?? 1;
        this.agility = agility ?? 1;
        this.wins = wins ?? 0;
        this.hp = stamina * 10;
    }

    static async listAll(): Promise<Warrior[]>{
        const [warriors] = await pool.execute('SELECT * FROM `warriors`') as WarriorRecordResult;
        return warriors.map(obj => new Warrior(obj.name));
    }

    static async findWarrior(passedName: string): Promise<Warrior[]>{
        try {
            const [[...result]] = await pool.execute('SELECT * FROM  `warriors` WHERE `name`=:passedName', {
                passedName,
            }) as WarriorRecordResult;
            return result;
        } catch {
            return null;
        }
    }

    static async addWin(warriorName: string){
        await pool.execute('UPDATE `warriors` SET `wins` = `wins`+1 WHERE `name`=:name', {
            name: warriorName,
        });
    }

    static async checkIfNameExists(passedName: string): Promise<boolean>{
        try {
            const [[{name}]] = await pool.execute('SELECT `name` FROM  `warriors` WHERE `name`=:passedName', {
                passedName,
            }) as WarriorRecordResult;
            return name ? true : false;
        } catch {
            return false;
        }
    }
    static async getBestWinners(){
        try {
            const [[...result]] = await pool.execute('SELECT * FROM  `warriors` ORDER By `wins` LIMIT 10') as WarriorRecordResult;
            return result;
        } catch {
            return null;
        }
    }

    async findRandomWarrior(opponentName: string): Promise<Warrior[]>{
        try {
            const [[...result]] = await pool.execute('SELECT * FROM  `warriors` ORDER By RAND() LIMIT 1') as WarriorRecordResult;
            if (this.name === [...result][0].name || opponentName === [...result][0].name){
               return this.findRandomWarrior(opponentName);
            }
            return result;
        } catch {
            return null;
        }
    }


    async insertNewWarrior(){
        await pool.execute('INSERT INTO `warriors`(`name`, `strength`, `defence`, `stamina`, `agility`, `wins`, `hp`) VALUES(:name, :strength, :defence, :stamina, :agility, :wins, :hp)', {
            name: this.name,
            strength: this.strength,
            defence: this.defence,
            stamina: this.stamina,
            agility: this.agility,
            wins: this.wins,
            hp: this.stamina*10,
        })
    }
    async insertWarrior(){
        await pool.execute('UPDATE `warriors` SET `strength` = :strength, `defence` = :defence, `stamina` = :stamina, `agility`= :agility, `wins` = :wins WHERE `name`=:name', {
            name: this.name,
            strength: this.strength,
            defence: this.defence,
            stamina: this.stamina,
            agility: this.agility,
            wins: this.wins
        })
    }

}