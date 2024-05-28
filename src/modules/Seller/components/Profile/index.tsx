/* eslint-disable react-hooks/exhaustive-deps */
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Pagination,
  Box,
  Grid,
  Typography,
  TextField,
  Divider,
  IconButton,
  Autocomplete,
} from "@mui/material";
import Search from "@mui/icons-material/Search";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import VerifiedUserOutlinedIcon from "@mui/icons-material/VerifiedUserOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import StarIcon from "@mui/icons-material/Star";
import CheckIcon from "@mui/icons-material/Check";
import LockIcon from "@mui/icons-material/Lock";
// import Divider from "@mui/material/Divider";
import { useState, useEffect } from "react";
import { AssetImages } from "../../../../utils/images";
import UpdatePasswordPopupModal from "../../Modal/UpdatePasswordPopup/UpdatePasswordPopup";
// import { getAllUser, searchAccountByName, filterAccount } from "../Admin.Api";

interface SellerTableProps {
  data: any[];
}
interface PopupProps {
  handleClose: () => void;
}

const TableProfile: React.FC<SellerTableProps> = ({ data: initialData }) => {
  const [data, setData] = useState(initialData);
  const [searchValue, setSearchValue] = useState("");
  const [statusValue, setStatus] = useState("");
  const [typeValue, setType] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = data.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(data.length / usersPerPage);

  const StatusList = [{ label: "Sign in" }, { label: "Sign out" }];

  const TypeList = [
    { label: "Admin" },
    { label: "Seller" },
    { label: "Customer" },
  ];

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setCurrentPage(value);
  };

  useEffect(() => {
    // const fetchData = async () => {
    //   if (searchValue.length === 0) {
    //     const responseData = await getAllUser();
    //     setData(responseData);
    //     setSearchValue('');
    //   }
    // };
    // fetchData();
  }, [searchValue]);

  const handleInputChange = async (event: any) => {
    setSearchValue(event.target.value);
  };

  const handleSearch = async () => {
    try {
      // if (searchValue.length > 0) {
      //   setData([]);
      //   const searchResults = await searchAccountByName(searchValue);
      //   console.log(searchResults.data);
      //   setData(searchResults.data);
      //   setCurrentPage(1);
      // } else {
      //   setData([]);
      //   const responseData = await getAllUser();
      //   setData(responseData);
      //   setSearchValue("");
      // }
    } catch (error) {
      setData([]);
    }
  };

  const startFilter = async () => {
    try {
      // if (statusValue.length === 0 && typeValue.length === 0) {
      //   setData([]);
      //   const responseData = await getAllUser();
      //   setData(responseData);
      //   setSearchValue("");
      // } else {
      //   setData([]);
      //   const responseData = await filterAccount(statusValue, typeValue);
      //   setData(responseData.data);
      //   setCurrentPage(1);
      // }
    } catch {
      setData([]);
    }
  };

  const handleStatusChange = async (event: any, value: any) => {
    if (value != null) {
      if (value.label === "Sign in") {
        setStatus("true");
      } else if (value.label === "Sign out") {
        setStatus("false");
      }
    } else {
      setStatus("");
    }
  };

  const handleTypeChange = async (event: any, value: any) => {
    if (value != null) {
      if (value.label === "Admin") {
        setType("3");
      } else if (value.label === "Seller") {
        setType("2");
      } else if (value.label === "Customer") {
        setType("1");
      }
    } else {
      setType("");
    }
  };

  useEffect(() => {
    setData(initialData);
  }, [initialData]);

  useEffect(() => {
    startFilter();
  }, [statusValue, typeValue]);

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
                  <FavoriteIcon />
                  <h1>Followers: 99</h1>
                </div>
              </div>
            </div>
          </div>

         
        </div>
        <Divider orientation="vertical" flexItem />
        <div className="w-3/5 flex flex-col gap-6 px-10">
          <div>
            <h1>Phone and email</h1>
            <div className="flex justify-between pt-5">
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
          <div>
            <h1>Security</h1>
            <div className="flex justify-between pt-5">
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
          <div>
            <h1>Social network link</h1>
            <div className="flex justify-between pt-5">
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
