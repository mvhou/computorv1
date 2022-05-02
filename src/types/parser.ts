export interface ASTnode {
  eval:()=>number
}

export type binaryOperation = (a:number, b:number) => number;

export type unaryOperation = (a:number) => number;

export class Literal implements ASTnode {
  value:number

  constructor(v:number) {
      this.value = v;
  }

  eval = () => this.value
}

export class UnOp implements ASTnode {
  op:unaryOperation
  numThing:ASTnode

  constructor(n:ASTnode,o:unaryOperation) {
    this.numThing = n;
    this.op = o;
  }

  eval = () => (this.op(this.numThing.eval()))
}

export class BinOp implements ASTnode {
  op:binaryOperation
  left:ASTnode
  right:ASTnode

  constructor(l:ASTnode, r:ASTnode, o:binaryOperation) {
      this.op = o;
      this.left = l;
      this.right = r;
  }

  eval = () => this.op(this.left.eval(), this.right.eval())
}

export const orderOfOp:Record<string, number> = {
  '^': 1,
  '*': 2,
  '/': 2,
  '+': 3,
  '-': 3,
  '=': 4,
}

export enum operators {
  UNARY,

}