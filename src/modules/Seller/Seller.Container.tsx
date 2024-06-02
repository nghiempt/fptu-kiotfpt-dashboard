import Box from "@mui/material/Box";
import * as React from "react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { ROUTE } from "../../routes/constant";
import SellerPage from "./SellerPage";
import TableCategory from "./components/Category";
import TableOrder from "./components/Order";
import TableProduct from "./components/Product";
import TableProfile from "./components/Profile";
import TableVoucher from "./components/Voucher";

const SellerContainer: React.FC<{}> = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const [dataUser] = useState([]);
  const [dataSeller] = useState<any[]>([]);
  const [dataCategory] = useState<any[]>([]);
  const [dataTransaction] = useState<any[]>([]);
  const [selectedItem, setSelectedItem] = useState<number>(0);

  let tableComponent = <TableCategory data={dataUser} />;

  if (
    selectedItem === 0 ||
    currentPath.toLowerCase() === ROUTE.SELLER_CATEGORY
  ) {
    tableComponent = <TableCategory data={dataUser} />;
  } else if (
    selectedItem === 1 ||
    currentPath.toLowerCase() === ROUTE.SELLER_ORDER
  ) {
    tableComponent = <TableOrder data={dataCategory} />;
  } else if (
    selectedItem === 2 ||
    currentPath.toLowerCase() === ROUTE.SELLER_PRODUCT
  ) {
    tableComponent = <TableProduct data={dataSeller} />;
  } else if (
    selectedItem === 3 ||
    currentPath.toLowerCase() === ROUTE.SELLER_VOUCHER
  ) {
    tableComponent = <TableVoucher data={dataTransaction} />;
  } else if (
    selectedItem === 4 ||
    currentPath.toLowerCase() === ROUTE.SELLER_PROFILE
  ) {
    tableComponent = <TableProfile data={dataTransaction} />;
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (
          currentPath.toLowerCase() === ROUTE.SELLER ||
          currentPath.toLowerCase() === ROUTE.SELLER_CATEGORY
        ) {
          setSelectedItem(0);
        } else if (currentPath.toLowerCase() === ROUTE.SELLER_CATEGORY) {
          setSelectedItem(0);
        } else if (currentPath.toLowerCase() === ROUTE.SELLER_ORDER) {
          setSelectedItem(1);
        } else if (currentPath.toLowerCase() === ROUTE.SELLER_PRODUCT) {
          setSelectedItem(2);
        } else if (currentPath.toLowerCase() === ROUTE.SELLER_VOUCHER) {
          setSelectedItem(3);
        } else if (currentPath.toLowerCase() === ROUTE.SELLER_PROFILE) {
          setSelectedItem(4);
        }
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    fetchData();
  }, [currentPath]);

  useEffect(() => {}, [
    dataUser,
    dataSeller,
    dataCategory,
    dataTransaction,
    selectedItem,
  ]);

  return (
    <Box width={"100%"}>
      <SellerPage
        username={"Seller"}
        permission={"Seller"}
        table={tableComponent}
        sideSelect={selectedItem}
      />
    </Box>
  );
};

export default SellerContainer;
