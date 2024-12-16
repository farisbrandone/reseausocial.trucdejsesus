export interface State {
  stateSideBar: boolean;
  prev: string;
  statePrev: boolean;
}

export type Action =
  | { type: "open"; payload: string }
  | { type: "close"; payload: string }
  | { type: "openPrev"; payload: string }
  | { type: "closePrev"; payload: string };

export function MyReducer(state: State, action: Action): State {
  if (action.type === "open") {
    console.log("zouzou");
    return { stateSideBar: true, prev: state.prev, statePrev: state.statePrev };
  } else if (action.type === "close") {
    return {
      stateSideBar: !state.stateSideBar,
      prev: state.prev,
      statePrev: state.statePrev,
    };
  } else if (action.type === "openPrev") {
    return {
      stateSideBar: state.stateSideBar,
      prev: action.payload,
      statePrev: !state.statePrev,
    };
  } else {
    return state;
  }
}
