export enum Tokens {
    Number = 'NumericLiteral',
    String = 'StringLiteral',
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

export class StringLiteral implements Token {
    type:Tokens
    name:string

    constructor(name:string) {
        this.type = Tokens.String
        this.name = name
    }
}

export class EmptyToken implements Token {
    type:Tokens

    constructor() {
        this.type = Tokens.Empty
    }
}