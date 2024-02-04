import React from "react";
import AdminHeader from "../components/Layout/AdminHeader";
import DataKriteria from "../components/Marketing/DataKriteria";
import MarketingSidebar from "../components/Marketing/layout/MarketingSidebar";

const MarketingDataKriteria = () => {
  return (
    <div>
      <AdminHeader />
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
