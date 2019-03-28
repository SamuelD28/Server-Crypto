import crypto = require("crypto");
import fs = require("fs");
import keypair = require("keypair");

class Block {

    private Id: number = Math.trunc(Math.random() * 10);
    public NbPreuve: number = 0;
    public HashProof: string = "";
    public PreviousHash: string = "";
    public Data: Array<number> = new Array<number>();
    public Date: Date = new Date();

    constructor(stringToHash: string) {
        this.GeneretateHashProof(stringToHash, false);
    }

    GeneretateHashProof(input: string, verbose: boolean): void {
        for (let count: number = 0; ; count++) {
            input = crypto.createHash("sha256").update(input).digest("hex");

            if (verbose)
                console.log(input);

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

class Cryptography {

    PrivateKey: string;
    PublicKey: string;
    LastSignature: Buffer = new Buffer(2048);

    constructor() {
        let keys: keypair = new keypair();
        this.PublicKey = keys.public;
        this.PrivateKey = keys.private;
    }

    CreateSignature(message: string): Buffer {
        const signer = crypto.createSign('sha256');
        signer.update(message);
        signer.end();
        this.LastSignature = signer.sign(this.PrivateKey);
        return this.LastSignature;
    }

    VerifySignature(message: string, signature: Buffer): boolean {
        const verifier = crypto.createVerify('sha256');
        verifier.update(message);
        verifier.end();
        return verifier.verify(this.PublicKey, signature);
    }
}

let test = new Cryptography();
let signature = test.CreateSignature("Allo");
console.log(test.LastSignature.toString("hex"));
console.log(test.VerifySignature("Allo", signature));
