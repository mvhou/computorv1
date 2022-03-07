export enum type {
    NOT_ENOUGH_ARGUMENTS,
    UNEXPECTED_END_OF_INPUT
}

export class ErrorContext {
    _cursor:number
    _contextString:string

    constructor(contextString:string, cursor:number=-1) {
        this._contextString = contextString
        this._cursor = cursor
    }
}

export const handle = (code:number, context:ErrorContext|null=null) => {
    const errorPrefix:string = "[ERROR]"
    const errors:string[] = [
        'Not enough arguments',
        'Unexpected end of input'
    ];
    console.log(errorPrefix, errors[code]);
    process.exit();
}