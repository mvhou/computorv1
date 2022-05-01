import { token, tokenType } from '../types/tokens'
import * as E from '../error'

export type tokenizerTest = {
    input:string
    output:any
}

export const validTests:tokenizerTest[] = [
    {
        input: "x^2=4",
        output: [
            { type: tokenType.VARIABLE, value: 'x' },
            { type: tokenType.BINARY, value: '^' },
            { type: tokenType.NUMBER, value: '2' },
            { type: tokenType.BINARY, value: '=' },
            { type: tokenType.NUMBER, value: '4' }
        ]
    },
    {
        input: "4*x^2=16",
        output: [
            { type: tokenType.NUMBER, value: '4' },
            { type: tokenType.BINARY, value: '*' },
            { type: tokenType.VARIABLE, value: 'x' },
            { type: tokenType.BINARY, value: '^' },
            { type: tokenType.NUMBER, value: '2' },
            { type: tokenType.BINARY, value: '=' },
            { type: tokenType.NUMBER, value: '16' }
        ]
    },
    {
        input: "3*2^2=x",
        output: [
            { type: tokenType.NUMBER, value: '3' },
            { type: tokenType.BINARY, value: '*' },
            { type: tokenType.NUMBER, value: '2' },
            { type: tokenType.BINARY, value: '^' },
            { type: tokenType.NUMBER, value: '2' },
            { type: tokenType.BINARY, value: '=' },
            { type: tokenType.VARIABLE, value: 'x' }
        ]
    },
]

export const invalidTests:tokenizerTest[] = [
    {
        input: "",
        output: {code: E.errorCode.UNEXPECTED_END_OF_INPUT, context: "", position: 0}
    },
    {
        input: "1",
        output: {code: E.errorCode.UNEXPECTED_END_OF_INPUT, context: "", position: 0}
    },
    {
        input: "1+",
        output: {code: E.errorCode.UNEXPECTED_END_OF_INPUT, context: "", position: 0}
    },
    {
        input: "1+1",
        output: {code: E.errorCode.UNEXPECTED_END_OF_INPUT, context: "", position: 0}
    },
    {
        input: "1+1=",
        output: {code: E.errorCode.UNEXPECTED_END_OF_INPUT, context: "", position: 0}
    },
]