import React, { useState, ReactNode, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { IconButtonProps } from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
// import {
//     setTransactionStatus
// } from "../../Admin.Api";

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 510,
    bgcolor: 'background.paper',
    boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.25)",
    p: 4,
    borderRadius: "8px"
};

type ModalData = {
    children: ReactNode;
    data: any;
    onReject: () => void;
};

const ConfirmTransaction: React.FC<ModalData> = ({ children, data, onReject }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const rejectTransaction = async () => {
        // await setTransactionStatus(data.data.id, "canceled");
        handleCloseModal();
        onReject();
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
                    <Box>
                        <Typography id="modal-modal-title" variant="h6" sx={{ marginBottom: "10px", fontSize: "18px" }}>
                            <b>REJECT TRANSACTION</b>
                        </Typography>
                        <Divider sx={{ marginBottom: "20px" }} />
                        <Typography id="modal-modal-title" sx={{ marginBottom: "40px", fontSize: "16px" }}>
                            Are you sure you want to <b style={{ color: "#DB4444" }}>reject</b> '{data.data.account.username}' transaction?
                        </Typography>
                    </Box>
                    <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                        <Box>
                            <Button variant="contained" size='small' onClick={rejectTransaction}>Reject</Button>
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

export default ConfirmTransaction;
