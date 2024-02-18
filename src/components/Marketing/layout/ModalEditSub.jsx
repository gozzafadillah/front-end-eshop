import React from "react";
import { toast } from "react-toastify";
import { server } from "../../../server";
import axios from "axios";
import { BiPencil } from "react-icons/bi";
import { Button } from "@material-ui/core";

const ModalEditSub = ({ parent, child, loading, setLoading }) => {
  const [data, setData] = React.useState({
    name: "",
    value: "",
    criteria_id: "",
  });

  const handleChange = (e) => {
    e.preventDefault();
    setData({ ...data, [e.target.name]: e.target.value });
  };

  async function getData(parent, child) {
    try {
      const response = await axios.get(
        `${server}/criteria/sub-criteria/${parent}/${child}`
      );
      setData({
        name: response.data.child.name,
        value: response.data.child.value,
        criteria_id: response.data.parent.criteria_id,
      });
    } catch (error) {
      console.error(error);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    updateData(data, parent, child);
  };

  const updateData = async (data, parent, child) => {
    try {
      await axios.put(
        `${server}/criteria/sub-criteria/${parent}/${child}`,
        data
      );
      setLoading(!loading);
      toast.success("Data berhasil diubah");
    } catch (error) {
      console.error(error);
    }
  };

  const onReset = () => {
    setData({
      name: "",
      value: "",
      criteria_id: "",
    });
  };
  return (
    <>
      <Button
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        onClick={() => {
          document.getElementById(`my_modal_edit_${child}`).showModal();
          getData(parent, child);
        }}
      >
        <BiPencil />
      </Button>

      <dialog id={`my_modal_edit_${child}`} className="modal w-[35vw]">
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
                onClick={(e) => {
                  handleSubmit(e);
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

export default ModalEditSub;
