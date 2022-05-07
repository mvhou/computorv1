import { S } from 'mvhou-ts'

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

export const isError = (a:any): a is err => a.position !== undefined

const contextString = (error:err) => `${S.padFront(error.context, error.context.length)}`;

export const handle = (error:err) => {
    const errors:string[] = [
        'Not enough arguments',
        'Unexpected end of input',
        'Incorrect numeric literal',
        'Syntax error'
    ];
    console.log(errors[error.code], ((error.position > 0) ? `at position ${error.position}` : ''));
    if (error.position) {
        console.log(contextString(error));
        console.log(S.padFront('^', error.position));
    }
    process.exit();
}
