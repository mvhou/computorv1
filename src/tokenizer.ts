import { T } from 'mvhou-ts';
import * as Error from './error'
import { NumericLiteral, Token, EmptyToken, StringLiteral } from './tokens'

export class Tokenizer {
    string:string;
    cursor:number;


    constructor(str:string) {
        this.string = str;
        this.cursor = 0;
    }

    hasMoretokens() {
        return this.cursor < this.string.length;
    }

    getNextToken():Token {
        while (this.hasMoretokens() && T.isSpace(this.current()))
            this.cursor++;
        if (!this.hasMoretokens()) {
            return new EmptyToken()
        }
        if (T.isNumber(this.current())) {
            var start = this.cursor;
            while (T.isNumber(this.current()) || this.current() == '.')
                this.cursor++;
            var newNumber = +(this.string.slice(start, this.cursor));
            if (isNaN(newNumber))
                Error.handle(Error.type.INCORRECT_NUMBER, new Error.ErrorContext(this.string.slice(start, this.cursor), start+1));
            return new NumericLiteral(newNumber)
        }
        if (T.isAlpha(this.current())) {
            var newVariable = '';
            while (T.isAlpha(this.current())) {
                newVariable += this.current();
                this.cursor++;
            }
            return new StringLiteral(newVariable);
        }
        return new EmptyToken()
    }

    EOF():boolean {
        return this.cursor === this.string.length;
    }

    current():string {
        return this.string[this.cursor]
    }
}