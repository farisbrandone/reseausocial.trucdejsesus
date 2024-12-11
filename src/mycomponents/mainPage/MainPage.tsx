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

function MainPage({
  groupeData,
  value,
}: {
  groupeData: GroupeDataType[];
  value: CommunityDataType;
}) {
  /*  const [groupeState, setGroupeState] = useState<GroupeDataType[]>(); */

  /* useEffect(() => {
    const getGroupeData = async () => {
      const result = await requestTogetAllGroupeData();
      setGroupeState([...result]);
    };

    getGroupeData();
  }, []); */

  return (
    <div className="flex gap-1">
      <SidebarComponent />
      <SidebarComponentFictif groupeState={groupeData} val={value} />
      <SidebarForMobile groupeState={groupeData} val={value} />
      <div className="max-[400px]:w-full min-[400px]:mx-auto flex flex-1 max-[400px]:px-1 max-[980px]:px-3">
        <Outlet />
      </div>
    </div>
  );
}

export default MainPage;
