import React, { useState, ReactNode, useEffect } from 'react';
import Box from '@mui/material/Box';
import {
    Typography, Modal, IconButtonProps, Button, Divider
} from '@mui/material';
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
    onConfirm: () => void;
};

const ConfirmTransaction: React.FC<ModalData> = ({ children, data, onConfirm }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const confirmTransaction = async () => {
        // await setTransactionStatus(data.data.id, "completed");
        handleCloseModal();
        onConfirm();
    };

    useEffect(() => {
    }, [isModalOpen]);

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
                    <Typography variant="h6" sx={{ marginBottom: "10px", fontSize: "18px" }}>
                        <b>CONFIRM TRANSACTION</b>
                    </Typography>
                    <Divider sx={{ marginBottom: "20px" }} />
                    <Typography variant="body1" sx={{ marginBottom: "40px", fontSize: "16px" }}>
                        Are you sure you want to <b>confirm</b> '{data.data.account.username}' transaction?
                    </Typography>
                    <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                        <Box>
                            <Button variant="contained" size='small' onClick={confirmTransaction}>Confirm</Button>
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