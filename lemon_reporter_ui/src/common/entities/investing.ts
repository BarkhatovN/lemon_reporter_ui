export interface LemonInvesting {
    date: Date;
    id: string;
    name: string;
    investedRubs: number;
    payOffs: ReadonlyArray<PayOff>
}

export class PayOff {
    constructor(date: Date, moneyRub: number) {
        this.date = date;
        this.moneyRub = moneyRub;
    }
    date: Date;
    moneyRub: number;

    getDate = () => this.date.getDate();
}