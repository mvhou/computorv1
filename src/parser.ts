// import { NumericLiteral, Tokens, Token, EmptyToken } from './tokens'
import { tokenize } from './tokenizer'
import * as Error from './error'

// class Program {
//     type:string
//     body:Token[]

//     constructor (type:string, body:Token[]) {
//         this.type = type;
//         this.body = body;
//     }
// }

// export class Parser {
//     string:string
//     tokenizer:Tokenizer

//     constructor (input:string) {
//         this.string = input;
//         this.tokenizer = new Tokenizer(input);
//     }

//     printState() {
//         console.log(this);
//     }
//     parse () {
//         // this.printState()
//         return this.Program();
//     }

//     Program() {
//         if (this.tokenizer.getNextToken())
//             console.log("SUCCESS!")
//         else
//             console.log("FAIL!")
//         return this.tokenizer.tokens;
//     }

//     // Program() {
//     //     const tokenArray:Token[] = [];
//     //     while (this.lookAhead.type !== Tokens.EMPTY) {
//     //         var newToken = this.consume();
//     //         if (newToken.type === Tokens.EMPTY)
//     //             break ;
//     //         tokenArray.push(newToken);
//     //         this.lookAhead = this.tokenizer.getNextToken();
//     //     }
//     //     return tokenArray;
//     // }

//     // consume() {
//     //     const token = this.lookAhead;
//     //     // console.log(token);

//     //     if (token.type === Tokens.EMPTY)
//     //         Error.handle(Error.code.UNEXPECTED_END_OF_INPUT);
//     //     return token;
//     // }
// }