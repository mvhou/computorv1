export enum type {
    NOT_ENOUGH_ARGUMENTS,
    UNEXPECTED_END_OF_INPUT,
    INCORRECT_NUMBER
}

export class ErrorContext {
    cursor:number
    contextString:string

    constructor(contextString:string, cursor:number=-1) {
        this.contextString = contextString
        this.cursor = cursor
    }
}

const contextString = (context:ErrorContext) => `${context.contextString} at position ${context.cursor}`;

export const handle = (code:number, context:ErrorContext|null=null) => {
    const errorPrefix:string = "[ERROR]"
    const errors:string[] = [
        'Not enough arguments',
        'Unexpected end of input',
        'Incorrect numeric literal'
    ];
    console.log(errorPrefix, errors[code]);
    if (context)
        console.log(contextString(context));
    process.exit();
}