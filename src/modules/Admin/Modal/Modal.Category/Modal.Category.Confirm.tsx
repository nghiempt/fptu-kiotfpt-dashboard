import React, { useState, ReactNode, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { IconButtonProps } from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
// import {
//     setCategoryStatus
// } from "../../Admin.Api";
const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.25)",
    p: 4,
    borderRadius: "8px"
};

type ModalData = {
    children: ReactNode;
    data: any;
};

const CategoryApprove: React.FC<ModalData> = ({ children, data }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const confirmCategory = async () => {
        // await setCategoryStatus(data.id);
        handleCloseModal();
    };

    useEffect(() => { }, [isModalOpen])

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
                    <Typography id="modal-modal-title" variant="h6" sx={{ marginBottom: "10px", fontSize: "18px" }}>
                        <b>APPROVE CATEGORY</b>
                    </Typography>
                    <Divider sx={{ marginBottom: "20px" }} />
                    <Box sx={{ display: "flex", marginBottom: "15px", alignItems: "center" }}>
                        <Box>
                            <img src={data.image} alt="Image of category" style={{ width: "40px", height: "40px" }} />
                        </Box>
                        <Box>
                            <label htmlFor="" style={{ fontWeight: "bold", marginLeft: "10px" }}>{data.name}</label>
                        </Box>
                    </Box>
                    <Typography id="modal-modal-title" sx={{ marginBottom: "25px", fontSize: "16px" }}>
                        Are you sure you want to approve this category?
                    </Typography>
                    <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                        <Box>
                            <Button variant="contained" size='small' onClick={confirmCategory}>Approve</Button>

                        </Box>
                        <Box sx={{ width: "10px" }}>

                        </Box>
                        <Box>
                            <Button variant="contained" color="error" size='small' onClick={handleCloseModal}>Cancel</Button>
                        </Box>
                    </Box>
                </Box>
            </Modal>
        </div>
    );
};

export default CategoryApprove;
