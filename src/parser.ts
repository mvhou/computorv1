import { NumericLiteral, Tokens, Token, EmptyToken } from './tokens'
import { Tokenizer } from './tokenizer'
import * as Error from './error'

class Program {
    type:string
    body:Token[]

    constructor (type:string, body:Token[]) {
        this.type = type;
        this.body = body;
    }
}

export class Parser {
    string:string
    tokenizer:Tokenizer
    lookAhead:Token

    constructor (input:string) {
        this.string = input;
        this.tokenizer = new Tokenizer(input);
        this.lookAhead = this.tokenizer.getNextToken();
    }

    printState() {
        console.log(this);
    }
    parse () {
        // this.printState()
        return this.Program();
    }

    Program() {
        const tokenArray:Token[] = [];
        while (this.lookAhead.type !== Tokens.EMPTY) {
            var newToken = this.consume();
            if (newToken.type === Tokens.EMPTY)
                break ;
            tokenArray.push(newToken);
            this.lookAhead = this.tokenizer.getNextToken();
        }
        return tokenArray;
    }

    consume() {
        const token = this.lookAhead;
        // console.log(token);

        if (token.type === Tokens.EMPTY)
            Error.handle(Error.type.UNEXPECTED_END_OF_INPUT);
        return token;
    }
}