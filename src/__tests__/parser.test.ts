import { parse } from '../parser'
import { tokenize } from '../tokenizer'

describe('Basic test', () => {
    test('parse(1 + 1 = 2)', 
    ()=> expect(parse(tokenize("1+1=2"))).toStrictEqual({
        type: "=",
        left: {
            type: "+",
            left: {
                type: "number",
                value: "1"
            },
            right: {
                type: "number",
                value: "1"
            }
        },
        right: {
            type: "number",
            value: "2"
        }
    }))
})