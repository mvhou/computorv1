export enum Tokens {
    Number = 'NumericLiteral',
    Empty = 'Empty'
}

export interface Token {
    type:Tokens
}

export class NumericLiteral implements Token {
    type:Tokens
    value:number

    constructor(value:string) {
        this.type = Tokens.Number
        this.value = +value
    }
}

export class EmptyToken implements Token {
    type:Tokens

    constructor() {
        this.type = Tokens.Empty
    }
}