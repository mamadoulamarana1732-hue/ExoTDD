export class door{
   
   public close: boolean = true;
   public open: boolean = true;

    public isClose(): boolean {
        return this.close;
    }
    public isopen(): boolean {
        return this.open;
    }
}
export class player{
    player : string;
    constructor(player:string){
        this.player=player;
    }

}
export class key{
    ketcolor : string;

    constructor(color:string){
        this.ketcolor=color;
    }
}
