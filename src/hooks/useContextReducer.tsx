import { Action, State } from "@/store/MyReducer";
import { createContext, useContext } from "react";

export const Context = createContext<State | null>(null);
export const DispatchContext = createContext<
  React.Dispatch<Action> | undefined
>(undefined);

export function useContextReducer(): [State | null, React.Dispatch<Action>] {
  const state = useContext(Context);
  const dispatch = useContext(DispatchContext) as React.Dispatch<Action>;
  return [state, dispatch];
}
