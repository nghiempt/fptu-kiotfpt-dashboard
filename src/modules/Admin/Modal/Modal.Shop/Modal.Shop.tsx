import React, { useState, ReactNode, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { IconButtonProps } from '@mui/material/IconButton';
import TextField from "@mui/material/TextField";
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';

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

const ShopModal: React.FC<ModalData> = ({ children, data }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    useEffect(() => {}, [isModalOpen])

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
                        <b>SHOP INFORMATION</b>
                    </Typography>
                    <Divider sx={{ marginBottom: "20px" }}/>
                    <TextField id="outlined-basic" label="ID" variant="outlined" sx={{ width: "100%", marginBottom: "15px" }} size='small' value={data.id} InputProps={{
                        readOnly: true,
                    }} />
                    <TextField id="outlined-basic" label="Name" variant="outlined" sx={{ width: "100%", marginBottom: "15px" }} size='small' value={data.name} InputProps={{
                        readOnly: true,
                    }} />
                    <TextField id="outlined-basic" label="Address" variant="outlined" sx={{ width: "100%", marginBottom: "15px" }} size='small' value={data.address} InputProps={{
                        readOnly: true,
                    }} />
                    <Button variant="contained" sx={{ width: "100%", marginBottom: "15px" }} size='small'>Save</Button>
                    <Button variant="contained" sx={{ width: "100%" }} color="error" size='small' onClick={handleCloseModal}>Cancel</Button>
                </Box>
            </Modal>
        </div>
    );
};

export default ShopModal;
