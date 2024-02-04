import axios from "axios";
import React from "react";
import { server } from "../../../server";
import { toast } from "react-toastify";

const ModalPenilaian = ({ loading, setLoading }) => {
  const [data, setData] = React.useState({
    criteria_id: "",
    alternatif_id: "",
    nilai: "",
  });
  const [kriteria, setKriteria] = React.useState([]);
  const [alternatif, setAlternatif] = React.useState([]);

  //   get kriteria and alternatif
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const dataCriteria = await axios.get(`${server}/criteria`);
        setKriteria(dataCriteria.data.criteria);
        const dataAlternatif = await axios.get(`${server}/alternatif`);
        setAlternatif(dataAlternatif.data.alternatif);
        setLoading(false);
      } catch (error) {
        console.error(error);
        toast.error("Data gagal dimuat");
      }
    };
    fetchData();
  }, [loading]);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    console.log(data);
  };

  const onReset = () => {
    setData({
      criteria_id: "",
      alternatif_id: "",
      nilai: "",
    });
  };

  async function addData(data) {
    const api = server;
    try {
      const response = await axios.post(`${api}/penilaian`, data);
      console.log(response);
      // refresh page
      setLoading(!loading);
      toast.success("Data berhasil ditambahkan");
    } catch (error) {
      console.error(error);
      toast.error("Data gagal ditambahkan");
    }
  }

  return (
    <>
      <button
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        onClick={() => document.getElementById("my_modal_1").showModal()}
      >
        Tambah Data
      </button>

      <dialog id="my_modal_1" className="modal w-[35vw]">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Tambah Data Alternatif</h3>
          <form>
            <div
              className="mb-5"
              style={{ display: "flex", flexDirection: "column" }}
            >
              <label htmlFor="name">Data Kriteria</label>
              {/* select */}
              <select
                name="criteria_id"
                id="criteria_id"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                onChange={handleChange}
                value={data.criteria_id}
              >
                <option value="">Pilih Kriteria</option>
                {kriteria.map((item) => (
                  <option value={item._id}>
                    {item.name} - {item.criteria_code}
                  </option>
                ))}
              </select>
            </div>
            <div
              className="mb-5"
              style={{ display: "flex", flexDirection: "column" }}
            >
              <label htmlFor="alternatif_id">Data Alternatif</label>
              {/* select */}
              <select
                name="alternatif_id"
                id="alternatif_id"
                onChange={handleChange}
                value={data.alternatif_id}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              >
                <option value="">Pilih Alternatif</option>
                {alternatif.map((item) => (
                  <option value={item._id}>{item.kode_alternatif}</option>
                ))}
              </select>
            </div>

            <div
              className="mb-5"
              style={{ display: "flex", flexDirection: "column" }}
            >
              <label htmlFor="nilai">Nilai</label>
              <input
                type="number"
                id="nilai"
                name="nilai"
                onChange={handleChange}
                value={data.nilai}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              />
            </div>
          </form>
          <div className="modal-action">
            <form method="dialog" style={{ display: "flex", gap: "10px" }}>
              {/* if there is a button in form, it will close the modal */}
              <button
                className="inline-block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                onClick={() => {
                  addData(data);
                  document.getElementById("my_modal_1").close();
                  onReset();
                }}
              >
                Submit
              </button>
              <button
                className="inline-block text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800"
                onClick={() => onReset()}
              >
                Close
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default ModalPenilaian;
