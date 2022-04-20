import { Operation, Literal, operation, ASTnode, orderOfOp  } from "./types/parser"
import { token } from './types/tokens'

const opMap:Record<string, operation> = {
  '=': (a,b)=> +(a == b),
  '+': (a,b)=> a + b,
  '-': (a,b)=> a + b,
  '*': (a,b)=> a * b,
  '/': (a,b)=> a / b,
  '^': (a,b)=> Math.pow(a, b)
}

const opOrder = (a:string):number => orderOfOp[a] || -1


export const parse = (tokens:token[]):ASTnode => {
  if (tokens.length === 1) 
      return new Literal(+tokens[0].value)
  const next = tokens.reduce((acc, x, idx) => {
      if (opOrder(x.value) > opOrder(tokens[acc].value))
          return idx
      return acc
  }, 0)
  return new Operation(parse(tokens.slice(0, next)), parse(tokens.slice(next+1)), opMap[tokens[next].value])
}
