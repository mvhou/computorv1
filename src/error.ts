export enum errorCode {
    NOT_ENOUGH_ARGUMENTS,
    UNEXPECTED_END_OF_INPUT,
    INCORRECT_NUMBER,
    SYNTAX_ERROR,
}

export type err = {
    position:number
    context:string
    code:errorCode
}

export const newError = (c:errorCode, pos:number=0, ctx:string='') => {
    return {
        position: pos,
        context: ctx,
        code: c
    }
}

const contextString = (error:err) => `${error.position}\t-> ${error.context}`;

export const handle = (error:err) => {
    const errorPrefix:string = "[ERROR]"
    const errors:string[] = [
        'Not enough arguments',
        'Unexpected end of input',
        'Incorrect numeric literal',
        'Syntax error'
    ];
    console.log(errorPrefix, errors[error.code]);
    if (error.position)
        console.log(contextString(error));
    process.exit();
}