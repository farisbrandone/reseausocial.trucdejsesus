import { Outlet } from "react-router-dom";
import { CommunityDataType } from "../../../seedAndGetData/seedData";
import SidebarComponentCommunity from "../sidebarCommunity/SidebarComponentCommunity";
import SidebarComponentFictifCommunity from "../sidebarCommunity/SidebarComponentFictifCommunity";
import { SidebarForMobileCommunity } from "../sidebarCommunity/SidebarForMobileCommunity";

function MainPageCommunity({
  communityData,
}: {
  communityData: CommunityDataType[];
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
    <div className="flex">
      <SidebarComponentCommunity />
      <SidebarComponentFictifCommunity communityData={communityData} />
      <SidebarForMobileCommunity communityState={communityData} />
      <div className="max-[400px]:w-full min-[400px]:mx-auto flex flex-1 max-[400px]:px-1 max-[980px]:px-1">
        <Outlet />
      </div>
    </div>
  );
}

export default MainPageCommunity;
