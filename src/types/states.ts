import { T } from 'mvhou-ts'

export type State = {
    name:string
    next:string[]
    check:(c:string)=>boolean
}

export const states:Record<string, State> = {
    start: {
        name: 'start',
        next: [
            'numeric',
            'variable',
            'unary',
        ],
        check: (c:string)=>c!=c
    },
    numeric: {
        name: 'numeric',
        next: [
            'binary',
            'end'
        ],
        check: (c:string) => T.isNumber(c) || c == '.'
    },
    variable: {
        name: 'variable',
        next: [
            'binary',
            'end'
        ],
        check: T.isAlpha
    },
    unary: {
        name: 'unary',
        next: [
            'numeric',
            'variable',
            'unary'
        ],
        check: (c:string)=>['-', '+'].includes(c)
    },
    binary: {
        name: 'binary',
        next: [
            'numeric',
            'variable',
            'unary'
        ],
        check: (c:string)=>['+','-','/','*', '^', '=', '=='].includes(c)
    },
    end: {
        name: 'end',
        next: [],
        check: (c:string)=>c===undefined
    },
    none: {
        name: 'none',
        next: [],
        check: (c:string)=>c!=c
    }
}