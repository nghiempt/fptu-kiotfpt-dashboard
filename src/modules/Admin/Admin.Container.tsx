import * as React from "react";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import TableSeller from "./Shop/Admin.Shop";
import TableCategory from "./Category/Admin.Category";
import AdminPage from "./Admin.Page";
import {
  getAllUser,
  getAllShopInformation,
  getAllShopCategory,
  getAllTransaction,
} from "./Admin.Api";
import { ROUTE } from "../../routes/constant";

const AdminContainer: React.FC<{}> = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const [dataUser, setDataUser] = useState<any[]>([]);
  const [dataSeller, setDataSeller] = useState<any[]>([]);
  const [dataCategory, setDataCategory] = useState<any[]>([]);
  const [dataTransaction, setDataTransaction] = useState<any[]>([]);
  const [selectedItem, setSelectedItem] = useState<number>(0);

  let tableComponent = <TableCategory data={dataCategory} />;

  if (
    selectedItem === 1 ||
    currentPath.toLowerCase() === ROUTE.ADMIN_CATEGORY
  ) {
    tableComponent = <TableCategory data={dataCategory} />;
  } else if (
    selectedItem === 2 ||
    currentPath.toLowerCase() === ROUTE.ADMIN_SHOP
  ) {
    tableComponent = <TableSeller data={dataSeller} />;
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (
          currentPath.toLowerCase() === "/admin" ||
          currentPath.toLowerCase() === "/admin/account"
        ) {
          const responseData = await getAllUser();
          setDataUser(responseData);
          setSelectedItem(0);
        } else if (currentPath.toLowerCase() === "/admin/category") {
          const responseData = await getAllShopCategory();
          setDataCategory(responseData);
          setSelectedItem(1);
        } else if (currentPath.toLowerCase() === "/admin/shop") {
          const responseData = await getAllShopInformation();
          setDataSeller(responseData);
          setSelectedItem(2);
        } else if (currentPath.toLowerCase() === "/admin/transaction") {
          const responseData = await getAllTransaction();
          setDataTransaction(responseData);
          setSelectedItem(3);
        }
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    fetchData();
  }, [currentPath]);

  useEffect(() => { }, [dataUser, dataSeller, dataCategory, dataTransaction, selectedItem]);

  return (
    <Box width={'100%'}>
      <AdminPage
        username={"Admin"}
        permission={"Admin"}
        table={tableComponent}
        sideSelect={selectedItem}
      />
    </Box>
  );
};

export default AdminContainer;
