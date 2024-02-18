import axios from "axios";
import React from "react";
import { server } from "../../../server";
import { Button } from "@material-ui/core";
import { BiPencil } from "react-icons/bi";

const ModalEditDataKriteria = ({ loading, setLoading, id }) => {
  const [data, setData] = React.useState({});

  async function getData(id) {
    const api = server;
    try {
      const response = await axios.get(`${api}/criteria/${id}`);
      setData({
        name: response.data.criteria.name,
        type: response.data.criteria.type,
        value: response.data.criteria.value,
        criteria_code: response.data.criteria.criteria_code,
      });
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  }

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const onReset = () => {
    setData({
      name: "",
      type: "",
      value: "",
      criteria_code: "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateData(data, id);
  };

  async function updateData(data, id) {
    const api = server;
    try {
      const response = await axios.put(`${api}/criteria/${id}`, data);
      console.log(response);
      // refresh page
      setLoading(!loading);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <Button
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        onClick={() => {
          document.getElementById("my_modal_edit").showModal();
          getData(id);
        }}
      >
        <BiPencil />
      </Button>

      <dialog id="my_modal_edit" className="modal w-[35vw]">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Tambah Data Kriteria</h3>
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
                value={data.name}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              />
            </div>
            <div
              className="mb-5"
              style={{ display: "flex", flexDirection: "column" }}
            >
              <label htmlFor="criteria_code">Kode Kriteria</label>
              <input
                type="text"
                id="criteria_code"
                name="criteria_code"
                value={data.criteria_code}
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
                value={data.type}
                onChange={handleChange}
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
                onClick={(e) => {
                  handleSubmit(e);
                  document.getElementById("my_modal_edit").close();
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

export default ModalEditDataKriteria;
