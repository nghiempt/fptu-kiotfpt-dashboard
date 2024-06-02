import {
  Box,
  Divider,
  Grid,
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { currentOrders } from "../../../../utils/fake";
import OrderDetailPopupModal from "../../Modal/OrderDetailPopup/OrderDetailPopup";

interface SellerTableProps {
  data: any[];
}

const TableOrder: React.FC<SellerTableProps> = ({ data: initialData }) => {
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
          <b>ORDER MANAGEMENT</b>
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
                  <b>TIME_INIT</b>
                </TableCell>
                <TableCell sx={{ color: "black" }}>
                  <b>TIME_COMPLETE</b>
                </TableCell>
                <TableCell sx={{ color: "black" }}>
                  <b>DESC</b>
                </TableCell>
                <TableCell sx={{ color: "black" }}>
                  <b>TOTAL</b>
                </TableCell>
                <TableCell sx={{ color: "black" }}></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {/* Have data */}
              {currentOrders && currentOrders.length > 0 ? (
                currentOrders.map((data) => (
                  <TableRow
                    key={data.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell>{data.id}</TableCell>
                    <TableCell>{data.time_init}</TableCell>
                    <TableCell>{data.time_complete}</TableCell>
                    <TableCell>{data.desc}</TableCell>
                    <TableCell>{data.total}</TableCell>
                    <TableCell>
                      <div className="flex gap-x-2 overflow-hidden">
                        <OrderDetailPopupModal>
                          <button
                            className="px-3 py-1 rounded-md text-white"
                            style={{ backgroundColor: "green" }}
                          >
                            View
                          </button>
                        </OrderDetailPopupModal>
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

export default TableOrder;
