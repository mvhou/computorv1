import { BinOp, Literal, ASTnode, UnOp, operation } from "./types/parser"
import { token } from './types/tokens'
import * as E from './error'

const opMap:Record<string, operation> = {
  '~': (a)  => +a,
  '_': (a)  => -a,
  '=': (a,b)=> +(a == b),
  '+': (a,b)=> a + b,
  '-': (a,b)=> a - b,
  '*': (a,b)=> a * b,
  '/': (a,b)=> a / b,
  '^': (a,b)=> Math.pow(a, b)
}

const orderOfOp = (a:string):number => ({
  '~': 1,
  '_': 1,
  '!': 1,
  '^': 2,
  '*': 3,
  '/': 3,
  '+': 4,
  '-': 4,
  '=': 6,
}[a] || -1)


export const parse = (tokens:token[]):ASTnode => {
  console.log(tokens)
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
  // console.log(tokens[next])
  if (['~', '_'].includes(tokens[next].value))
    return new UnOp(parse(tokens.slice(1)), [(a:number)=>-a,(a:number)=>+a][+(tokens[0].value == '~')] )
  return new BinOp(parse(tokens.slice(0, next)), parse(tokens.slice(next+1)), opMap[tokens[next].value])
}
