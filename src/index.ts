import { parse } from './parser'
import { tokenize } from './tokenizer';
import * as E from './error'
import util from 'util'

(() => {
    if (process.argv.length < 3)
        E.handle(E.newError(E.errorCode.NOT_ENOUGH_ARGUMENTS));
    var input = process.argv[2];
    if (process.argv.length > 3)
        input = process.argv.slice(2).join('');
    var tokens = tokenize(input);
    console.log(util.inspect(parse(tokens), {showHidden: false, depth: null, colors: true}));
    ([console.log, E.handle][+E.isError(tokens)])(tokens)
})();