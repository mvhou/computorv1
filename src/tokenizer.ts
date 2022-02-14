export class Tokenizer {
    string:string[];
    cursor:number;

    constructor(str:string) {
        this.string = str.split('').filter(a => a != ' ');
        this.cursor = 0;
    }

    hasMoretokens() {
        return this.cursor < this.string.length;
    }

    getNextToken() {
        if (!this.hasMoretokens()) {
            return null;
        }
        if (!Number.isNaN((this.string[this.cursor]))) {
            
        }
    }
}