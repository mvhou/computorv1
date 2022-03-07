import { T } from 'mvhou-ts';
import { NumericLiteral, Token, EmptyToken } from './tokens'

export class Tokenizer {
    _string:string;
    _cursor:number;

    constructor(str:string) {
        this._string = str;
        this._cursor = 0;
    }

    hasMoretokens() {
        return this._cursor < this._string.length;
    }

    getNextToken():Token {
        if (!this.hasMoretokens()) {
            return new EmptyToken()
        }
        const string = this._string.slice(this._cursor)
        if (T.isNumber(this._string[this._cursor])) {
            var newNumber = '';
            while (T.isNumber(this._string[this._cursor])) {
                newNumber += this._string[this._cursor];
                this._cursor++;
            }
            return new NumericLiteral(newNumber)
        }
        return new EmptyToken()
    }
}