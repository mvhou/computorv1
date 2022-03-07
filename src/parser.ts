import { NumericLiteral, Tokens, Token } from './tokens'
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
    _lookAhead:Token

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
        return token;
    }

    _eat(tokenType:Tokens) {
        const token = this._lookAhead;

        if (token.type === Tokens.Empty) {
            Error.handle(Error.type.UNEXPECTED_END_OF_INPUT);
            return {};
        }
        if (token.type == Tokens.Number)
            return token;
        return {};
    }
}