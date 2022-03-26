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
            'string',
            'sign',
        ],
        check: (c:string)=>c!=c
    },
    numeric: {
        name: 'numeric',
        next: [
            'string',
            'operator',
            'end'
        ],
        check: T.isNumber
    },
    string: {
        name: 'string',
        next: [
            'operator',
            'end'
        ],
        check: T.isAlpha
    },
    sign: {
        name: 'sign',
        next: [
            'numeric',
            'string'
        ],
        check: (c:string)=>c=='-'
    },
    operator: {
        name: 'operator',
        next: [
            'numeric',
            'string',
            'sign'
        ],
        check: (c:string)=>['+','-','/','*', '^', '='].includes(c)
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