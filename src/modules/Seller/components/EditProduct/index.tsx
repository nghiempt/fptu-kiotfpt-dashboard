import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTE } from "../../../../routes/constant";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import EditIcon from "@mui/icons-material/Edit";
import Button from "@mui/material/Button";

const EditProduct: React.FC = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCloseModal = () => {
    goToProduct();
    setIsModalOpen(false);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Handle form submission
  };

  const goToProduct = () => {
    navigate(ROUTE.SELLER_PRODUCT);
  };

  useEffect(() => {}, [isModalOpen]);

  return (
    <div className="w-full py-10 flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-500 via-blue-400 to-blue-300">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-2xl"
      >
        <Typography
          id="modal-modal-title"
          variant="h6"
          sx={{ marginBottom: "10px", fontSize: "18px" }}
        >
          <b>Product detail</b>
        </Typography>
        <Divider sx={{ marginBottom: "20px" }} />
        <div className="w-full flex gap-x-4 items-center">
          <div className="w-1/2 flex flex-col justify-center py-6 ">
            <img
              src="https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-llm05p5nkerg1c"
              alt="img"
              style={{ width: "100%" }}
              className="border rounded-md bg-blue-200 p-2"
            />

            <h1 className="flex justify-center cursor-pointer hover:text-blue-600">
              <u>Change image</u>
            </h1>
          </div>
          <Divider orientation="vertical" flexItem />
          <div className="flex flex-col gap-4 w-1/2">
            <div className="flex justify-between">
              <div className="flex gap-x-2 items-center">
                <h1 className="font-semibold text-[14px]">Name:</h1>
                <h1 className=" text-[16px]">
                  <i>Iphone 15 Pro Max</i>
                </h1>
              </div>
              <EditIcon
                className="text-gray-400 cursor-pointer"
                style={{ width: "20px" }}
              />
            </div>
            <div className="flex justify-between">
              <div className="flex gap-x-2">
                <h1 className="font-semibold text-[14px]">Discription:</h1>
                <h1 className="text-[16px]">
                  <i>Điện thoại Apple iPhone 15 Pro Max 256GB</i>
                </h1>
              </div>
              <EditIcon
                className="text-gray-400 cursor-pointer"
                style={{ width: "20px" }}
              />
            </div>
            <div className="flex justify-between">
              <div className="flex gap-x-2 items-center">
                <h1 className="font-semibold text-[14px]">Min-price:</h1>
                <h1 className="font-medium text-[16px]">$1000</h1>
              </div>
              <EditIcon
                className="text-gray-400 cursor-pointer"
                style={{ width: "20px" }}
              />
            </div>
            <div className="flex justify-between">
              <div className="flex gap-x-2 items-center">
                <h1 className="font-semibold text-[14px]">Max-price:</h1>
                <h1 className="font-medium text-[16px]">$2000</h1>
              </div>
              <EditIcon
                className="text-gray-400 cursor-pointer"
                style={{ width: "20px" }}
              />
            </div>
            <div className="flex justify-between">
              <div className="flex gap-x-2 items-center">
                <h1 className="font-semibold text-[14px]">Discount:</h1>
                <h1 className="font-medium text-[16px]">5</h1>
              </div>
              <EditIcon
                className="text-gray-400 cursor-pointer"
                style={{ width: "20px" }}
              />
            </div>
            <div className="flex gap-x-2 items-center">
              <h1 className="w-1/3 font-medium text-[16px]">Best-seller</h1>
              <input type="checkbox" />
            </div>
            <div className="flex gap-x-2 items-center">
              <h1 className="w-1/3 font-medium text-[16px]">Popular</h1>
              <input type="checkbox" />
            </div>
            <div className="flex gap-x-2 items-center">
              <h1 className="w-1/3 font-medium text-[16px]">Top-deal</h1>
              <input type="checkbox" />
            </div>
            <div className="flex gap-x-2 items-center">
              <h1 className="w-1/3 font-medium text-[16px]">Official</h1>
              <input type="checkbox" />
            </div>
          </div>
        </div>

        <div className="flex mt-5">
          <Button
            variant="contained"
            sx={{ width: "100%", marginRight: "10px" }}
            color="success"
            size="small"
          >
            Change
          </Button>
          <Button
            variant="contained"
            sx={{ width: "100%", marginLeft: "10px" }}
            color="error"
            size="small"
            onClick={handleCloseModal}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditProduct;
