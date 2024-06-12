import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import Modal from "@mui/material/Modal";
import { AssetImages } from "../../utils/images";

export default function AddProductModal({
  open,
  handleClose,
}: {
  open: boolean;
  handleClose: any;
}) {
  const [productData, setProductData] = useState({
    brand_id: "",
    category_id: "",
    condition_id: "",
    description: "",
    discount: "",
    id: "",
    maxPrice: "",
    minPrice: "",
    name: "",
    shop_id: "",
    thumbnails: [""],
    variants: [
      {
        colorId: "",
        price: "",
        productId: "",
        quantity: "",
        sizeId: "",
      },
    ],
  });

  const [currentThumbnail, setCurrentThumbnail] = useState("");

  const handleUploadThumbnail = () => {
    if (currentThumbnail) {
      setProductData((prevData) => ({
        ...prevData,
        thumbnails: [currentThumbnail],
      }));
    }
    console.log(currentThumbnail);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleVariantChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    const updatedVariants = productData.variants.map((variant, i) =>
      i === index ? { ...variant, [name]: value } : variant
    );
    setProductData((prevData) => ({
      ...prevData,
      variants: updatedVariants,
    }));
  };

  const handleThumbnailChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    const updatedThumbnails = productData.thumbnails.map((thumbnail, i) =>
      i === index ? value : thumbnail
    );
    setProductData((prevData) => ({
      ...prevData,
      thumbnails: updatedThumbnails,
    }));
  };

  const handleSubmit = () => {
    // Gửi dữ liệu productData tới API hoặc xử lý theo yêu cầu của bạn
    console.log(productData);
    handleClose();
  };

  return (
    <div>
      <Modal open={open} onClose={handleClose}>
        <section className="flex items-center justify-center min-h-screen">
          <div className="relative bg-gray-200 rounded-lg shadow dark:border w-full max-w-3xl">
            <div
              className="absolute top-4 right-4 cursor-pointer"
              onClick={handleClose}
            >
              <CloseIcon />
            </div>
            <div className="w-full p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                Create Product
              </h1>
              <div className="w-full flex gap-10">
                <div className="w-1/2 flex flex-col gap-4">
                  <div className="w-full justify-center items-center">
                    <img
                      className="rounded-md"
                      src={productData.thumbnails[0] || ""}
                      alt="No Image"
                    />
                  </div>
                  <div className="flex gap-x-2">
                        <input
                          type="text"
                          placeholder="Enter thumbnail URL"
                          value={currentThumbnail}
                          onChange={(e) => setCurrentThumbnail(e.target.value)}
                          className="w-full border px-4 py-2 text-gray-700 bg-gray-100 rounded-lg focus:outline-none"
                        />
                        <button
                          onClick={handleUploadThumbnail}
                          className="border px-4 py-2 text-white bg-gray-500 rounded-lg focus:outline-none"
                        >
                          Upload
                        </button>
                      </div>

                  {productData.variants.map((variant, index) => (
                    <div key={index} className="flex flex-col gap-2">
                      <div className="mb-4 flex justify-between">
                        <div className="flex gap-x-2 items-center">
                          <p className="text-sm text-gray-900 font-semibold">
                            Color:
                          </p>
                          <select name="color" id="0">
                            <option value="0">Select color</option>
                            <option value="1">Red</option>
                            <option value="2">Blue</option>
                            <option value="3">Green</option>
                            <option value="4">White</option>
                            <option value="5">Black</option>
                          </select>
                        </div>
                        <div className="flex gap-x-2 items-center">
                          <p className="text-sm text-gray-900 font-semibold">
                            Size:
                          </p>
                          <select name="" id="">
                            <option value="0">Select size</option>
                            <option value="1">S</option>
                            <option value="2">M</option>
                            <option value="3">L</option>
                            <option value="4">XL</option>
                          </select>
                        </div>
                      </div>
                      <div className="mb-4 flex justify-between">
                        <div className="flex gap-x-2 items-center">
                          <p className="text-sm text-gray-900 font-semibold">
                            Brand:
                          </p>
                          <select name="brand" id="0">
                            <option value="0">Select brand</option>
                            <option value="1">Brand 1</option>
                            <option value="2">Brand 2</option>
                            <option value="3">Brand 3</option>
                            <option value="4">Brand 4</option>
                            <option value="5">Brand 5</option>
                          </select>
                        </div>
                        <div className="flex gap-x-2 items-center">
                          <p className="text-sm text-gray-900 font-semibold">
                            Category:
                          </p>
                          <select name="category" id="">
                            <option value="0">Select category</option>
                            <option value="1">Category 1</option>
                            <option value="2">Category 2</option>
                            <option value="3">Category 3</option>
                            <option value="4">Category 4</option>
                            <option value="5">Category 5</option>
                          </select>
                        </div>
                      </div>
                      <select name="conditionID" id="">
                        <option value="0">Select condition</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                      </select>
                      
                    </div>
                  ))}
                </div>
                <div className="flex flex-col gap-4">
                  <input
                    type="text"
                    placeholder="Enter product name"
                    name="name"
                    value={productData.name}
                    onChange={handleChange}
                    className="w-full border px-4 py-2 text-gray-700 bg-gray-100 rounded-lg focus:outline-none"
                  />
                  <textarea
                    placeholder="Enter description"
                    name="description"
                    value={productData.description}
                    className="w-full border px-4 py-2 text-gray-700 bg-gray-100 rounded-lg focus:outline-none"
                  />

                  <input
                    type="text"
                    placeholder="Enter price"
                    name="price"
                    // value={variant.price}
                    // onChange={(e) => handleVariantChange(index, e)}
                    className="w-full border px-4 py-2 text-gray-700 bg-gray-100 rounded-lg focus:outline-none"
                  />
                  <input
                    type="text"
                    placeholder="Enter discount"
                    name="discount"
                    value={productData.discount}
                    onChange={handleChange}
                    className="w-full border px-4 py-2 text-gray-700 bg-gray-100 rounded-lg focus:outline-none"
                  />

                  <input
                    type="text"
                    placeholder="Enter quantity"
                    name="quantity"
                    // value={variant.quantity}
                    // onChange={(e) => handleVariantChange(index, e)}
                    className="w-full border px-4 py-2 text-gray-700 bg-gray-100 rounded-lg focus:outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                onClick={handleSubmit}
                className="w-full text-white bg-[#0B2447] hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Create
              </button>
            </div>
          </div>
        </section>
      </Modal>
    </div>
  );
}
