import React from "react";
import MarketingSidebar from "../components/Marketing/layout/MarketingSidebar";
import MarketingDashboardMain from "../components/Marketing/MarketingDashboardMain";
import AdminHeader from "../components/Layout/AdminHeader";

const MarketingDashboardPages = () => {
  return (
    <div>
      <AdminHeader />
      <div className="w-full flex">
        <div className="flex items-start justify-between w-full">
          <div className="w-[80px] 800px:w-[330px]">
            <MarketingSidebar active={1} />
          </div>
          <MarketingDashboardMain />
        </div>
      </div>
    </div>
  );
};

export default MarketingDashboardPages;
