export function parsify<T>(obj: T): NonNullable<T> {
  return JSON.parse(JSON.stringify(obj));
}
