import { T } from 'mvhou-ts';
import * as E from './error'
import { State, states } from './states'

interface Tokenizer {
    generateToken:(tok:tokenizerState)=>tokenizerState
}

export type tokenizerState = {
    state:State
    input:string
    cursor:number
    sign:number
    tokens:string[]
}

class NumericToken implements Tokenizer {
    generateToken(tok:tokenizerState):tokenizerState {
        var start = tok.cursor;
        while (T.isNumber(tok.input[tok.cursor]) || tok.input[tok.cursor] == '.')
            tok.cursor++
        var newNumber = ['', '-'][tok.sign] + tok.input.slice(start, tok.cursor)
        if (isNaN(+newNumber))
            E.handle(E.newError(E.errorCode.INCORRECT_NUMBER, start, newNumber+""))
        tok.tokens.push(newNumber);
        tok.sign = 0;
        return tok
    }
}

class StringToken implements Tokenizer {
    generateToken(tok:tokenizerState):tokenizerState {
        var newString = ['', '-'][tok.sign];
        while (T.isAlpha(tok.input[tok.cursor]))
            newString += tok.input[tok.cursor++]
        tok.tokens.push(newString);
        tok.sign = 0;
        return tok
    }
}

class OperatorToken implements Tokenizer {
    generateToken(tok:tokenizerState):tokenizerState {
        tok.tokens.push(tok.input[tok.cursor])
        tok.cursor++
        return tok
    }
}

class SignToken implements Tokenizer {
    generateToken(tok:tokenizerState):tokenizerState {
        tok.sign = 1
        tok.cursor++
        return tok
    }
}

const newState = (tok:tokenizerState):tokenizerState => {
    while (T.isSpace(tok.input[tok.cursor]))
        tok.cursor++
    tok.state = states[tok.state.next.reduce((acc, x) => (states[x].check(tok.input[tok.cursor])) ? x : acc, 'none')]
    return tok
}

const actions:Record<string, Tokenizer> = {
    numeric: new NumericToken(),
    string: new StringToken(),
    operator: new OperatorToken(),
    sign: new SignToken()
}

export const tokenize = (input:string):string[] => {
    var tok:tokenizerState = newState({
        state: states['start'],
        input: input,
        cursor: 0,
        sign: 0,
        tokens: []
    })
    
    while (!['none', 'end'].includes(tok.state.name)) {
        tok = actions[tok.state.name].generateToken(tok)
        tok = newState(tok)
    }
    validateInput(tok);
    return tok.tokens
}

const validateInput = (tok:tokenizerState) => {
    if (tok.cursor >= tok.input.length && tok.state.name != 'end')
        E.handle(E.newError(E.errorCode.UNEXPECTED_END_OF_INPUT));
    if (tok.state.name === 'none')
        E.handle(E.newError(E.errorCode.SYNTAX_ERROR, tok.cursor+1, tok.input[tok.cursor]));
    var eqCount = tok.tokens.reduce((acc, x) => acc + ((x == '=') ? 1 : 0),0);
    if (eqCount == 0)
        E.handle(E.newError(E.errorCode.UNEXPECTED_END_OF_INPUT))
    if (eqCount > 1)
        E.handle(E.newError(E.errorCode.SYNTAX_ERROR))
}





// export class Tokenizer {
//     string:string;
//     cursor:number;
//     tokens:string[]
//     state:State
//     sign:string


//     constructor(str:string) {
//         this.string = str;
//         this.cursor = 0;
//         this.tokens = [];
//         this.state = states['start'];
//         this.sign = ''
//     }

//     hasMoretokens() {
//         return this.cursor < this.string.length;
//     }

//     newState():State {
//         this.findNextToken();
//         return states[this.state.next.reduce((acc, x) => (states[x].check(this.current())) ? x : acc ,'none')]
//     }

//     newNumber():State {
//         var start = this.cursor;
//         // this.printState();
//         while (T.isNumber(this.current()) || this.current() == '.')
//                 this.cursor++;
//         var newNumber = +(this.sign + this.string.slice(start, this.cursor));
//         if (isNaN(newNumber))
//             Error.handle(Error.code.INCORRECT_NUMBER, new Error.ErrorContext(this.string.slice(start, this.cursor), start+1));
//         this.tokens.push(newNumber+"");
//         this.sign = ''
//         return this.newState();
//     }

//     newString():State {
//         var newString:string = this.sign;
//         while (T.isAlpha(this.current())) {
//             newString += this.current();
//             this.cursor++;
//         }
//         this.tokens.push(newString);
//         this.sign = ''
//         return this.newState();
//     }

//     setSign():State {
//         this.sign = '-'
//         this.cursor++;
//         return this.newState();
//     }

//     newOperator():State {
//         this.tokens.push(this.current())
//         this.cursor++;
//         return this.newState()
//     }

//     findNextToken() {
//         while (T.isSpace(this.current()))
//             this.cursor++;
//     }

//     printState() {
//         console.log("state", this.state)
//         console.log("current", this.current())
//         console.log("cursor", this.cursor)
//         console.log("tokens", this.tokens)
//     }

//     getNextToken():boolean {
//         const actions:Record<string, ()=>State> = {
//             digit: this.newNumber.bind(this),
//             letter: this.newString.bind(this),
//             operator: this.newOperator.bind(this),
//             sign: this.setSign.bind(this)
//         }
//         this.state = this.newState();
//         while (this.state.name != 'end' && this.state.name != 'none') {
//             // this.printState()
//             this.state = actions[this.state.name]()
//         }
//         this.validateInput();
//         return true;
//     }

//     validateInput() {
//         if (this.EOF() && this.state.name != 'end')
//             Error.handle(Error.code.UNEXPECTED_END_OF_INPUT);
//         if (this.state.name === 'none')
//             Error.handle(Error.code.SYNTAX_ERROR, new Error.ErrorContext(this.current(), this.cursor + 1));
//         if (this.tokens.reduce((acc, x) => acc + ((x == '=') ? 1 : 0),0) != 1)
//             Error.handle(Error.code.SYNTAX_ERROR);
//     }

//     EOF():boolean {
//         return this.cursor === this.string.length;
//     }

//     current():string {
//         return this.string[this.cursor]
//     }
// }