export enum Tokens {
    Number
}

export class NumericLiteral {
    type:string
    value:number

    constructor(value:string) {
        this.type = "NumericLiteral"
        this.value = +value
    }
}