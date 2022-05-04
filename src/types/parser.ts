export interface ASTnode {
  eval:()=>number
}

export type operation = (...arg:number[]) => number
export class Literal implements ASTnode {
  value:number

  constructor(v:number) {
      this.value = v;
  }

  eval = () => this.value
}

export class UnOp implements ASTnode {
  op:operation
  numThing:ASTnode

  constructor(n:ASTnode,o:operation) {
    this.numThing = n;
    this.op = o;
  }

  eval = () => (this.op(this.numThing.eval()))
}

export class BinOp implements ASTnode {
  op:operation
  left:ASTnode
  right:ASTnode

  constructor(l:ASTnode, r:ASTnode, o:operation) {
      this.op = o;
      this.left = l;
      this.right = r;
  }

  eval = () => this.op(this.left.eval(), this.right.eval())
}
