export enum tokenType {
    NUMBER = 'NumericLiteral',
    STRING = 'StringLiteral',
    ADD = 'AddOperator',
    EMPTY = 'Empty'
}

export type token = {
    type:tokenType
    
}

// export interface Token {
//     type:Tokens
// }

// export class BinaryExpression implements Token {
//     type:Tokens
//     left:Token
//     right:Token

//     constructor(left:Token, right:Token, type:Tokens) {
//         this.type = type
//         this.left = left
//         this.right = right
//     }
// }

// export class Add extends BinaryExpression {
//     constructor(left:Token, right:Token, type:Tokens) {
//         super(left, right, type);
//     }
// }

// export class NumericLiteral implements Token {
//     type:Tokens
//     value:number

//     constructor(value:number) {
//         this.type = Tokens.NUMBER
//         this.value = value
//     }
// }

// export class StringLiteral implements Token {
//     type:Tokens
//     name:string

//     constructor(name:string) {
//         this.type = Tokens.STRING
//         this.name = name
//     }
// }

// export class EmptyToken implements Token {
//     type:Tokens

//     constructor() {
//         this.type = Tokens.EMPTY
//     }
// }