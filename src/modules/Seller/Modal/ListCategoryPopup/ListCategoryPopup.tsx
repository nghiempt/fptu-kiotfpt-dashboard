import React, { useState, ReactNode, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { IconButtonProps } from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
// import { signOut } from '../../../Auth/Auth.Api';
// import { routes } from '../../../../routes';
import { useNavigate } from "react-router-dom";
import { listCategory } from "../../../../utils/fake";

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

type ModalData = {
  children: ReactNode;
};

const ListCategoryPopupModal: React.FC<ModalData> = ({ children }) => {
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
            <b>List category</b>
          </Typography>
          <Divider sx={{ marginBottom: "20px" }} />
          {listCategory?.map((item: any, index: any) => {
            return (
              <div
                key={index}
                className="flex justify-between items-center w-full"
              >
                <div className="flex items-center gap-x-4 w-1/2">
                  <p className="w-1/2">{item?.name}</p>
                  <img
                    src={item?.thumbnail}
                    alt=""
                    style={{ width: "50px", height: "50px" }}
                  />
                </div>

                <Button
                  variant="contained"
                  sx={{ width: "10%" }}
                  color="success"
                  size="small"
                  onClick={createVoucher}
                >
                  Add
                </Button>
              </div>
            );
          })}

          <Box sx={{ display: "flex", marginTop: "30px" }}>
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

export default ListCategoryPopupModal;
