export enum tokenType {
    NUMBER = 'numeric',
    VARIABLE = 'variable',
    BINARY = 'operator',
    UNARY = 'operator',
    EMPTY = 'empty'
}

export type token = {
    type:tokenType
    value:string
}

export const newToken = (t:tokenType, v:string) => ({ type: t, value: v, })
