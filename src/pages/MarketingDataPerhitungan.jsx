import React from "react";
import MarketingSidebar from "../components/Marketing/layout/MarketingSidebar";
import DataPerhitungan from "../components/Marketing/DataPerhitungan";
import DashboardHeader from "../components/Shop/Layout/DashboardHeader";

const MarketingDataPerhitungan = () => {
  return (
    <div>
      <DashboardHeader />
      <div className="w-full flex">
        <div className="flex items-start justify-between w-full">
          <div className="w-[80px] 800px:w-[330px]">
            <MarketingSidebar active={6} />
          </div>
          <DataPerhitungan />
        </div>
      </div>
    </div>
  );
};

export default MarketingDataPerhitungan;
