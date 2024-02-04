import { Button } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import axios from "axios";
import React, { useEffect } from "react";
import { AiOutlineEye } from "react-icons/ai";
import { Link } from "react-router-dom";
import { server } from "../../server";
import { toast } from "react-toastify";
import ModalPenilaian from "./layout/ModalPenilaian";

const DataPenilaian = () => {
  const [data, setData] = React.useState([]);
  const [normalisasi, setNormalisasi] = React.useState([]);
  const [kriteria, setKriteria] = React.useState([]);
  const [hasil, setHasil] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    const fetchDataPenilaian = async () => {
      try {
        const res = await axios.get(`${server}/penilaian`);
        setData(res.data.penilaian);
        setNormalisasi(res.data.normalisasi);
        setHasil(res.data.Qi);
        const dataCriteria = await axios.get(`${server}/criteria`);
        setKriteria(dataCriteria.data.criteria);
        setLoading(false);
      } catch (error) {
        toast.error("Data gagal dimuat");
      }
    };
    fetchDataPenilaian();
  }, [loading]);

  return (
    <>
      <div className="w-full mx-8 pt-1 mt-10 bg-white">
        <div className="flex justify-end pt-3 px-3">
          <ModalPenilaian loading={loading} setLoading={setLoading} />
        </div>
        <h1 className="text-2xl font-semibold mb-3 mx-3">Data Penilaian</h1>
        <table className="min-w-full divide-y divide-gray-200 shadow-md">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                No
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Kode Alternatif
              </th>
              {kriteria.map((_, index) => (
                <th
                  key={index}
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  C{index + 1}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((item, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {index + 1}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {item.kode_alternatif}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {item.hasil_C1}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {item.hasil_C2}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {item.hasil_C3}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {item.hasil_C4}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {item.hasil_C5}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* title */}
        <h1 className="text-2xl font-semibold mb-3 mx-3 mt-10">
          Data Normalisasi
        </h1>
        <table className="min-w-full divide-y divide-gray-200 shadow-md">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                No
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Kode Alternatif
              </th>
              {kriteria.map((_, index) => (
                <th
                  key={index}
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  C{index + 1}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {normalisasi.map((item, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {index + 1}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {item.kode_alternatif}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {item.hasil_C1}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {item.hasil_C2}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {item.hasil_C3}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {item.hasil_C4}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {item.hasil_C5}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <h1 className="text-2xl font-semibold mb-3 mx-3 mt-10">
          Data Hasil Akhir
        </h1>
        <table className="min-w-full divide-y divide-gray-200 shadow-md">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                No
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Kode Alternatif
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Nilai
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Ranking
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {hasil.map((item, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {index + 1}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {item.kode_alternatif}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {item.nilai}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {item.ranking}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default DataPenilaian;
