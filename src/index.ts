import { parse } from './parser'
import { tokenize, validateInput } from './tokenizer';
import * as E from './error'
import util from 'util'

(() => {
    if (process.argv.length < 3)
        E.handle(E.newError(E.errorCode.NOT_ENOUGH_ARGUMENTS));
    var input = process.argv[2];
    if (process.argv.length > 3)
        input = process.argv.slice(2).join('');
    var tokens = validateInput(tokenize(input));
    var syntaxTree = parse(tokens);
    // console.log(util.inspect(syntaxTree, {showHidden: false, depth: null, colors: true}));
    console.log(syntaxTree.eval());
    // ([console.log, E.handle][+E.isError(tokens)])(tokens)
})();