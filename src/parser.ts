export const parser = (input: string):string[] => {
    return input.split('').filter(a => a != ' ');
}