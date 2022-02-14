import { parser } from './parser'

describe('1 + 1', () => {
    test('should return "[1, +, 1]" for parser("1 + 1")', () => {
        expect(parser("1 + 1")).toStrictEqual(["1", "+", "1"]);
    });
});