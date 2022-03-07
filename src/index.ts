import { Parser } from './parser'
import * as Error from './error'

(() => {
    if (process.argv.length < 3)
        Error.handle(Error.type.NOT_ENOUGH_ARGUMENTS);
    const parser = new Parser(process.argv[2]);
    console.log(parser.parse());
})();

