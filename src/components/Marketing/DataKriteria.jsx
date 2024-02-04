import { Button } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import React, { useEffect, useState } from "react";
import { AiOutlineEye } from "react-icons/ai";
import { Link } from "react-router-dom";
import ModalDataKriteria from "./layout/ModalDataKriteria";
import axios from "axios";
import { BsTrash } from "react-icons/bs";
import { toast } from "react-toastify";
import { server } from "../../server";

const DataKriteria = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      // const api = process.env.REACT_APP_API_URL;
      try {
        const response = await axios.get(`${server}/criteria`);
        setData(response.data);
        setLoading(true);
      } catch (error) {
        toast.error("Data gagal dimuat");
      }
    };
    fetchData();
  }, [loading]);

  const onDelete = (_id) => {
    // validasi data dihapus atau tidak
    const confirm = window.confirm(
      "Apakah anda yakin ingin menghapus data ini?"
    );
    if (!confirm) return;

    try {
      axios.delete(`${server}/criteria/${_id}`);
      setLoading(true);
      toast.success("Data berhasil dihapus");
    } catch (error) {
      toast.error("Data gagal dihapus");
    }
  };

  const columns = [
    { field: "no", headerName: "No", minWidth: 150, flex: 0.7 },
    {
      field: "name",
      headerName: "Nama Kriteria",
      minWidth: 100,
      flex: 0.6,
    },
    {
      field: "type",
      headerName: "Type",
      minWidth: 80,
      flex: 0.5,
    },

    {
      field: "value",
      headerName: "Bobot",
      type: "number",
      minWidth: 130,
      flex: 0.6,
    },
    {
      field: "Preview",
      flex: 0.8,
      minWidth: 100,
      headerName: "",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Button
              onClick={() => {
                onDelete(params.id);
                setLoading(!loading);
              }}
            >
              <BsTrash size={20} />
            </Button>
            <Link to={`/product/${params.id}`}>
              <Button>
                <AiOutlineEye size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },
  ];

  const row = [];

  data?.criteria &&
    data?.criteria.forEach((item, index) => {
      row.push({
        id: item._id,
        no: index + 1,
        _id: item._id,
        name: item.name,
        type: item.type,
        value: item.value,
      });
    });

  return (
    <>
      <div className="w-full mx-8 pt-1 mt-10 px-3 bg-white">
        <div className="flex justify-end pt-3 px-3">
          <ModalDataKriteria loading={loading} setLoading={setLoading} />
        </div>
        <h1 className="text-2xl font-semibold mx-3">Data Kriteria</h1>
        <DataGrid
          rows={row}
          columns={columns}
          pageSize={10}
          disableSelectionOnClick
          autoHeight
        />
      </div>
    </>
  );
};

export default DataKriteria;
