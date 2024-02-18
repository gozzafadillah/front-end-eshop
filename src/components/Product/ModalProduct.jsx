import React from "react";
import { server } from "../../server";
import axios from "axios";
import { categoriesData } from "../../static/data";
import { Button } from "@material-ui/core";
import { BiPencil } from "react-icons/bi";
import { AiOutlinePlusCircle } from "react-icons/ai";

const ModalProduct = ({ loading, setLoading, id }) => {
  const [data, setData] = React.useState({
    name: "",
    description: "",
    category: "",
    tags: "",
    originalPrice: 0,
    discountPrice: 0,
    stock: 0,
    images: [],
  });
  const [images, setImages] = React.useState([]);

  const handleChange = (e) => {
    e.preventDefault();
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages([]); // Clear existing images

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImages((oldImages) => [...oldImages, reader.result]);
        }
      };

      reader.readAsDataURL(file); // Convert file to base64 string
    });
  };

  const onReset = () => {
    setData({
      name: "",
      type: "",
      value: "",
      criteria_code: "",
    });
  };

  const getData = async (id) => {
    const api = server;
    try {
      const response = await axios.get(
        `${api}/product/get-single-product/${id}`
      );
      setData(response.data.product);
      setImages(response.data.product.images);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();

    // Append each file to formData individually
    images.forEach((file) => {
      formData.append("images", file);
    });

    // Append other form data fields to formData
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("category", data.category);
    formData.append("tags", data.tags);
    formData.append("originalPrice", data.originalPrice.toString()); // Ensure numerical values are converted to strings
    formData.append("discountPrice", data.discountPrice.toString());
    formData.append("stock", data.stock.toString());

    // Assuming data.shopId is the correct field you want to send
    // and you have a valid shopId in your state, append it to formData
    formData.append("shopId", data.shopId);

    // Now call updateData with formData, not the data object
    updateData(formData, id);
    onReset();
  };

  async function updateData(formData, id) {
    const api = server;
    try {
      const response = await axios.put(
        `${api}/product/update-product/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // This might be optional as axios sets it automatically
          },
        }
      );
      console.log(response);
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
          document.getElementById("my_modal_1").showModal();
          getData(id);
        }}
      >
        <BiPencil />
      </Button>

      <dialog id="my_modal_1" className="modal w-[35vw]">
        <div className="modal-box">
          <h3 className="text-left font-bold text-lg">Edit Produk</h3>
          <form>
            <div
              className="mb-5"
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <label className="text-left" htmlFor="name">
                Nama Produk
              </label>
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
              <label className="text-left" htmlFor="description">
                Deskripsi
              </label>
              <input
                type="text"
                id="description"
                name="description"
                value={data.description}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              />
            </div>
            <div
              className="mb-5"
              style={{ display: "flex", flexDirection: "column" }}
            >
              <label className="text-left" htmlFor="type">
                Kategori
              </label>
              <select
                className="w-full mt-2 border h-[35px] rounded-[5px]"
                value={data.category}
                onChange={handleChange}
              >
                <option value="Choose a category">Choose a category</option>
                {categoriesData &&
                  categoriesData.map((i) => (
                    <option value={i.title} key={i.title}>
                      {i.title}
                    </option>
                  ))}
              </select>
            </div>
            <div
              className="mb-5"
              style={{ display: "flex", flexDirection: "column" }}
            >
              <label className="text-left" htmlFor="tags">
                Tags
              </label>
              <input
                type="text"
                id="tags"
                name="tags"
                value={data.tags}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              />
            </div>

            <div
              className="mb-5"
              style={{ display: "flex", flexDirection: "column" }}
            >
              <label className="text-left" htmlFor="originalPrice">
                Harga Asli
              </label>
              <input
                type="number"
                id="originalPrice"
                name="originalPrice"
                value={data.originalPrice}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              />
            </div>
            <div
              className="mb-5"
              style={{ display: "flex", flexDirection: "column" }}
            >
              <label className="text-left" htmlFor="discountPrice">
                Harga Diskon
              </label>
              <input
                type="number"
                id="discountPrice"
                name="discountPrice"
                value={data.discountPrice}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              />
            </div>
            <div
              className="mb-5"
              style={{ display: "flex", flexDirection: "column" }}
            >
              <label className="text-left" htmlFor="stock">
                Stok
              </label>
              <input
                type="number"
                id="stock"
                name="stock"
                value={data.stock}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              />
            </div>
            <div
              className="mb-5"
              style={{ display: "flex", flexDirection: "column" }}
            >
              <label className="text-left" htmlFor="stock">
                Unggah Gambar
              </label>
              <input
                type="file"
                name=""
                id="upload"
                className="hidden"
                multiple
                onChange={handleImageChange}
              />
            </div>
            <div className="w-full flex items-center flex-wrap">
              <label htmlFor="upload">
                <AiOutlinePlusCircle size={30} className="mt-3" color="#555" />
              </label>
              {images &&
                images.map((image) => (
                  <img
                    src={image.url ?? image}
                    key={image}
                    alt=""
                    className="h-[120px] w-[120px] object-cover m-2"
                  />
                ))}
            </div>
            <br />
          </form>
          <div
            className="modal-action"
            style={{ display: "flex", gap: "10px" }}
          >
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button
                className="inline-block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                onClick={(e) => {
                  handleSubmit(e);
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

export default ModalProduct;
