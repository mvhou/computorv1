import { tokenize } from '../tokenizer'
import { validTests, invalidTests, tokenizerTest } from '../test-utils/testValues'
import { getTokens } from '../test-utils/testUtils'


describe('Valid input', () => {
    validTests.forEach((t:tokenizerTest) => test(
        `Should return ${JSON.stringify(t.output)} for tokenize("${t.input}")`,
        () => expect(tokenize(t.input)).toStrictEqual(t.output)
    ))
})

// describe('Invalid input', () => {
//     invalidTests.forEach((t:tokenizerTest) => test(
//         `Should return ${JSON.stringify(t.output)} for tokenize("${t.input}")`,
//         () => expect(tokenize(t.input)).toStrictEqual(t.output)
//     ))
// })