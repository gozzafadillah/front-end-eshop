import React from "react";
import AdminHeader from "../components/Layout/AdminHeader";
import MarketingSidebar from "../components/Marketing/layout/MarketingSidebar";
import DataPenilaian from "../components/Marketing/DataPenilaian";

const MarketingDataPenilaian = () => {
  return (
    <div>
      <AdminHeader />
      <div className="w-full flex">
        <div className="flex items-start justify-between w-full">
          <div className="w-[80px] 800px:w-[330px]">
            <MarketingSidebar active={5} />
          </div>
          <DataPenilaian />
        </div>
      </div>
    </div>
  );
};

export default MarketingDataPenilaian;
