import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Modal from '@mui/material/Modal';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import React, { ReactNode, useEffect, useState } from 'react';
// import { getVoucherByShopID, setVoucherConfirmStatus, setVoucherRejectStatus } from "../../Admin.Api";

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "50%",
    height: 580,
    bgcolor: 'background.paper',
    boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.25)",
    p: 4,
    borderRadius: "8px"
};

type ModalData = {
    children: ReactNode;
    shopData: any;
};

const ShopModal: React.FC<ModalData> = ({ children, shopData }) => {
    const [voucherData, setData] = useState<any[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const getVoucher = async () => {
        // const result = await getVoucherByShopID(shopData.id);
        // setData(result);
    };

    const confirmVoucher = async (voucherID: any) => {
        // await setVoucherConfirmStatus(voucherID);
        // handleCloseModal();
    };

    const rejectVoucher = async (voucherID: any) => {
        // await setVoucherRejectStatus(voucherID);
        // handleCloseModal();
    };

    useEffect(() => {
        getVoucher();
    })

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
                        <b>VIEW VOUCHER OF '{shopData.name}'</b>
                    </Typography>
                    <Divider sx={{ marginBottom: "20px" }} />
                    <Box sx={{
                        height: "400px",
                        overflowY: "auto",
                        marginBottom: "30px"
                    }}>
                        <TableContainer component={Paper} className="admin-table-container">
                            <Table size="small">
                                <TableHead>
                                    <TableRow>
                                        <TableCell sx={{ color: 'black' }}><b>ID</b></TableCell>
                                        <TableCell sx={{ color: 'black' }}><b>CODE</b></TableCell>
                                        <TableCell sx={{ color: 'black' }}><b>DISCOUNT</b></TableCell>
                                        <TableCell sx={{ color: 'black' }}><b>AMOUNT</b></TableCell>
                                        <TableCell sx={{ color: 'black' }}><b>STATUS</b></TableCell>
                                        <TableCell sx={{ color: 'black' }}><b>DESCRIPTION</b></TableCell>
                                        <TableCell sx={{ color: 'black' }}>
                                            <div style={{ display: "flex", justifyContent: "center" }}>
                                                <b>ACTION</b>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        voucherData?.map((voucher) => (
                                            <TableRow key={voucher.id}>
                                                <TableCell sx={{ color: 'black' }}>{voucher.id}</TableCell>
                                                <TableCell sx={{ color: 'black' }}>{voucher.code}</TableCell>
                                                <TableCell sx={{ color: 'black' }}>{voucher.discount}</TableCell>
                                                <TableCell sx={{ color: 'black' }}>{voucher.usageAmount}</TableCell>
                                                <TableCell sx={{ color: 'black' }}>{voucher.status === true ? "Approved" : "Need approve"}</TableCell>
                                                <TableCell sx={{ color: 'black' }}>
                                                    <Box sx={{overflowX: "auto"}}>
                                                        {voucher.description}
                                                    </Box>
                                                </TableCell>
                                                <TableCell>
                                                    {voucher.status === false ? <div style={{ display: "flex", justifyContent: "center" }}>
                                                        <Box sx={{ display: "flex" }}>
                                                            <IconButton
                                                                sx={{ backgroundColor: "#0B2447", color: "white", padding: '4px 10px 4px 10px' }}
                                                                onClick={() => confirmVoucher(voucher.id)}
                                                            >
                                                                <span style={{ fontSize: "14px" }}>Approve</span>
                                                            </IconButton>
                                                            <Box sx={{ width: "10px" }}>

                                                            </Box>
                                                            <IconButton
                                                                sx={{ backgroundColor: "#DB4444", color: "white", padding: '4px 10px 4px 10px' }}
                                                                onClick={() => rejectVoucher(voucher.id)}
                                                            >
                                                                <span style={{ fontSize: "14px" }}>Reject</span>
                                                            </IconButton>
                                                        </Box>
                                                    </div> : ("")
                                                    }
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    }
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>
                    <Button variant="contained" sx={{ width: "100%" }} color="error" size='small' onClick={handleCloseModal}>Close</Button>
                </Box>
            </Modal>
        </div>
    );
};

export default ShopModal;
