import { Button } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import React, { useEffect } from "react";
import { AiOutlineEye } from "react-icons/ai";
import { Link } from "react-router-dom";
import ModalSubKriteria from "./layout/ModalSubKreteria";
import axios from "axios";
import { BsTrash } from "react-icons/bs";
import { server } from "../../server";
import { toast } from "react-toastify";

const SubKriteria = () => {
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  useEffect(() => {
    async function fetchDataCriteria() {
      try {
        const res = await axios.get(`${server}/criteria/sub-criteria/data`);

        // Modify each object in the array to include an 'id' field
        const modifiedData = res.data.criteriaWithSubCriteria.map((item) => {
          return {
            ...item,
            id: item._id, // Add 'id' field with the value of '_id'
            sub_criteria: {
              ...item.sub_criteria,
              id: item.sub_criteria._id, // Do the same for sub_criteria
              sub_criteria: item.sub_criteria.sub_criteria.map((subItem) => ({
                ...subItem,
                id: subItem._id, // And for each sub-criterion
                sub_id_child: subItem._id, // And for each sub-criterion
                sub_id_parent: item.sub_criteria._id, // And for each sub-criterion
              })),
            },
          };
        });
        setData(modifiedData);
        setLoading(false);
      } catch (error) {
        toast.error("Data gagal diambil");
      }
    }
    fetchDataCriteria();
  }, [loading]);

  const handleDelete = async (sub_criteria_id, sub_id_child) => {
    //  validasi apakah dihapus
    const confirm = window.confirm(
      "Apakah anda yakin ingin menghapus data ini?"
    );
    if (!confirm) return;

    try {
      await axios.delete(
        `${server}/criteria/delete/${sub_criteria_id}/${sub_id_child}`
      );
      setLoading(true);
      toast.success("Data berhasil dihapus");
    } catch (error) {
      toast.error("Data gagal dihapus");
    }
  };

  const columns = [
    { field: "_id", headerName: "No", minWidth: 150, flex: 0.7 },
    {
      field: "name",
      headerName: "Nama Sub Kriteria",
      minWidth: 180,
      flex: 0.6,
    },
    {
      field: "value",
      headerName: "Bobot",
      minWidth: 80,
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
              onClick={() =>
                handleDelete(params.row.sub_id_parent, params.row.sub_id_child)
              }
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

  return (
    <>
      <div
        className="w-full pb-5 mx-8 pt-1 mt-10 px-3"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "start",
        }}
      >
        {loading ? (
          <div>Loading...</div>
        ) : (
          <div>
            {data?.map((item) => {
              // Create the rows for the DataGrid based on sub_criteria
              const rows = item?.sub_criteria.sub_criteria.map(
                (subItem, subIndex) => ({
                  id: subItem._id, // unique id required by DataGrid for each row
                  _id: subIndex + 1, // you can use subIndex + 1 as a counter for No
                  name: subItem.name || "", // handle the case where name might be null
                  value: subItem.value || "", // handle the case where value might be null
                  sub_id_child: subItem.sub_id_child,
                  sub_id_parent: subItem.sub_id_parent,
                })
              );

              return (
                <div
                  key={item._id}
                  className="w-full mx-8 pt-1 mt-10 px-3 bg-white"
                >
                  <div className="flex justify-end pt-3 px-3">
                    <ModalSubKriteria
                      id={item._id}
                      loading={loading}
                      setLoading={setLoading}
                    />
                  </div>
                  <h1 className="text-2xl font-semibold my-3 mx-3">
                    {item.name}
                  </h1>
                  <DataGrid
                    rows={rows} // Pass the rows array directly
                    columns={columns}
                    pageSize={10}
                    disableSelectionOnClick
                    autoHeight
                  />
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
};

export default SubKriteria;
