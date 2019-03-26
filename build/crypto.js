"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crypto = require("crypto");
class Block {
    constructor(stringToHash) {
        this.Id = Math.trunc(Math.random() * 10);
        this.NbPreuve = 0;
        this.HashProof = "";
        this.PreviousHash = "";
        this.Data = new Array();
        this.Date = new Date();
        this.GeneretateHashProof(stringToHash);
    }
    GeneretateHashProof(input) {
        for (let count = 0;; count++) {
            input = crypto.createHash("sha256").update(input).digest("hex");
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
let block = new Block("");
console.warn(block.ToString());
let block2 = new Block("my little pony");
console.warn(block2.ToString());
