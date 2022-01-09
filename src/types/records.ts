export type Records<T> = { [K in keyof T]: T[K] }
