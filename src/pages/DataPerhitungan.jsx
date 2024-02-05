import React from "react";
import AdminHeader from "../components/Layout/AdminHeader";
import MarketingSidebar from "../components/Marketing/layout/MarketingSidebar";

const DataPerhitungan = () => {
  return (
    <div>
      <AdminHeader />
      <div className="w-full flex">
        <div className="flex items-start justify-between w-full">
          <div className="w-[80px] 800px:w-[330px]">
            <MarketingSidebar active={6} />
          </div>
          {/* tombol tambah data */}
          <DataPerhitungan />
        </div>
      </div>
    </div>
  );
};

export default DataPerhitungan;