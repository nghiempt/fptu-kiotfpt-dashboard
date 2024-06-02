/* eslint-disable react-hooks/exhaustive-deps */
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import CheckIcon from "@mui/icons-material/Check";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import LockIcon from "@mui/icons-material/Lock";
import StarIcon from "@mui/icons-material/Star";
import VerifiedUserOutlinedIcon from "@mui/icons-material/VerifiedUserOutlined";
import { Box, Divider, Typography } from "@mui/material";
// import Divider from "@mui/material/Divider";
import { AssetImages } from "../../../../utils/images";
import UpdatePasswordPopupModal from "../../Modal/UpdatePasswordPopup/UpdatePasswordPopup";
// import { getAllUser, searchAccountByName, filterAccount } from "../Admin.Api";

interface SellerTableProps {
  data: any[];
}

const TableProfile: React.FC<SellerTableProps> = ({ data: initialData }) => {
  return (
    <Box>
      {/* Table title */}
      <Box sx={{ marginBottom: "20px", marginTop: "20px", marginLeft: "20px" }}>
        <Typography variant="h3" noWrap component="div" sx={{ flexGrow: 1 }}>
          <b>PROFILE MANAGEMENT</b>
        </Typography>
      </Box>
      <Divider />
      <div className="w-full flex gap-x-4 bg-gray-100  rounded-sm p-5">
        <div className="w-2/5 flex flex-col gap-6 items-center justify-center bg-blue-200">
          <div className="w-full flex flex-col items-center justify-center">
            <AccountCircleOutlinedIcon
              style={{ color: "#8B96A5", width: "100px", height: "100px" }}
            />
            <div className="flex flex-col gap-2 justify-center items-center">
              <h1 className="text-[16px] font-semibold">Shop của Trình</h1>
              <div className="w-1/2 flex justify-center items-center bg-blue-500 rounded-md">
                <CheckIcon style={{ color: "white" }} />
                <h1 className="text-white">Official</h1>
              </div>
              <div className="flex gap-x-2 text-[12px] items-center">
                <div className="flex justify-center items-center gap-1">
                  <StarIcon className="text-[#FF9017] text-[12px]" />
                  <h1>4.9&nbsp;/&nbsp;5.0</h1>
                </div>
                <div className="flex justify-center items-center gap-1">
                  <FavoriteIcon className="text-red-600" />
                  <h1>Followers: 99</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Divider orientation="vertical" flexItem />
        <div className="w-3/5 flex flex-col gap-6 px-10">
          <div>
            <h1 className="font-medium text-[18px]">Phone and email</h1>
            <Divider />
            <div className="flex justify-between pt-4">
              <div className="flex gap-x-2 items-center">
                <LocalPhoneOutlinedIcon />
                <div>
                  <h1>Phone:</h1>
                  <h1 className="font-medium text-[16px]">0123456789</h1>
                </div>
              </div>
              <div>
                <button className="text-blue-500 border border-blue-500 rounded-md py-1 px-2">
                  Update
                </button>
              </div>
            </div>
          </div>
          <div className="flex justify-between">
            <div className="flex gap-x-2 items-center">
              <EmailOutlinedIcon />
              <div>
                <h1>Email:</h1>
                <h1 className="font-medium text-[16px]">abc@gmail.com</h1>
              </div>
            </div>
            <div>
              <button className="text-blue-500 border border-blue-500 rounded-md py-1 px-2">
                Update
              </button>
            </div>
          </div>
          <Divider />
          <div>
            <h1 className="font-medium text-[18px]">Security</h1>
            <div className="flex justify-between pt-4">
              <div className="flex gap-x-2 items-center">
                <LockIcon />
                <div>
                  <h1>Change password</h1>
                </div>
              </div>
              <div>
                <UpdatePasswordPopupModal>
                  <button className="text-blue-500 border border-blue-500 rounded-md py-1 px-2">
                    Update
                  </button>
                </UpdatePasswordPopupModal>
              </div>
            </div>
          </div>
          <div className="flex justify-between">
            <div className="flex gap-x-2 items-center">
              <VerifiedUserOutlinedIcon />
              <div>
                <h1>Set up pin code</h1>
              </div>
            </div>
            <div>
              <button className="text-blue-500 border border-blue-500 rounded-md py-1 px-2">
                Establish
              </button>
            </div>
          </div>
          <Divider />
          <div>
            <h1 className="font-medium text-[18px]">Social network link</h1>
            <div className="flex justify-between pt-4">
              <div className="flex gap-x-2 items-center">
                <img src={AssetImages.GG_ICON} alt="img" width={30} />
                <div>
                  <h1>Google</h1>
                </div>
              </div>
              <div>
                <button className="text-blue-500 border border-blue-500 rounded-md py-1 px-2">
                  Link
                </button>
              </div>
            </div>
          </div>
          <div className="w-full flex font-medium items-center justify-center">
            <button className="bg-blue-500 py-1 px-5 rounded-md text-white">
              Save changes
            </button>
          </div>
        </div>
      </div>
    </Box>
  );
};

export default TableProfile;
