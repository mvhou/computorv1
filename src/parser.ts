import { Operation, Literal, operation, ASTnode } from "./types/parser"
import { token } from './types/tokens'
import * as E from './error'

const opMap:Record<string, operation> = {
  '=': (a,b)=> +(a == b),
  '+': (a,b)=> a + b,
  '-': (a,b)=> a - b,
  '*': (a,b)=> a * b,
  '/': (a,b)=> a / b,
  '^': (a,b)=> Math.pow(a, b)
}

// export const orderOfOp:Record<string, number> = {
//   '^': 1,
//   '*': 2,
//   '/': 2,
//   '+': 3,
//   '-': 3,
//   '=': 4,
// }

const orderOfOp = (a:string):number => ({
  '^': 1,
  '*': 2,
  '/': 2,
  '+': 3,
  '-': 3,
  '=': 4,
}[a] || -1)


export const parse = (tokens:token[]):ASTnode => {
  if (tokens.length === 0) {
    E.handle(E.newError(E.errorCode.SYNTAX_ERROR))
  }
  if (tokens.length === 1) 
      return new Literal(+tokens[0].value)
  const next = tokens.reduce((acc, x, idx) => {
      if (orderOfOp(x.value) >= orderOfOp(tokens[acc].value))
          return idx
      return acc
  }, 0)
  //if bracket -> new Bracket?(parse(slice until proper closing bracket), ()=>next.value)
  return new Operation(parse(tokens.slice(0, next)), parse(tokens.slice(next+1)), opMap[tokens[next].value])
}
