import React from "react";

const DataPerhitungan = () => {
  const [data, setData] = React.useState([]);
  const [normalisasi, setNormalisasi] = React.useState([]);
  const [kriteria, setKriteria] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    const fetchDataPenilaian = async () => {
      try {
        const res = await axios.get(`${server}/penilaian`);
        setData(res.data.Qi);
        const dataCriteria = await axios.get(`${server}/criteria`);
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
        <div className="flex justify-end pt-3 px-3"></div>
        <h1 className="text-2xl font-semibold mb-3 mx-3">Data Perhitungan</h1>
        <table className="min-w-full divide-y divide-gray-200 shadow-md">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Alternatif
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Hasil Perhitungan
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Posisi
              </th>
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
                  {item.nilai}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {item.rangking}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default DataPerhitungan;
