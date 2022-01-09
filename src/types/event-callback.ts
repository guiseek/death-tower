import { Callback } from './callback'
import { Records } from './records'

export type EventCallback<M extends Records<Callback<keyof M>>> = Map<
  keyof M,
  Callback<M[keyof M]>[]
>
