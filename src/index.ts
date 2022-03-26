// import { Parser } from './parser'
import { tokenize } from './tokenizer';
import * as E from './error'

(() => {
    if (process.argv.length < 3)
        E.handle(E.newError(E.errorCode.NOT_ENOUGH_ARGUMENTS));
    var input = process.argv[2];
    if (process.argv.length > 3)
        input = process.argv.slice(2).join('');
    console.log(tokenize(input))
})();
