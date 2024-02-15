import React, { useEffect } from "react";
import { server } from "../../server";
import axios from "axios";
import { toast } from "react-toastify";

const DataHasilAkhir = () => {
  const [hasil, setHasil] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    const fetchDataPenilaian = async () => {
      try {
        const res = await axios.get(`${server}/penilaian`);
        setHasil(res.data.Qi);
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

export default DataHasilAkhir;
