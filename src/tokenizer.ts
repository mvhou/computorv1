import { T } from 'mvhou-ts';
import * as E from './error'
import { State, states } from './states'
import { token, tokenType } from './types/tokens'

interface Tokenizer {
    generateToken:(tok:tokenizerState)=>tokenizerState
}

export type tokenizerState = {
    state:State
    input:string
    cursor:number
    sign:number
    tokens:token[]
}

class NumericToken implements Tokenizer {
    generateToken(tok:tokenizerState):tokenizerState {
        var start = tok.cursor;
        while (T.isNumber(tok.input[tok.cursor]) || tok.input[tok.cursor] == '.')
            tok.cursor++
        var newNumber = ['', '-'][tok.sign] + tok.input.slice(start, tok.cursor)
        if (isNaN(+newNumber))
            E.handle(E.newError(E.errorCode.INCORRECT_NUMBER, start, newNumber+""))
        tok.tokens.push({ type: tokenType.NUMBER, value: newNumber });
        tok.sign = 0;
        return tok
    }
}

class StringToken implements Tokenizer {
    generateToken(tok:tokenizerState):tokenizerState {
        var newString = ['', '-'][tok.sign];
        while (T.isAlpha(tok.input[tok.cursor]))
            newString += tok.input[tok.cursor++]
        tok.tokens.push({ type: tokenType.STRING, value: newString });
        tok.sign = 0;
        return tok
    }
}

class OperatorToken implements Tokenizer {
    generateToken(tok:tokenizerState):tokenizerState {
        tok.tokens.push({ type: tokenType.OPERATOR, value: tok.input[tok.cursor] })
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



export const tokenize = (input:string):token[] => {
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
    return tok.tokens;
}

const validateInput = (tok:tokenizerState):token[] | E.err => {
    if (tok.cursor >= tok.input.length && tok.state.name != 'end')
        return E.newError(E.errorCode.UNEXPECTED_END_OF_INPUT)
    if (tok.state.name === 'none')
        return E.newError(E.errorCode.SYNTAX_ERROR, tok.cursor+1, tok.input[tok.cursor])
    var eqCount = tok.tokens.reduce((acc, x) => acc + ((x.value == '=') ? 1 : 0),0);
    if (eqCount == 0)
        return E.newError(E.errorCode.UNEXPECTED_END_OF_INPUT)
    if (eqCount > 1)
        return E.newError(E.errorCode.SYNTAX_ERROR)
    return tok.tokens
}

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

// const getNextToken = (input) => keyWords.filter((e) => input.startsWith(e)).reduce((acc, e) => (e.length > acc.length) ? e : acc, '')
// // const getNextToken = (input:string):string => keyWords.filter((e) => input.startsWith(e))
// //                                                 .reduce((acc, e) => (e.length > acc.length) ? e : acc, '')

// const tokenize = (input:string):token[] => {
//     const strToParse = input.split(' ');
//     strToParse.forEach((s) => {

//     })
//     return []
// }