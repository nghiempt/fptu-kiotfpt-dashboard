import { Avatar, Box, Button, Divider, Tab, Tabs, TextField, Typography } from "@mui/material";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import ConfirmStatusOrder from "../../../Modal/confirm-status-order";
import ConfirmStatusProfile from "../../../Modal/confirm-status-profile";
import { PhotoCamera } from "@mui/icons-material";

interface SellerTableProps {
  data: any[];
}

const TableProfile: React.FC<SellerTableProps> = ({ data: initialData }) => {

  const [data, setData] = useState(initialData);

  const [isShowModalConfirm, setIsShowModalConfirm] = useState(false);
  const [status, setStatus] = useState("");

  const handleOpenModal = (status: string) => {
    setStatus(status);
    setIsShowModalConfirm(true);
  };

  const handleCloseModal = () => {
    setIsShowModalConfirm(false);
  };


  useEffect(() => {
    setData(initialData);
  }, [initialData]);

  const [tabValue, setTabValue] = useState(0);



  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

 
  return (
    <Box>
       <ConfirmStatusProfile open={isShowModalConfirm} handleClose={handleCloseModal} id="2" payload={status} />
      <Box sx={{ marginBottom: "20px", marginTop: "20px", marginLeft: "20px" }}>
        <Typography variant="h3" noWrap component="div" sx={{ flexGrow: 1 }}>
          <b>PROFILE</b>
        </Typography>
        <div className="max-w-4xl mx-auto mt-10 bg-white shadow-lg rounded-lg">
      <div className="flex">
        {/* Profile Section */}
        <div className="w-1/3 p-4 bg-blue-50">
          <div className="text-center relative">
            <Avatar
              alt="Tim Cook"
              className="mx-auto"
              sx={{ width: 80, height: 80 }}
            />
         
            <h2 className="mt-4 text-xl font-semibold">Tim Cook</h2>
            <p className="text-gray-500">CEO of Apple</p>
          </div>
          
        </div>


        {/* Form Section */}
        <div className="w-2/3 p-4">
          <Tabs value={tabValue} onChange={handleTabChange}>
            <Tab label="Account Settings" />
            <Tab label="Shop Settings" />
          </Tabs>
          <Box hidden={tabValue !== 0}>
            <form className="mt-4">
              <div className="grid grid-cols-2 gap-4">
                <TextField
                  label="Full Name"
                  defaultValue="Tim"
                  variant="outlined"
                  fullWidth
                />
                <TextField
                  label="Birthday"
                  defaultValue="20/11/2002"
                  variant="outlined"
                  fullWidth
                />
                <TextField
                  label="Phone Number"
                  defaultValue="(408) 996-1010"
                  variant="outlined"
                  fullWidth
                />
                <TextField
                  label="Email Address"
                  defaultValue="tcook@apple.com"
                  variant="outlined"
                  fullWidth
                />
           
              
               
              </div>
              <div className="mt-4 text-right">
                <Button onClick={() => handleOpenModal("cancel")}  variant="contained" color="primary">
                  Update Account
                </Button>
              </div>
            </form>
          </Box>
          <Box hidden={tabValue !== 1}>
         
                <form className="mt-4">
              <div className="grid grid-cols-1 gap-4">
              <TextField
                  label="Shop Name"
                  defaultValue="Tim"
                  variant="outlined"
                  fullWidth
                />
                <TextField
                  label="Address"
                  defaultValue="Can Tho"
                  variant="outlined"
                  fullWidth
                />
                <TextField
                  label="ShopPhone Number"
                  defaultValue="(408) 996-1010"
                  variant="outlined"
                  fullWidth
                />
                <TextField
                  label="Shop Email"
                  defaultValue="tcook@apple.com"
                  variant="outlined"
                  fullWidth
                />
              
               
              </div>
              <div className="mt-4 text-right">
                <Button onClick={() => handleOpenModal("cancel")}  variant="contained" color="primary">
                  Update Shop
                </Button>
              </div>
            </form>
          </Box>
        </div>
      </div>
    </div>
      </Box>
      <Divider />
    </Box>
  );
};

export default TableProfile;
