import { Outlet } from "react-router-dom";
import SidebarComponent from "../sidebarcomponents/SidebarComponent";
import SidebarComponentFictif from "../sidebarcomponents/SidebarComponentFictif";
import { SidebarForMobile } from "../sidebarcomponents/SidebarForMobile";

function MainPage() {
  return (
    <div className="flex">
      <SidebarComponent />
      <SidebarComponentFictif />
      <SidebarForMobile />
      <div className="max-[400px]:w-full min-[400px]:mx-auto flex flex-1 max-[400px]:px-1 max-[980px]:px-3">
        <Outlet />
      </div>
    </div>
  );
}

export default MainPage;
