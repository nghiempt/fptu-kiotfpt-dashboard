import Box from "@mui/material/Box";
import * as React from "react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { ROUTE } from "../../routes/constant";
import TableExample from "./components/Example";
import AdminPage from "./AdminPage";

const AdminContainer: React.FC<{}> = () => {

  const location = useLocation();
  const currentPath = location.pathname;

  const [dataExample] = useState<any[]>([]);

  const [selectedItem, setSelectedItem] = useState<number>(0);

  let tableComponent = <TableExample data={dataExample} />;

  if (
    selectedItem === 0 ||
    currentPath.toLowerCase() === ROUTE.ADMIN_STATISTICAL
  ) {
    tableComponent = <TableExample data={dataExample} />;
  } else if (
    selectedItem === 1 ||
    currentPath.toLowerCase() === ROUTE.ADMIN_CATEGORY
  ) {
    tableComponent = <TableExample data={dataExample} />;
  } else if (
    selectedItem === 2 ||
    currentPath.toLowerCase() === ROUTE.ADMIN_BRAND
  ) {
    tableComponent = <TableExample data={dataExample} />;
  } else if (
    selectedItem === 3 ||
    currentPath.toLowerCase() === ROUTE.ADMIN_SHOP
  ) {
    tableComponent = <TableExample data={dataExample} />;
  } else {
    tableComponent = <TableExample data={dataExample} />;
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (
          currentPath.toLowerCase() === ROUTE.ADMIN ||
          currentPath.toLowerCase() === ROUTE.ADMIN_STATISTICAL
        ) {
          setSelectedItem(0);
        } else if (currentPath.toLowerCase() === ROUTE.ADMIN_STATISTICAL) {
          setSelectedItem(0);
        } else if (currentPath.toLowerCase() === ROUTE.ADMIN_CATEGORY) {
          setSelectedItem(1);
        } else if (currentPath.toLowerCase() === ROUTE.ADMIN_BRAND) {
          setSelectedItem(2);
        } else if (currentPath.toLowerCase() === ROUTE.ADMIN_SHOP) {
          setSelectedItem(3);
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
