export enum tokenType {
    NUMBER = 'numeric',
    VARIABLE = 'variable',
    BINARY = 'binary',
    UNARY = 'unary',
    EMPTY = 'empty'
}

export type token = {
    type:tokenType
    value:string
}

export const newToken = (t:tokenType, v:string) => ({ type: t, value: v, })
