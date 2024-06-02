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
import { currentProducts } from "../../../../utils/fake";
import { useNavigate } from "react-router-dom";
import { ROUTE } from "../../../../routes/constant";

interface SellerTableProps {
  data: any[];
}

const TableProduct: React.FC<SellerTableProps> = ({ data: initialData }) => {
  const [data, setData] = useState(initialData);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const totalPages = Math.ceil(data.length / usersPerPage);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setCurrentPage(value);
  };

  const navigate = useNavigate();

  const goToEditProduct = () => {
    navigate(ROUTE.SELLER_EDIT_PRODUCT);
  };

  const goToAddProduct = () => {
    navigate(ROUTE.SELLER_CREATE_PRODUCT);
  };

  useEffect(() => {
    setData(initialData);
  }, [initialData]);

  return (
    <Box>
      {/* Table title */}
      <Box sx={{ marginBottom: "20px", marginTop: "20px", marginLeft: "20px" }}>
        <Typography variant="h3" noWrap component="div" sx={{ flexGrow: 1 }}>
          <b>PRODUCT MANAGEMENT</b>
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
        <button
          onClick={goToAddProduct}
          className="border rounded-md py-2 px-4 bg-blue-100 hover:bg-blue-400 cursor-pointer"
        >
          + Add Product
        </button>
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
                <TableCell>
                  <b>IMAGE</b>
                </TableCell>
                <TableCell sx={{ color: "black" }}>
                  <b>NAME</b>
                </TableCell>
                <TableCell sx={{ color: "black" }}>
                  <b>DISCRIPTION</b>
                </TableCell>
                <TableCell sx={{ color: "black" }}>
                  <div className="flex justify-center">
                    <b>MIN-PRICE</b>
                  </div>
                </TableCell>
                <TableCell sx={{ color: "black" }}>
                  <div className="flex justify-center">
                    <b>MAX-PRICE</b>
                  </div>
                </TableCell>
                <TableCell sx={{ color: "black" }}>
                  <div className="flex justify-center">
                    <b>DISCOUNT</b>
                  </div>
                </TableCell>
                <TableCell sx={{ color: "black" }}>
                  <div className="flex justify-center">
                    <b>BEST-SELLER</b>
                  </div>
                </TableCell>
                <TableCell sx={{ color: "black" }}>
                  <div className="flex justify-center">
                    <b>POPULAR</b>
                  </div>
                </TableCell>

                <TableCell sx={{ color: "black" }}>
                  <div className="flex justify-center">
                    <b>TOP-DEAL</b>
                  </div>
                </TableCell>
                <TableCell sx={{ color: "black" }}>
                  <div className="flex justify-center">
                    <b>OFFICIAL</b>
                  </div>
                </TableCell>
                <TableCell>
                  <b>ACTION</b>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {/* Have data */}
              {currentProducts && currentProducts.length > 0 ? (
                currentProducts.map((data) => (
                  <TableRow
                    key={data.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell>{data.id}</TableCell>

                    <TableCell>
                      <img
                        src="https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-llm05p5nkerg1c"
                        alt="img"
                        style={{ width: "40px", height: "40px" }}
                      />
                    </TableCell>
                    <TableCell>{data.name}</TableCell>
                    <TableCell>{data.discription}</TableCell>

                    <TableCell>
                      <div className="flex justify-center">
                        {data.min_price}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex justify-center">
                        {data.max_price}
                      </div>
                    </TableCell>

                    <TableCell>
                      <div className="flex justify-center">{data.discount}</div>
                    </TableCell>
                    <TableCell>
                      <div className="flex justify-center">
                        <span
                          style={{
                            backgroundColor: data.best_seller ? "green" : "red",
                            color: "white",
                            padding: "4px 10px",
                            borderRadius: "8px",
                            width: "80px",
                            textAlign: "center",
                          }}
                        >
                          {data.best_seller ? "true" : "false"}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex justify-center">
                        <span
                          style={{
                            backgroundColor: data.porpular ? "green" : "red",
                            color: "white",
                            padding: "4px 10px",
                            borderRadius: "8px",
                            width: "80px",
                            textAlign: "center",
                          }}
                        >
                          {data.porpular ? "true" : "false"}
                        </span>
                      </div>
                    </TableCell>

                    <TableCell>
                      <div className="flex justify-center">
                        <span
                          style={{
                            backgroundColor: data.top_deal ? "green" : "red",
                            color: "white",
                            padding: "4px 10px",
                            borderRadius: "8px",
                            width: "80px",
                            textAlign: "center",
                          }}
                        >
                          {data.top_deal ? "true" : "false"}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex justify-center">
                        <span
                          style={{
                            backgroundColor: data.official ? "green" : "red",
                            color: "white",
                            padding: "4px 10px",
                            borderRadius: "8px",
                            width: "80px",
                            textAlign: "center",
                          }}
                        >
                          {data.official ? "true" : "false"}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-x-2 overflow-hidden">
                        <button
                          className="px-3 py-1 rounded-md text-white"
                          style={{ backgroundColor: "green" }}
                          onClick={goToEditProduct}
                        >
                          Edit
                        </button>
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

export default TableProduct;
