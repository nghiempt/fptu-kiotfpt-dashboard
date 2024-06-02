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
import { useState, useEffect } from "react";
import { currentCategories, currentProducts } from "../../../../utils/fake";
import ProductDetailPopupModal from "../../Modal/ProductDetailPopup/ProductDetailPopup";
import { useNavigate } from "react-router-dom";

interface SellerTableProps {
  data: any[];
}

const TableProduct: React.FC<SellerTableProps> = ({ data: initialData }) => {
  const [data, setData] = useState(initialData);
  const [searchValue, setSearchValue] = useState("");
  const [statusValue, setStatus] = useState("");
  const [typeValue, setType] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  // const currentProducts = data.slice(indexOfFirstUser, indexOfLastUser);
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

  const navigate = useNavigate();

  const handleAddProduct = () => {
    navigate("/seller/create-product");
  };

  useEffect(() => {}, [searchValue]);

  const handleInputChange = async (event: any) => {
    setSearchValue(event.target.value);
  };

  const handleSearch = async () => {
    try {
    } catch (error) {
      setData([]);
    }
  };

  const startFilter = async () => {
    try {
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
          <b>PRODUCT MANAGEMENT</b>
        </Typography>
      </Box>
      <Divider />
      <Box
        sx={{
          width: "100%",
          overflowX: "auto",
          marginBottom: "30px",
          marginTop: "20px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        {/* Search box */}
        <Box sx={{ display: "flex", marginLeft: "20px" }}>
          {/* Textbox */}
          <Box>
            <TextField
              id="outlined-size-small"
              placeholder="Search here"
              size="small"
              sx={{ width: "250px" }}
              value={searchValue}
              onChange={handleInputChange}
            />
          </Box>
          {/* Search button */}
          <Box>
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
                <Search style={{ fontSize: "21px", color: "white" }} />
              </Box>
            </IconButton>
          </Box>
        </Box>

        {/* Select type */}
        <Box sx={{ display: "flex", marginRight: "20px" }}>
          <Box>
            <Autocomplete
              size="small"
              disablePortal
              id="cbo-status"
              options={StatusList}
              getOptionLabel={(option) => option.label}
              onChange={handleStatusChange}
              sx={{ width: "170px", marginRight: "10px" }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder="Status"
                  style={{ caretColor: "transparent", cursor: "pointer" }}
                  disabled
                />
              )}
            />
          </Box>
          <Box>
            <Autocomplete
              size="small"
              disablePortal
              id="cbo-type"
              options={TypeList}
              getOptionLabel={(option) => option.label}
              onChange={handleTypeChange}
              sx={{ width: "170px" }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder="Type"
                  style={{ caretColor: "transparent", cursor: "pointer" }}
                  disabled
                />
              )}
            />
          </Box>
        </Box>
      </Box>
      <div className="flex p-5">
        <button onClick={handleAddProduct} className="border rounded-md py-2 px-4 bg-blue-100 hover:bg-blue-400 cursor-pointer">
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
                {/* <TableCell sx={{ color: "black" }}>
                  <div className="flex justify-center">
                    <b>SOLD</b>
                  </div>
                </TableCell> */}
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
                {/* <TableCell sx={{ color: "black" }}>
                  <div className="flex justify-center">
                    <b>RATE</b>
                  </div>
                </TableCell> */}
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
                    {/* <TableCell component="th" scope="row">
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', marginRight: '30px' }}>
                        <img src={data.accountProfile.avatar} alt="Avatar" style={{ width: '40px', height: '40px' }} />
                        <span style={{ marginLeft: '10px', fontWeight: 'bold' }}>{data.username}</span>
                      </div>
                    </TableCell> */}
                    {/* <TableCell>{data.id}</TableCell> */}
                    <TableCell>
                      <img
                        src="https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-llm05p5nkerg1c"
                        alt="img"
                        style={{ width: "40px", height: "40px" }}
                      />
                    </TableCell>
                    <TableCell>{data.name}</TableCell>
                    <TableCell>{data.discription}</TableCell>
                    {/* <TableCell>
                      <div className="flex justify-center">{data.sold}</div>
                    </TableCell> */}

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
                    {/* <TableCell>
                      <div className="flex justify-center">{data.rate}</div>
                    </TableCell> */}
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
                        <ProductDetailPopupModal>
                          <button
                            className="px-3 py-1 rounded-md text-white"
                            style={{ backgroundColor: "green" }}
                          >
                            Edit
                          </button>
                        </ProductDetailPopupModal>
                        <button
                          className="px-3 py-1 rounded-md text-white"
                          style={{ backgroundColor: "red" }}
                        >
                          Delete
                        </button>
                      </div>
                    </TableCell>

                    {/* <TableCell>
                      <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <span
                          style={{
                            backgroundColor: data.status ? '#0B2447' : '#DB4444',
                            color: 'white',
                            padding: '4px 10px',
                            borderRadius: '8px',
                            width: "80px",
                            textAlign: "center"
                          }}
                        >
                          {data.status ? 'Sign in' : 'Sign out'}
                        </span>
                      </div>
                    </TableCell> */}
                    {/* <TableCell>
                      <span style={{ color: data.role.id === 3 ? '#DB4444' : data.role.id === 2 ? '#5A6CB6' : '#0B2447' }}>
                        <b>{data.role.id === 3 ? 'Admin' : data.role.id === 2 ? 'Seller' : 'Customer'}</b>
                      </span>
                    </TableCell> */}
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
