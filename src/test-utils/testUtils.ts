import { token, tokenType } from '../types/tokens'

export const getSingleToken = (t:token):string => `{ type: ${t.type}, value: ${t.value} }`

export const getTokens = (t:token[]):string[] => t.map(x => getSingleToken(x))