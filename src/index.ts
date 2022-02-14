const hW = 'world';

export function hello(world: string = hW): string {
  return `Hello ${world}!`;
}