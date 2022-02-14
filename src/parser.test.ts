import { Parser } from './parser'

const p = new Parser();

describe('1 + 1', () => {
    test('should return "[1, +, 1]" for parser("1 + 1")', () => {
        expect(p.parse("1 + 1")).toStrictEqual(["1", "+", "1"]);
    });
});