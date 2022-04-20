export interface ASTnode {
  eval:()=>number
}

export type operation = (a:number, b:number) => number

export class Literal implements ASTnode {
  value:number

  constructor(v:number) {
      this.value = v;
  }

  eval = () => this.value
}

export class Operation implements ASTnode {
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

export const orderOfOp:Record<string, number> = {
  '^': 1,
  '*': 2,
  '/': 2,
  '+': 3,
  '-': 3,
  '=': 4,
}