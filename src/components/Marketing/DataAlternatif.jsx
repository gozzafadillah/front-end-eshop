import { Button } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import axios from "axios";
import React, { useEffect } from "react";
import { AiOutlineEye } from "react-icons/ai";
import { Link } from "react-router-dom";
import { server } from "../../server";
import ModalAlternatif from "./layout/ModalAlternatif";
import { toast } from "react-toastify";
import { BiTrash } from "react-icons/bi";
import ModalEditAlternatif from "./layout/ModalEditAlternatif";

const DataAlternatif = () => {
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  useEffect(() => {
    const fetchDataAlternatif = async () => {
      try {
        // Fetch data from the server
        const res = await axios.get(`${server}/alternatif`);
        setData(res.data);
        setLoading(false);
      } catch (error) {}
    };
    fetchDataAlternatif();
  }, [loading]);

  const handlerDelete = async (id) => {
    // validasi data dihapus atau tidak
    const confirm = window.confirm(
      "Apakah anda yakin ingin menghapus data ini?"
    );
    if (!confirm) return;

    try {
      await axios.delete(`${server}/alternatif/${id}`);
      setLoading(true);
      toast.success("Data berhasil dihapus");
    } catch (error) {
      toast.error("Data gagal dihapus");
    }
  };

  const columns = [
    { field: "no", headerName: "No", minWidth: 150, flex: 0.7 },
    {
      field: "kode_alternatif",
      headerName: "Kode Alternatif",
      minWidth: 180,
      flex: 1.4,
    },
    {
      field: "bauran_promosi",
      headerName: "Bauran Promosi",
      minWidth: 180,
      flex: 1.4,
    },
    {
      field: "type",
      headerName: "type",
      minWidth: 180,
      flex: 1.4,
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
            <ModalEditAlternatif
              loading={loading}
              setLoading={setLoading}
              id={params.id}
            />
            <Button onClick={() => handlerDelete(params.id)}>
              <BiTrash size={20} />
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

  data?.alternatif &&
    data?.alternatif.forEach((item, index) => {
      row.push({
        id: item._id,
        no: index + 1,
        _id: item._id,
        kode_alternatif: item.kode_alternatif,
        bauran_promosi: item.bauran_promosi,
        type: item.type,
      });
    });

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="w-full mx-8 pt-1 mt-10 bg-white">
          <div className="flex justify-end pt-3 px-3">
            <ModalAlternatif loading={loading} setLoading={setLoading} />
          </div>
          <h1 className="text-2xl font-semibold mb-3 mx-3">Data Alternatif</h1>
          <DataGrid
            rows={row}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            autoHeight
          />
        </div>
      )}
    </>
  );
};

export default DataAlternatif;
