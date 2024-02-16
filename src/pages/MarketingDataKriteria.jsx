import React from "react";
import DataKriteria from "../components/Marketing/DataKriteria";
import MarketingSidebar from "../components/Marketing/layout/MarketingSidebar";
import DashboardHeader from "../components/Shop/Layout/DashboardHeader";

const MarketingDataKriteria = () => {
  return (
    <div>
      <DashboardHeader />
      <div className="w-full flex">
        <div className="flex items-start justify-between w-full">
          <div className="w-[80px] 800px:w-[330px]">
            <MarketingSidebar active={2} />
          </div>
          {/* tombol tambah data */}
          <DataKriteria />
        </div>
      </div>
    </div>
  );
};

export default MarketingDataKriteria;
