import { Box, Button, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import ConfirmStatusProfile from "../../../Modal/confirm-status-profile";

interface SellerTableProps {
  data: {};
}

const TableProfile: React.FC<SellerTableProps> = ({ data: initialData }: { data: any }) => {

  const [data, setData] = useState(initialData);
  const [tabValue, setTabValue] = useState(0);
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

  const handleTabChange = (newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <Box>
      <ConfirmStatusProfile open={isShowModalConfirm} handleClose={handleCloseModal} id="2" payload={status} />
      <Box sx={{ margin: "20px" }}>
        <Typography variant="h3" noWrap component="div" sx={{ flexGrow: 1 }}>
          <b>PROFILE</b>
        </Typography>
        <div className="w-full flex justify-center items-center">
          <div className="w-1/2 mx-auto mt-6 bg-white shadow-lg rounded-lg">
            <div className="flex">
              <div className="w-1/3 p-4 bg-[rgb(var(--quaternary-rgb))] flex justify-center items-center rounded-l-lg">
                <div className="flex flex-col justify-center items-center">
                  <img src={data?.thumbnail} alt="img" className="w-16 h-16 rounded-lg" />
                  <h2 className="mt-4 text-xl font-semibold text-white">{data?.name}</h2>
                  <p className="text-white">{data?.address?.profile?.name}</p>
                </div>
              </div>
              <div className="w-2/3 p-4">
                <div className="flex gap-4">
                  <button onClick={() => handleTabChange(0)} className={`py-2 px-8 ${tabValue === 0 ? 'bg-[rgb(var(--quaternary-rgb))] text-white' : 'bg-gray-300 text-gray-700'} rounded-lg font-semibold`}>Account Settings</button>
                  <button onClick={() => handleTabChange(1)} className={`py-2 px-8 ${tabValue === 1 ? 'bg-[rgb(var(--quaternary-rgb))] text-white' : 'bg-gray-300 text-gray-700'} rounded-lg font-semibold`}>Shop Settings</button>
                </div>

                <Box hidden={tabValue !== 0}>
                  <form className="mt-8">
                    <div className="grid grid-cols-2 gap-4">
                      <TextField
                        label="Full Name"
                        defaultValue={data?.address?.profile?.name}
                        variant="outlined"
                        fullWidth
                      />
                      <TextField
                        label="Birthday"
                        defaultValue={data?.address?.profile?.birthday}
                        variant="outlined"
                        fullWidth
                      />
                      <TextField
                        label="Phone Number"
                        defaultValue={data?.address?.profile?.phone}
                        variant="outlined"
                        fullWidth
                      />
                      <TextField
                        label="Email Address"
                        defaultValue={data?.address?.profile?.email}
                        variant="outlined"
                        fullWidth
                      />
                    </div>
                    <div className="mt-4 text-right">
                      <Button onClick={() => handleOpenModal("cancel")} variant="contained" color="secondary" className="!text-[rgb(var(--quaternary-rgb))]">
                        Update Account
                      </Button>
                    </div>
                  </form>
                </Box>
                <Box hidden={tabValue !== 1}>
                  <form className="mt-8">
                    <div className="grid grid-cols-1 gap-4">
                      <TextField
                        label="Shop Name"
                        defaultValue={data?.name}
                        variant="outlined"
                        fullWidth
                      />
                      <TextField
                        label="Address"
                        defaultValue={data?.address?.value}
                        variant="outlined"
                        fullWidth
                      />
                      <TextField
                        label="ShopPhone Number"
                        defaultValue={data?.phone}
                        variant="outlined"
                        fullWidth
                      />
                      <TextField
                        label="Shop Email"
                        defaultValue={data?.email}
                        variant="outlined"
                        fullWidth
                      />
                    </div>
                    <div className="mt-4 text-right">
                      <Button onClick={() => handleOpenModal("cancel")} variant="contained" color="secondary" className="!text-[rgb(var(--quaternary-rgb))]">
                        Update Shop
                      </Button>
                    </div>
                  </form>
                </Box>
              </div>
            </div>
          </div>
          <div className="w-1/2 h-10"></div>
        </div>
      </Box>
    </Box>
  );
};

export default TableProfile;
