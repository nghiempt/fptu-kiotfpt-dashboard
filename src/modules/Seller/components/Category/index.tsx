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
  Divider,
} from "@mui/material";
import { useState, useEffect } from "react";
import { currentCategories } from "../../../../utils/fake";
import ListCategoryPopupModal from "../../Modal/ListCategoryPopup/ListCategoryPopup";
import EditCategoryPopupModal from "../../Modal/EditCategoryPopup/EditCategoryPopup";

interface SellerTableProps {
  data: any[];
}

const TableCategory: React.FC<SellerTableProps> = ({ data: initialData }) => {

  const [data, setData] = useState(initialData);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;
  const totalPages = Math.ceil(data.length / usersPerPage);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setCurrentPage(value);
  };

  useEffect(() => {
    setData(initialData);
  }, [initialData]);

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
          overflowX: "auto",
          marginBottom: "30px",
          display: "flex",
          justifyContent: "space-between",
        }}
      ></Box>
      <div className="flex p-5">
        <ListCategoryPopupModal>
          <button className="border rounded-md py-2 px-4 bg-blue-100 hover:bg-blue-400 cursor-pointer">
            + Add Category
          </button>
        </ListCategoryPopupModal>
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
                  <b>THUMBNAIL</b>
                </TableCell>
                <TableCell sx={{ color: "black" }}>
                  <b>NAME</b>
                </TableCell>
                <TableCell sx={{ color: "black" }}>
                  <b>STATUS</b>
                </TableCell>
                <TableCell>
                  <b>ACTION</b>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {/* Have data */}
              {currentCategories && currentCategories.length > 0 ? (
                currentCategories.map((data) => (
                  <TableRow
                    key={data.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell>{data.id}</TableCell>
                    <TableCell className="!py-4 w-40">
                      <img
                        src={data.thumbnail}
                        alt=""
                        style={{ width: "80px", height: "80px" }}
                      />
                    </TableCell>
                    <TableCell>{data.name}</TableCell>
                    <TableCell className="w-50">{data.active.toString()}</TableCell>
                    <TableCell>
                      <div className="flex gap-x-2 overflow-hidden">
                        <EditCategoryPopupModal>
                          <button
                            className="px-3 py-1 rounded-md text-white"
                            style={{ backgroundColor: "green" }}
                          >
                            Edit
                          </button>
                        </EditCategoryPopupModal>
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

export default TableCategory;
