import React, { useState, ReactNode, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Divider from "@mui/material/Divider";
import { IconButtonProps } from "@mui/material/IconButton";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";

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

const OrderDetailPopupModal: React.FC<ModalData> = ({ children }) => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
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
          <div className="flex justify-between">
            <Typography variant="h6" component="h2">
              <h1>Order #09746</h1>
            </Typography>
            <Button
              variant="contained"
              sx={{ width: "10%", marginLeft: "10px" }}
              color="error"
              size="small"
              onClick={handleCloseModal}
            >
              Cancel
            </Button>
          </div>
          <Typography variant="body2" color="textSecondary">
            <h1>July 27, 2022 at 09:44 AM</h1>
          </Typography>
          <Divider sx={{ my: 2 }} />
          <div className="w-full">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: 2,
              }}
            >
              <Typography className="w-2/5" variant="body1">
                Item
              </Typography>
              <Typography variant="body1">Quantity</Typography>
              <Typography variant="body1">Rate</Typography>
              <Typography variant="body1">Amount</Typography>
            </div>
            <Divider />
            {[1, 2, 3, 4].map((product, index) => (
              <div
                className="my-2"
                key={index}
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <div className="w-2/5">
                  <Typography variant="body2">Iphone 15 Pro Max</Typography>
                  <Typography variant="caption" color="textSecondary">
                    Color: Pink
                  </Typography>
                </div>
                <Typography variant="body2">2</Typography>
                <Typography variant="body2">$999</Typography>
                <Typography variant="body2">$999</Typography>
              </div>
            ))}
            <Divider className="my-2" />
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="body2">Total</Typography>
              <Typography variant="body2">$395.00</Typography>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="body2">Shipping</Typography>
              <Typography variant="body2">$10.00</Typography>
            </div>
            <div
              className="mt-2"
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <Typography variant="h6">Order Total</Typography>
              <Typography variant="h6">$405.00</Typography>
            </div>
          </div>
          <Divider className="my-2" />
          <div>
            <Typography variant="body2">
              <strong>Note:</strong> Ship all the ordered items together by
              Friday and I send you an email, please check. Thanks!
            </Typography>
          </div>
          <Divider className="my-2" />
          <div className="flex gap-x-2 justify-center items-center py-4">
            <h1>Status: </h1>
            <div className="border rounded-md">
              <select className="p-2 bg-blue-400" name="select" id="1">
                <option className="bg-blue-400" value="1">
                  Pending
                </option>
                <option className="bg-yellow-400" value="2">
                  Processing
                </option>
                <option className="bg-yellow-600" value="3">
                  Shipped
                </option>
                <option className="bg-green-500" value="4">
                  Delivered
                </option>
              </select>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default OrderDetailPopupModal;
