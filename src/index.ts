import { Parser } from './parser'
import * as Error from './error'

(() => {
    if (process.argv.length < 3)
        Error.handle(0);
    const parser = new Parser(process.argv[2]);
    console.log(parser.parse());
})();

