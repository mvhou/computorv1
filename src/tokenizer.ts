import { T } from 'mvhou-ts';
import * as E from './error'
import { State, states } from './types/states'

export type tokenizerState = {
    state:State
    input:string
    cursor:number
    tokens:string[]
}

const keywords = [
    '+',
    '-',
    '=',
    '==',
    '!=',
    '>',
    '<',
    '>=',
    '<=',
    '/',
    '%',
    '*',
    '**',
    '^',
    '(',
    ')',
    '[',
    ']',
]

// const getNum = (input:string):string => (input.match(/[+-]?([0-9]*[.])?[0-9]+/) || [''])[0]

const getNum = (input:string):string => {
    var i = 0;
    while (T.isNumber(input[i]))
        i++;
    if (input[i] == '.')
        i++;
    while (T.isNumber(input[i]))
        i++;
    console.log(input.slice(0, i))
    return input.slice(0, i)    
}

const getUnary =  (input:string):string => ({ '-': '_', '+': '~'}[input[0]]) || '_'

const getVar = (input:string):string => {
    var i = 0;
    while (T.isAlpha(input[i]))
        i++;
    return input.slice(0, i);
}

const axiones:Record<string, (a:string)=>string> = {
    unary: getUnary,
    binary: (a)=>a,
    numeric: getNum,
    variable: getVar
}

const newState = (tok:tokenizerState):tokenizerState => {
    // console.log(tok)
    while (T.isSpace(tok.input[tok.cursor]))
        tok.cursor++
    const inp = tok.input.slice(tok.cursor);
    
    const next:string = keywords.filter((e) => inp.startsWith(e))
                                .reduce((acc, e) => (e.length > acc.length) ? e : acc, '') || getNum(inp) || getVar(inp)
    tok.state = states[tok.state.next.reduce((acc, x) => (states[x].check(next)) ? x : acc, 'none')]
    console.log(tok, next, inp, inp.length)

    if (tok.state.name == 'end' || tok.state.name == 'none')
        return tok
    if (tok.state.name == 'unary')
        tok.tokens.push(getUnary(next))
    else
        tok.tokens.push(next);
    // else if (tok.state.name == 'end' || tok.state.name == 'none')
    //     return tok;
    // else
    //     tok.tokens.push(axiones[tok.state.name](tok.input.slice(tok.cursor)))
    tok.cursor += tok.tokens[tok.tokens.length - 1].length;
    return newState(tok)
}

export const tokenize = (input:string):tokenizerState => newState({
        state: states['start'],
        input: input,
        cursor: 0,
        tokens: []
    });

export const validateInput = (tok:tokenizerState):string[] => {
    if ((tok.cursor >= tok.input.length && tok.state.name != 'end') || tok.state.name === 'none')
        E.handle(E.newError(E.errorCode.SYNTAX_ERROR, tok.cursor+1, tok.input));
    return tok.tokens;
}

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