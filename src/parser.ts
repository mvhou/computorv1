import { NumericLiteral, Tokens } from './tokens'
import { Tokenizer } from './tokenizer'
import * as Error from './error'

class Program {
    type:string
    body:{}

    constructor (type:string, body:{}) {
        this.type = type;
        this.body = body;
    }
}

export class Parser {
    _string:string
    _tokenizer:Tokenizer
    _lookAhead:NumericLiteral | null | undefined

    constructor (input:string) {
        this._string = input;
        this._tokenizer = new Tokenizer(input);
        this._lookAhead = this._tokenizer.getNextToken();
    }

    parse () {
        return this.Program();
    }

    Program() {
        return new Program('Program', this.NumericLiteral())
    }

    NumericLiteral() {
        const token = this._eat(Tokens.Number);
        return new NumericLiteral(token.value)
    }

    _eat(tokenType:Tokens) {
        const token = this._lookAhead;

        if (!token) {
            Error.handle(1)
        }
    }
}