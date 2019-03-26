import crypto = require("crypto");

class Block {

    private Id: number = Math.trunc(Math.random() * 10);
    public NbPreuve: number = 0;
    public HashProof: string = "";
    public PreviousHash: string = "";
    public Data: Array<number> = new Array<number>();
    public Date: Date = new Date();

    constructor(stringToHash: string) {
        this.GeneretateHashProof(stringToHash);
    }

    GeneretateHashProof(input: string): void {
        for (let count: number = 0; ; count++) {
            input = crypto.createHash("sha256").update(input).digest("hex");
            if (input.substring(0, 5) === "00000") {
                this.NbPreuve = count;
                this.HashProof = input;
                break;
            }
        }
    }

    GenerateData(): Array<number> {
        let temp: Array<number> = new Array<number>();
        for (let i: number = 0; i < 10; i++) {
            temp.push(i);
        }
        return temp;
    }

    ToString() {
        return "Id : " + this.Id +
            "\nNbPreuve : " + this.NbPreuve +
            "\nHashProof : " + this.HashProof;
    }
}

let block = new Block("");
console.warn(block.ToString());
let block2 = new Block("my little pony");
console.warn(block2.ToString());