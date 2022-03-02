import {NextFunction, Request, Response, Router} from "express";
import {Warrior} from "../records/warrior";
import {Fight} from "../utils/fight";



export class HomeRouter {
    public urlPrefix: string = '/';
    public readonly router: Router = Router();
    constructor(
    ) {
        this.router = Router();
        this.setUpRoutes();
    }

    setUpRoutes(): void{
        this.router.get('/favicon.ico', (req, res)=> res.status(200));
        this.router.get(this.urlPrefix, this.home);
        this.router.post(`${this.urlPrefix}add-name`, this.addWarriorName);
        this.router.get(`${this.urlPrefix}chosen-skills`, this.chosenskills);
        this.router.get(`${this.urlPrefix}fight`, this.theFight);
        this.router.get(`${this.urlPrefix}next-fight`, this.nextFight);
    }

    private home = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        res.render('home/index');
    }

    private addWarriorName = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const {name} = req.body;
        const regex = /^[\w]+$/i;
        if (name.length < 3 || name.length >= 15 || !regex.test(name) || await Warrior.checkIfNameExists(name)){
            const message: string = 'Sorry, name should be longer, than 3 and shorter, than 15 characters. \r' +
                'There can be only letters, digits, and space or the name allready exists in DataBase';
            res.render('error', {
                message,
            });
            return;
        }
        const userWarrior = new Warrior(name);

        await userWarrior.insertNewWarrior();

        res.render('added/index', {
            name,
            userWarrior,
        });
        // addingEventListener();
    }
    private async chosenskills(req: Request, res: Response, next: NextFunction): Promise<void>{
        const fighter = new Warrior(
            req.query.name as string,
            Number((req.query as any).strength) as number,
            Number((req.query as any).defence) as number,
            Number((req.query as any).stamina) as number,
            Number((req.query as any).agility) as number
        ) as Warrior;


        await fighter.insertWarrior();
        const [randomWarrior]= await fighter.findRandomWarrior(req.query.opponentName as string);

        res.render('fight/pre-fight', {
            fighter,
            randomWarrior,
        })

    }
    private async nextFight(req: Request, res: Response, next: NextFunction){
        const myFighterName = req.query.name as string;
        const opponentsName = req.query.warriorTwoName as string;

        const {name, strength, defence, stamina, agility, wins, hp} = (await Warrior.findWarrior(myFighterName))[0];
        const fighter = new Warrior(name, strength, defence, stamina, agility, wins);

        const randomWarrior= (await fighter.findRandomWarrior(opponentsName))[0] as Warrior;

        res.render('fight/pre-fight', {
            fighter,
            randomWarrior,
        })

    }
    private async theFight(req: Request, res: Response, next: NextFunction){
        const myFighterName = req.query.warriorOne as string;
        const opponentName = req.query.warriorTwo as string;

        const fighter: Warrior = (await Warrior.findWarrior(myFighterName))[0];
        const randomWarrior: Warrior = (await Warrior.findWarrior(opponentName))[0];

        const fight = new Fight(fighter, randomWarrior);
        const fightProcess = await fight.roundProcess();
        const winner = fightProcess.pop();

        res.render('fight/fight', {
            fighter: (await Warrior.findWarrior(myFighterName))[0],
            randomWarrior: (await Warrior.findWarrior(opponentName))[0],
            fightProcess,
            winner,
        })
    }
}
