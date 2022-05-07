import { T } from 'mvhou-ts'
import { tokenType } from './tokens'

export type State = {
    name:string
    next:string[]
    check:(c:string)=>boolean
}

export const states:Record<string, State> = {
    start: {
        name: 'start',
        next: [
            tokenType.NUMBER,
            tokenType.VARIABLE,
            tokenType.UNARY,
            tokenType.PARENTHESES_OPEN
        ],
        check: (c:string)=>c!=c
    },
    numeric: {
        name: tokenType.NUMBER,
        next: [
            tokenType.BINARY,
            tokenType.END,
            tokenType.PARENTHESES_CLOSE
        ],
        check: (c:string) => T.isNumber(c) || c == '.'
    },
    variable: {
        name: tokenType.VARIABLE,
        next: [
            tokenType.BINARY,
            tokenType.END,
            tokenType.PARENTHESES_CLOSE
        ],
        check: T.isAlpha
    },
    unary: {
        name: tokenType.UNARY,
        next: [
            tokenType.NUMBER,
            tokenType.VARIABLE,
            tokenType.UNARY,
            tokenType.PARENTHESES_OPEN
        ],
        check: (c:string)=>['-', '+'].includes(c)
    },
    binary: {
        name: tokenType.BINARY,
        next: [
            tokenType.NUMBER,
            tokenType.VARIABLE,
            tokenType.UNARY,
            tokenType.PARENTHESES_OPEN
        ],
        check: (c:string)=>['+','-','/','*', '^', '=', '=='].includes(c)
    },
    p_open: {
        name: tokenType.PARENTHESES_OPEN,
        next: [
            tokenType.NUMBER,
            tokenType.VARIABLE,
            tokenType.UNARY,
            tokenType.PARENTHESES_OPEN,
            tokenType.PARENTHESES_CLOSE,
        ],
        check: (c:string)=>c=='('
    },
    p_close: {
        name: tokenType.PARENTHESES_CLOSE,
        next: [
            tokenType.BINARY,
            tokenType.PARENTHESES_OPEN,
            tokenType.PARENTHESES_CLOSE,
            tokenType.END
        ],
        check: (c:string)=>c==')'
    },
    end: {
        name: tokenType.END,
        next: [],
        check: (c:string)=>c===undefined || c == ''
    },
    none: {
        name: 'none',
        next: [],
        check: (c:string)=>c!=c
    }
}