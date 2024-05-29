import { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Pagination from "@mui/material/Pagination";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import { currentCategories } from "../../../utils/fake";
import ListCategoryPopupModal from "../../Seller/Modal/ListCategoryPopup/ListCategoryPopup";
import CreateCategoryPopupModal from "../Modal/CreateCategoryPopup/CreateCategoryPopup";
import UpdateCategoryPopupModal from "../Modal/UpdateCategoryPopup/UpdateCategoryPopup";
// import { getAllShopCategory, searchCategoryByName } from "../Admin.Api";

interface AdminTableProps {
  data: any[];
}

const TableUser: React.FC<AdminTableProps> = ({ data: initialData }) => {
  const [searchValue, setSearchValue] = useState("");
  const [data, setData] = useState(initialData);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = data.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(data.length / usersPerPage);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setCurrentPage(value);
  };

  const handleInputChange = async (event: any) => {
    setSearchValue(event.target.value);
  };

  const handleSearch = async () => {
    try {
      // if (searchValue.length > 0) {
      //   setData([]);
      //   const searchResults = await searchCategoryByName(searchValue);
      //   setData(searchResults.data);
      //   setCurrentPage(1);
      // } else {
      //   const responseData = await getAllShopCategory();
      //   setData(responseData);
      //   setSearchValue("");
      // }
    } catch (error) {
      console.error('Error searching account:', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      // if (searchValue.length === 0) {
      //   const responseData = await getAllShopCategory();
      //   setData(responseData);
      //   setSearchValue('');
      // }
    };
    fetchData();
  }, [searchValue]);

  return (
    <Box>
      {/* Table title */}
      <Box sx={{ marginBottom: "20px", marginTop: "20px", marginLeft: "20px" }}>
        <Typography variant="h3" noWrap component="div" sx={{ flexGrow: 1 }}>
          <b>CATEGORY MANAGEMENT</b>
        </Typography>
      </Box>
      <Divider />
      <Box
        sx={{
          width: "100%",
          marginBottom: "30px",
          marginTop: "20px",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        {/* Serach box */}
        <Box sx={{ display: "flex", marginLeft: "20px" }}>
          <Box>
            {/* Textbox */}
            <TextField
              placeholder='Search here'
              id="outlined-size-small"
              size="small"
              sx={{ width: "250px" }}
              value={searchValue}
              onChange={handleInputChange}
            />
          </Box>
          <Box>
            {/* Search button */}
            <IconButton
              type="button"
              aria-label="search"
              style={{
                transform: "translateX(-35px)",
                fontSize: "10px",
                backgroundColor: "#0B2447",
                borderRadius: "0 8px 8px 0",
              }}
              onClick={handleSearch}
            >
              <Box>
                <SearchIcon style={{ fontSize: "21px", color: "white" }} />
              </Box>
            </IconButton>
          </Box>
        </Box>
      </Box>
      <div className="flex p-5">
        <CreateCategoryPopupModal>
          <button className="border rounded-md py-2 px-4 bg-blue-100 hover:bg-blue-400 cursor-pointer">
            + Add Category
          </button>
        </CreateCategoryPopupModal>
      </div>
      {/* Show data */}
      <Box
        sx={{ marginLeft: "20px", marginRight: "20px", marginBottom: "20px" }}
      >
        <TableContainer component={Paper} className="admin-table-container">
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell sx={{ color: "black" }}>
                  <b>ID</b>
                </TableCell>
                <TableCell sx={{ color: "black" }}>
                  <b>NAME</b>
                </TableCell>
                <TableCell sx={{ color: "black" }}>
                    <b>THUMBNAIL</b>
                </TableCell>
                <TableCell>
                  <b>ACTION</b>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
            {currentCategories && currentCategories.length > 0 ? (
                currentCategories.map((data) => (
                  <TableRow
                    key={data.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell>{data.id}</TableCell>
                    <TableCell>{data.name}</TableCell>
                    <TableCell>
                      <img
                        src={data.thumbnail}
                        alt=""
                        style={{ width: "100px", height: "100px" }}
                      />
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-x-2 overflow-hidden">
                        <UpdateCategoryPopupModal>
                        <button
                          className="px-3 py-1 rounded-md text-white"
                          style={{ backgroundColor: "green" }}
                        >
                          Edit
                        </button>
                        </UpdateCategoryPopupModal>
                        <button
                          className="px-3 py-1 rounded-md text-white"
                          style={{ backgroundColor: "red" }}
                        >
                          Delete
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                // No data
                <TableRow>
                  <TableCell colSpan={8} sx={{ textAlign: "center" }}>
                    <div style={{ marginTop: "10px", marginBottom: "10px" }}>
                      <label style={{ fontSize: "16px" }} htmlFor="">
                        Data not found
                      </label>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <Grid
          spacing={2}
          sx={{
            width: "100%",
            marginTop: "20px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Grid item xs={6}>
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={handlePageChange}
            />
          </Grid>
          <Grid item xs={6} sx={{ marginTop: "10px" }}>
            <label>
              <b>
                Showing {currentPage} of {totalPages}{" "}
                {totalPages > 1 ? "pages" : "page"}
              </b>
            </label>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default TableUser;
