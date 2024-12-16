import { Outlet } from "react-router-dom";
import SidebarComponent from "../sidebarcomponents/SidebarComponent";
import SidebarComponentFictif from "../sidebarcomponents/SidebarComponentFictif";
import { SidebarForMobile } from "../sidebarcomponents/SidebarForMobile";
/* import { useEffect, useState } from "react"; */
import {
  CommunityDataType,
  GroupeDataType,
  /*  requestTogetAllGroupeData, */
} from "../../../seedAndGetData/seedData";
import { Action, MyReducer, State } from "@/store/MyReducer";
import { useReducer } from "react";
import { Context, DispatchContext } from "@/hooks/useContextReducer";

function MainPage({
  groupeData,
  value,
}: {
  groupeData: GroupeDataType[];
  value: CommunityDataType;
}) {
  const [state, dispatch] = useReducer<React.Reducer<State, Action>>(
    MyReducer,
    { stateSideBar: false, statePrev: false, prev: "" }
  );

  return (
    <Context.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        <div className="flex gap-1">
          <SidebarComponent />
          <SidebarComponentFictif groupeState={groupeData} val={value} />
          <SidebarForMobile groupeState={groupeData} val={value} />
          <div className="max-[400px]:w-full min-[400px]:mx-auto flex flex-1 max-[400px]:px-1 max-[980px]:px-3">
            <Outlet />
          </div>
        </div>
      </DispatchContext.Provider>
    </Context.Provider>
  );
}

export default MainPage;
