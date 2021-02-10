export interface IAction<T = null> {
  type: string;
  payload: T;
  params?: {
    signal: AbortSignal;
  };
}

export type IActionFn<T = null, Y = T> = (
  payload: T,
  params?: {
    signal: AbortSignal;
  },
) => IAction<Y>;
