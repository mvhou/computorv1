import { T } from 'mvhou-ts';
import * as E from './error'
import { State, states } from './types/states'
import { token, tokenType, newToken } from './types/tokens'

interface Tokenizer {
    generateToken:(tok:tokenizerState)=>tokenizerState
}

export type tokenizerState = {
    state:State
    input:string
    cursor:number
    tokens:token[]
}

type test = string & number

class NumericToken implements Tokenizer {
    generateToken(tok:tokenizerState):tokenizerState {
        var start = tok.cursor;
        while (T.isNumber(tok.input[tok.cursor]) || tok.input[tok.cursor] == '.')
            tok.cursor++
        var newNumber = tok.input.slice(start, tok.cursor)
        if (isNaN(+newNumber))
            E.handle(E.newError(E.errorCode.INCORRECT_NUMBER, start, newNumber+""))
        tok.tokens.push({ type: tokenType.NUMBER, value: newNumber });
        return tok
    }
}

class StringToken implements Tokenizer {
    generateToken(tok:tokenizerState):tokenizerState {
        var newString = '';
        while (T.isAlpha(tok.input[tok.cursor]))
            newString += tok.input[tok.cursor++]
        tok.tokens.push({ type: tokenType.VARIABLE, value: newString });
        return tok
    }
}

class BinaryToken implements Tokenizer {
    generateToken(tok:tokenizerState):tokenizerState {
        tok.tokens.push({ type: tokenType.BINARY, value: tok.input[tok.cursor] })
        tok.cursor++
        return tok
    }
}

class UnaryToken implements Tokenizer {
    generateToken(tok:tokenizerState):tokenizerState {
        tok.tokens.push({ type: tokenType.UNARY, value: '_' })
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
    binary: new BinaryToken(),
    unary: new UnaryToken()
}

//3 * 3 + 3
//

export const doTheThing = (tok:tokenizerState):tokenizerState => {
    if (['none', 'end'].includes(tok.state.name))
        return tok;
    return (doTheThing(newState(actions[tok.state.name].generateToken(tok))))
}

export const tokenize = (input:string):token[] => doTheThing(newState({
        state: states['start'],
        input: input,
        cursor: 0,
        tokens: []
    })).tokens;

export const validateInput = (tok:tokenizerState):tokenizerState | E.err => {
    if (tok.cursor >= tok.input.length && tok.state.name != 'end')
        return E.newError(E.errorCode.UNEXPECTED_END_OF_INPUT)
    if (tok.state.name === 'none')
        return E.newError(E.errorCode.SYNTAX_ERROR, tok.cursor+1, tok.input)
    var eqCount = tok.tokens.reduce((acc, x) => acc + ((x.value == '=') ? 1 : 0),0);
    if (eqCount == 0)
        return E.newError(E.errorCode.UNEXPECTED_END_OF_INPUT)
    if (eqCount > 1)
        return E.newError(E.errorCode.SYNTAX_ERROR)
    return tok;
}
// const thingy:Record<string, state[]>

// type state = {
//     name:string
    
//     check:(c:string) => boolean
// }

// const keyWords = [
//     '++',
//     '--',
//     '+',
//     '-',
//     '=',
//     '==',
//     '!=',
//     '>',
//     '<',
//     '>=',
//     '<=',
//     '/',
//     '%',
//     '*',
//     '**',
//     '^',
//     '(',
//     ')',
//     '[',
//     ']',
// ]

// const literal = /([0-9]+([\.]+)?([0-9]+)?)|([[A-z]+([\d]+)?)/

// // const getNextToken = (input) => keyWords.filter((e) => input.startsWith(e)).reduce((acc, e) => (e.length > acc.length) ? e : acc, '')
// // // const getNextToken = (input:string):string => keyWords.filter((e) => input.startsWith(e))
// // //                                                 .reduce((acc, e) => (e.length > acc.length) ? e : acc, '')

// const tjhjhjhjhjakeWhile = (a:any[] | string, q:any):any[] => {
//     let i = 0;
//     let ret = [];
//     while (i < a.length && q(a[i])) {
//         ret.push(a[i]);
//         i++;
//     }
//     return ret;
// }

// const getLiteral = (input:string):token => {
//     const value = literal.exec(input)[0] || 'fail'
//     return newToken([tokenType.NUMBER, tokenType.VARIABLE][+T.isAlpha(value[0])], value)
// }

// //[\d]+([\.]+)?[\d]+ numbers
// //[A-z]+([\d]+)? letters


// const getNextToken = (input:string):token => {
//     let ret:string = keyWords.filter((e) => input.startsWith(e))
//                         .reduce((acc, e) => (e.length > acc.length) ? e : acc, '');
//     if (literal.test(input[0]))
//         return getLiteral(input);
//     return newToken(tokenType.BINARY, ret)
// }


// export const tokenize = (input:string):token[] => {
//     const tokens:token[] = [];
//     const strToParse:string[] = input.split(' ');
//     strToParse.forEach((s:string) => {
//         let i = 0;
//         let temp;
//         while (i < s.length) {
//             temp = getNextToken(input.slice(i));
//             i += temp.value.length;
//             tokens.push(temp);
//         }
//     })
//     return tokens;
// }