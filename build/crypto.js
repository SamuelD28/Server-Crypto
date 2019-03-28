"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crypto = require("crypto");
const keypair = require("keypair");
class Block {
    constructor(stringToHash) {
        this.Id = Math.trunc(Math.random() * 10);
        this.NbPreuve = 0;
        this.HashProof = "";
        this.PreviousHash = "";
        this.Data = new Array();
        this.Date = new Date();
        this.GeneretateHashProof(stringToHash, false);
    }
    GeneretateHashProof(input, verbose) {
        for (let count = 0;; count++) {
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
    GenerateData() {
        let temp = new Array();
        for (let i = 0; i < 10; i++) {
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
    constructor() {
        this.LastSignature = new Buffer(2048);
        let keys = new keypair();
        this.PublicKey = keys.public;
        this.PrivateKey = keys.private;
    }
    CreateSignature(message) {
        const signer = crypto.createSign('sha256');
        signer.update(message);
        signer.end();
        this.LastSignature = signer.sign(this.PrivateKey);
        return this.LastSignature;
    }
    VerifySignature(message, signature) {
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
