import Box from "@mui/material/Box";
import * as React from "react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { ROUTE } from "../../routes/constant";
import SellerPage from "./SellerPage";
import TableExample from "./components/Example";
import TableProduct from "./components/Product";
import { ProductService } from "../../services/product";

const SellerContainer: React.FC<{}> = () => {

  const location = useLocation();
  const currentPath = location.pathname;

  const [dataExample, setDataExample] = useState<any[]>([]);
  const [dataProduct, setDataProduct] = useState<any[]>([]);

  const [selectedItem, setSelectedItem] = useState<number>(0);

  let tableComponent = <TableExample data={dataExample} />;

  if (
    selectedItem === 0 ||
    currentPath.toLowerCase() === ROUTE.SELLER_STATISTICAL
  ) {
    tableComponent = <TableExample data={dataExample} />;
  } else if (
    selectedItem === 1 ||
    currentPath.toLowerCase() === ROUTE.SELLER_CATEGORY
  ) {
    tableComponent = <TableExample data={dataExample} />;
  } else if (
    selectedItem === 2 ||
    currentPath.toLowerCase() === ROUTE.SELLER_ORDER
  ) {
    tableComponent = <TableExample data={dataExample} />;
  } else if (
    selectedItem === 3 ||
    currentPath.toLowerCase() === ROUTE.SELLER_PRODUCT
  ) {
    tableComponent = <TableProduct data={dataProduct} />;
  } else if (
    selectedItem === 4 ||
    currentPath.toLowerCase() === ROUTE.SELLER_VOUCHER
  ) {
    tableComponent = <TableExample data={dataExample} />;
  } else if (
    selectedItem === 5 ||
    currentPath.toLowerCase() === ROUTE.SELLER_PROFILE
  ) {
    tableComponent = <TableExample data={dataExample} />;
  } else {
    tableComponent = <TableExample data={dataExample} />;
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (
          currentPath.toLowerCase() === ROUTE.SELLER ||
          currentPath.toLowerCase() === ROUTE.SELLER_STATISTICAL
        ) {
          setSelectedItem(0);
        } else if (currentPath.toLowerCase() === ROUTE.SELLER_STATISTICAL) {
          setSelectedItem(0);
        } else if (currentPath.toLowerCase() === ROUTE.SELLER_CATEGORY) {
          setSelectedItem(1);
        } else if (currentPath.toLowerCase() === ROUTE.SELLER_ORDER) {
          setSelectedItem(2);
        } else if (currentPath.toLowerCase() === ROUTE.SELLER_PRODUCT) {
          const pros = await ProductService.searchProduct("", "1", "8");
          if (pros?.result) {
            setDataProduct(pros?.data);
          }
          setSelectedItem(3);
        } else if (currentPath.toLowerCase() === ROUTE.SELLER_VOUCHER) {
          setSelectedItem(4);
        } else if (currentPath.toLowerCase() === ROUTE.SELLER_PROFILE) {
          setSelectedItem(5);
        }
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    fetchData();
  }, [currentPath]);

  useEffect(() => { }, [
    dataExample,
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
