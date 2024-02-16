import React from "react";
import MarketingSidebar from "../components/Marketing/layout/MarketingSidebar";
import DataHasilAkhir from "../components/Marketing/DataHasilAkhir";
import DashboardHeader from "../components/Shop/Layout/DashboardHeader";

const MarketingDataHasilAkhir = () => {
  return (
    <div>
      <DashboardHeader />
      <div className="w-full flex">
        <div className="flex items-start justify-between w-full">
          <div className="w-[80px] 800px:w-[330px]">
            <MarketingSidebar active={7} />
          </div>
          <DataHasilAkhir />
        </div>
      </div>
    </div>
  );
};

export default MarketingDataHasilAkhir;
