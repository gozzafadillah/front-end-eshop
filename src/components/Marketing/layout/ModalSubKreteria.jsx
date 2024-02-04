import axios from "axios";
import React, { useEffect } from "react";
import { toast } from "react-toastify";
import { server } from "../../../server";

const ModalSubKriteria = ({ id, loading, setLoading }) => {
  const [ID, setId] = React.useState("");
  const [data, setData] = React.useState({
    name: "",
    value: "",
    criteria_id: "",
  });

  const handleChange = (e) => {
    e.preventDefault();
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (id, data) => {
    try {
      const res = await axios.put(
        `${server}/criteria/add/${id}`, // use data.criteria_id instead of id
        {
          name: data.name,
          value: data.value,
          criteria_id: id,
        }
      );
      toast.success(`Data ${res.nama} berhasil ditambahkan`);
      setLoading(true);
    } catch (error) {
      toast.error("Data gagal ditambahkan");
    }
  };

  useEffect(() => {
    setId(id);
  }, [id]); // Only re-run the effect if the id prop changes

  const onReset = () => {
    setData({
      name: "",
      value: "",
      criteria_id: "",
    });
    setId("");
  };
  return (
    <>
      <button
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        onClick={() => document.getElementById(`modal_${ID}`).showModal()}
      >
        Tambah Data
      </button>

      <dialog id={`modal_${ID}`} className="modal w-[35vw]">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Tambah Sub Kriteria</h3>
          <form>
            <div
              className="mb-5"
              style={{ display: "flex", flexDirection: "column" }}
            >
              <label htmlFor="name">Nama Kriteria</label>
              <input
                type="text"
                id="name"
                name="name"
                onChange={handleChange}
                value={data.name}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              />
            </div>
            <div
              className="mb-5"
              style={{ display: "flex", flexDirection: "column" }}
            >
              <label htmlFor="value">Bobot</label>
              <input
                type="text"
                id="value"
                name="value"
                value={data.value}
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
                  handleSubmit(ID, data);
                  onReset();
                }}
              >
                Submit
              </button>
              <button
                className="inline-block text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800"
                onClick={() => onReset}
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

export default ModalSubKriteria;
