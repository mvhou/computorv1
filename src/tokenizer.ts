import { T } from 'mvhou-ts';
import * as Error from './error'
import { NumericLiteral, Token, EmptyToken, StringLiteral } from './tokens'

type State = {
    name:string
    next:string[]
    check:(c:string)=>boolean
}

const states:Record<string, State> = {
    start: {
        name: 'start',
        next: [
            'digit',
            'letter',
            'sign',
            'space'
        ],
        check: (c:string)=>c!=c
    },
    digit: {
        name: 'digit',
        next: [
            'digit',
            'letter',
            'operator',
            'space',
            'end'
        ],
        check: T.isNumber
    },
    letter: {
        name: 'letter',
        next: [
            'operator',
            'space',
            'end'
        ],
        check: T.isAlpha
    },
    sign: {
        name: 'sign',
        next: [
            'digit',
            'letter'
        ],
        check: (c:string)=>c=='-'
    },
    operator: {
        name: 'operator',
        next: [
            'digit',
            'letter',
            'sign'
        ],
        check: (c:string)=>['+','-','/','-'].includes(c)
    },
    none: {
        name: 'none',
        next: [],
        check: (c:string)=>c!=c
    }
}

class StateMachine {
    state:State

    constructor() {
        this.state = states['start'];
    }

    getNextState(c:string):State | null {
        this.state.next.reduce((acc, state) => (states[state].check(c)) ? state : acc, 'none');
        return null
    }
}

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