import React from "react";
import { AiOutlineSetting } from "react-icons/ai";
import { FiShoppingBag } from "react-icons/fi";
import { GrWorkshop } from "react-icons/gr";
import {
  HiDatabase,
  HiOutlineArchive,
  HiOutlineCalculator,
  HiOutlineChartSquareBar,
} from "react-icons/hi";
import { RxDashboard } from "react-icons/rx";
import { Link } from "react-router-dom";

const MarketingSidebar = ({ active }) => {
  return (
    <div className="w-full h-[90vh] bg-white shadow-sm overflow-y-scroll sticky top-0 left-0 z-10">
      {/* single item */}

      <div className="w-full flex items-center p-4">
        <Link to="/dashboard" className="w-full flex items-center">
          <RxDashboard
            size={30}
            color={`${active === 1 ? "crimson" : "#555"}`}
          />
          <h5
            className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
              active === 1 ? "text-[crimson]" : "text-[#555]"
            }`}
          >
            Dashboard
          </h5>
        </Link>
      </div>

      <div className="w-full flex items-center p-4">
        <Link to="/data-kriteria" className="w-full flex items-center">
          <FiShoppingBag
            size={30}
            color={`${active === 2 ? "crimson" : "#555"}`}
          />
          <h5
            className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
              active === 2 ? "text-[crimson]" : "text-[#555]"
            }`}
          >
            Data Kriteria
          </h5>
        </Link>
      </div>

      <div className="w-full flex items-center p-4">
        <Link to="/sub-data-kriteria" className="w-full flex items-center">
          <GrWorkshop
            size={30}
            color={`${active === 3 ? "crimson" : "#555"}`}
          />
          <h5
            className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
              active === 3 ? "text-[crimson]" : "text-[#555]"
            }`}
          >
            Data Sub Kriteria
          </h5>
        </Link>
      </div>

      <div className="w-full flex items-center p-4">
        <Link to="/data-alternatif" className="w-full flex items-center">
          <HiDatabase
            size={30}
            color={`${active === 4 ? "crimson" : "#555"}`}
          />
          <h5
            className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
              active === 4 ? "text-[crimson]" : "text-[#555]"
            }`}
          >
            Data Alternatif
          </h5>
        </Link>
      </div>

      <div className="w-full flex items-center p-4">
        <Link to="/data-penilaian" className="w-full flex items-center">
          <HiOutlineArchive
            size={30}
            color={`${active === 5 ? "crimson" : "#555"}`}
          />
          <h5
            className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
              active === 5 ? "text-[crimson]" : "text-[#555]"
            }`}
          >
            Data Penilaian
          </h5>
        </Link>
      </div>

      <div className="w-full flex items-center p-4">
        <Link to="/data-perhitungan" className="w-full flex items-center">
          <HiOutlineCalculator
            size={30}
            color={`${active === 6 ? "crimson" : "#555"}`}
          />
          <h5
            className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
              active === 6 ? "text-[crimson]" : "text-[#555]"
            }`}
          >
            Data Perhitungan
          </h5>
        </Link>
      </div>
      <div className="w-full flex items-center p-4">
        <Link to="/data-hasil-akhir" className="w-full flex items-center">
          <HiOutlineChartSquareBar
            size={30}
            color={`${active === 7 ? "crimson" : "#555"}`}
          />
          <h5
            className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
              active === 7 ? "text-[crimson]" : "text-[#555]"
            }`}
          >
            Data Hasil Akhir
          </h5>
        </Link>
      </div>

      <div className="w-full flex items-center p-4">
        <Link to="/settings" className="w-full flex items-center">
          <AiOutlineSetting
            size={30}
            color={`${active === 8 ? "crimson" : "#555"}`}
          />
          <h5
            className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
              active === 8 ? "text-[crimson]" : "text-[#555]"
            }`}
          >
            Settings
          </h5>
        </Link>
      </div>
    </div>
  );
};

export default MarketingSidebar;
