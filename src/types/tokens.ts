export enum tokenType {
    NUMBER = 'NumericLiteral',
    STRING = 'StringLiteral',
    OPERATOR = 'Operator',
    EMPTY = 'Empty'
}

export type token = {
    type:tokenType
    value:string
}
