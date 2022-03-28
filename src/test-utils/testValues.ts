import { token, tokenType } from '../tokens'

export type tokenizerTest = {
    input:string
    output:token[]
}

export const validTests:tokenizerTest[] = [
    {
        input: "x^2=4",
        output: [
            { type: tokenType.STRING, value: 'x' },
            { type: tokenType.OPERATOR, value: '^' },
            { type: tokenType.NUMBER, value: '2' },
            { type: tokenType.OPERATOR, value: '=' },
            { type: tokenType.NUMBER, value: '4' }
        ]
    },
    {
        input: "4*x^2=16",
        output: [
            { type: tokenType.NUMBER, value: '4' },
            { type: tokenType.OPERATOR, value: '*' },
            { type: tokenType.STRING, value: 'x' },
            { type: tokenType.OPERATOR, value: '^' },
            { type: tokenType.NUMBER, value: '2' },
            { type: tokenType.OPERATOR, value: '=' },
            { type: tokenType.NUMBER, value: '16' }
        ]
    },
    {
        input: "3*2^2=x",
        output: [
            { type: tokenType.NUMBER, value: '3' },
            { type: tokenType.OPERATOR, value: '*' },
            { type: tokenType.NUMBER, value: '2' },
            { type: tokenType.OPERATOR, value: '^' },
            { type: tokenType.NUMBER, value: '2' },
            { type: tokenType.OPERATOR, value: '=' },
            { type: tokenType.STRING, value: 'x' }
        ]
    },
]

export const invalidTests:tokenizerTest[] = [
    {
        input: "",
        output: []
    }
]