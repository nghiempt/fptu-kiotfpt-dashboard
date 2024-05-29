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
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.25)",
  p: 4,
  borderRadius: "8px",
};
const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

type ModalData = {
  children: ReactNode;
};

const UpdateCategoryPopupModal: React.FC<ModalData> = ({ children }) => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const UpdateCategory = async () => {
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
            <b>Update category</b>
          </Typography>
          <Divider sx={{ marginBottom: "20px" }} />
          <div className="flex flex-col gap-4 w-full">
            <div className="flex justify-center gap-x-4">
              <div className="flex gap-x-2 items-center">
                <h1 className="font-semibold text-[14px]">Name:</h1>
                <h1 className="text-[16px]">Phone</h1>
              </div>
              <EditIcon className="text-gray-400" style={{ width: "20px", cursor:'pointer' }} />
            </div>
            <div className="flex flex-col items-center ">
              <img
                src="https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-llm05p5nkerg1c"
                alt="img"
                style={{ width: "50%" }}
                className="border rounded-md bg-blue-200 p-2 mb-4"
              />
              <div>
              <Button
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={<CloudUploadIcon />}
              >
                Upload new file
                <VisuallyHiddenInput type="file" />
              </Button>
              </div>
              
            </div>
          </div>
          <Box sx={{ display: "flex", marginTop: "30px" }}>
            <Button
              variant="contained"
              sx={{ width: "100%", marginRight: "10px" }}
              color="success"
              size="small"
              onClick={UpdateCategory}
            >
              Update
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

export default UpdateCategoryPopupModal;
