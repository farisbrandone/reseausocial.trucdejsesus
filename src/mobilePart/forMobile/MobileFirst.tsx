import { useState } from "react";
import "./index.css";
import { BodyDashbord } from "./components/BodyDashbord";
import { FooterDashboard } from "./components/FooterDashboard";
import { HeaderDashboard } from "./components/HeaderDashboard";

function MobileFirst() {
  const [loading, setLoading] = useState(true);

  if (loading) {
    return (
      <div className="w-[100vw] h-[100vh] flex items-center justify-center ">
        <HeaderDashboard loading={loading} setLoading={setLoading} />
        <span className="loading loading-spinner loading-lg text-[#bd10e0] "></span>
      </div>
    );
  }

  return (
    <>
      <HeaderDashboard loading={loading} setLoading={setLoading} />

      <div className="max-w-[100vw] sm:max-w-[1200px] m-auto mt-[80px] flex items-center">
        <BodyDashbord />
      </div>
      <footer className="w-[100vw] grid place-items-center z-[100000] fixed ">
        <FooterDashboard />
      </footer>
    </>
  );
}

export default MobileFirst;
