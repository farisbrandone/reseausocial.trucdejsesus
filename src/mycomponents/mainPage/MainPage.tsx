import { Outlet } from "react-router-dom";
import SidebarComponent from "../sidebarcomponents/SidebarComponent";
import SidebarComponentFictif from "../sidebarcomponents/SidebarComponentFictif";
import { SidebarForMobile } from "../sidebarcomponents/SidebarForMobile";
/* import { useEffect, useState } from "react"; */
import {
  GroupeDataType,
  /*  requestTogetAllGroupeData, */
} from "../../../seedAndGetData/seedData";

function MainPage({ groupeData }: { groupeData: GroupeDataType[] }) {
  /*  const [groupeState, setGroupeState] = useState<GroupeDataType[]>(); */

  /* useEffect(() => {
    const getGroupeData = async () => {
      const result = await requestTogetAllGroupeData();
      setGroupeState([...result]);
    };

    getGroupeData();
  }, []); */

  return (
    <div className="flex">
      <SidebarComponent />
      <SidebarComponentFictif groupeState={groupeData} />
      <SidebarForMobile groupeState={groupeData} />
      <div className="max-[400px]:w-full min-[400px]:mx-auto flex flex-1 max-[400px]:px-1 max-[980px]:px-3">
        <Outlet />
      </div>
    </div>
  );
}

export default MainPage;
