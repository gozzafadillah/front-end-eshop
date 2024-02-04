import React from "react";
import { server } from "../../../server";
import axios from "axios";
import { toast } from "react-toastify";

const ModalAlternatif = ({ loading, setLoading }) => {
  const [data, setData] = React.useState({
    kode_alternatif: "",
    bauran_promosi: "",
    type: "",
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const onReset = () => {
    setData({
      kode_alternatif: "",
      bauran_promosi: "",
      type: "",
    });
  };

  async function addData(data) {
    const api = server;
    try {
      const response = await axios.post(`${api}/alternatif`, data);
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
              <label htmlFor="name">Kode Alternatif</label>
              <input
                type="text"
                id="kode_alternatif"
                name="kode_alternatif"
                value={data.kode_alternatif}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              />
            </div>
            <div
              className="mb-5"
              style={{ display: "flex", flexDirection: "column" }}
            >
              <label htmlFor="bauran_promosi">Bauran Promosi</label>
              <input
                type="text"
                id="bauran_promosi"
                name="bauran_promosi"
                value={data.bauran_promosi}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              />
            </div>
            <div
              className="mb-5"
              style={{ display: "flex", flexDirection: "column" }}
            >
              <label htmlFor="type">Type</label>
              <input
                type="text"
                id="type"
                name="type"
                onChange={handleChange}
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
              <button className="inline-block text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800">
                Close
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default ModalAlternatif;
