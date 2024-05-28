import React, { useState, ReactNode, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { IconButtonProps } from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
// import { signOut } from '../../../Auth/Auth.Api';
// import { routes } from '../../../../routes';
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "background.paper",
  boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.25)",
  p: 4,
  borderRadius: "8px",
};

type ModalData = {
  children: ReactNode;
};

const ProductDetailPopupModal: React.FC<ModalData> = ({ children }) => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const createVoucher = async () => {
    // await signOut();
    // navigate(routes.home.SignInPage);
  };

  useEffect(() => {}, [isModalOpen]);

  return (
    <div>
      {React.cloneElement(children as React.ReactElement<IconButtonProps>, {
        onClick: handleOpenModal,
      })}
      <Modal
        open={isModalOpen}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
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
                    <i>Iphone 15 Pro Max</i></h1>
                </div>
                <EditIcon className="text-gray-400" style={{ width: "20px" }} />
              </div>
              <div className="flex justify-between">
                <div className="flex gap-x-2">
                  <h1 className="font-semibold text-[14px]">Discription:</h1>
                  <h1 className="text-[16px]">
                    <i>Điện thoại Apple iPhone 15 Pro Max 256GB</i>
                  </h1>
                </div>
                <EditIcon className="text-gray-400" style={{ width: "20px" }} />
              </div>
              <div className="flex justify-between">
                <div className="flex gap-x-2 items-center">
                  <h1 className="font-semibold text-[14px]">Min-price:</h1>
                  <h1 className="font-medium text-[16px]">$1000</h1>
                </div>
                <EditIcon className="text-gray-400" style={{ width: "20px" }} />
              </div>
                <div className="flex justify-between">
                    <div className="flex gap-x-2 items-center">
                    <h1 className="font-semibold text-[14px]">Max-price:</h1>
                    <h1 className="font-medium text-[16px]">$2000</h1>
                    </div>
                    <EditIcon className="text-gray-400" style={{ width: "20px" }} />
                </div>
                <div className="flex justify-between">
                    <div className="flex gap-x-2 items-center">
                    <h1 className="font-semibold text-[14px]">Discount:</h1>
                    <h1 className="font-medium text-[16px]">5</h1>
                    </div>
                    <EditIcon className="text-gray-400" style={{ width: "20px" }} />
                </div>
              <div className="flex gap-x-2 items-center">
                <h1 className="w-1/4 font-medium text-[16px]">Best-seller</h1>
                <input type="checkbox" />
              </div>
              <div className="flex gap-x-2 items-center">
                <h1 className="w-1/4 font-medium text-[16px]">Popular</h1>
                <input type="checkbox" />
              </div>
              <div className="flex gap-x-2 items-center">
                <h1 className="w-1/4 font-medium text-[16px]">Top-deal</h1>
                <input type="checkbox" />
              </div>
              <div className="flex gap-x-2 items-center">
                <h1 className="w-1/4 font-medium text-[16px]">Official</h1>
                <input type="checkbox" />
              </div>
            </div>
          </div>

          <Box sx={{ display: "flex", marginTop: "30px" }}>
            <Button
              variant="contained"
              sx={{ width: "100%", marginRight: "10px" }}
              color="success"
              size="small"
              onClick={createVoucher}
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
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default ProductDetailPopupModal;
