import React, { useState, ReactNode, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { IconButtonProps } from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
// import { signOut } from '../../../Auth/Auth.Api';
// import { routes } from '../../../../routes';
import { useNavigate } from 'react-router-dom';

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
};

const CreateVoucherPopupModal: React.FC<ModalData> = ({ children }) => {
    const navigate = useNavigate()
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
                        <b>Edit voucher</b>
                    </Typography>
                    <Divider sx={{ marginBottom: "20px" }} />
                    <div className='flex flex-col gap-4 w-full'>
                        <input type="text" placeholder='Enter ID' className='p-2 border rounded-md outline-none'/>
                        <input type="text" placeholder='Enter value' className='p-2 border rounded-md outline-none'/>
                    </div>
                    <Box sx={{display: "flex", marginTop: "30px"}}>
                        <Button variant="contained" sx={{ width: "100%", marginRight: "10px" }} color="success" size='small' onClick={createVoucher}>Create</Button>
                        <Button variant="contained" sx={{ width: "100%", marginLeft: "10px" }} color='error' size='small' onClick={handleCloseModal}>Cancel</Button>
                    </Box>
                </Box>
            </Modal>
        </div>
    );
};

export default CreateVoucherPopupModal;
