import Box from "@mui/material/Box";
import * as React from "react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { ROUTE } from "../../routes/constant";
import AdminPage from "./AdminPage";
import TableCategory from "./components/Category";
import TableBrand from "./components/Brand";
import TableShop from "./components/Shop";
import TableStatistical from "./components/Statistical";
import { CategoryService } from "../../services/category";
import { BrandService } from "../../services/brand";
import { ShopService } from "../../services/shop";

const AdminContainer: React.FC<{}> = () => {

  const location = useLocation();
  const currentPath = location.pathname;

  const [dataShop, setDataShop] = useState<any[]>([]);
  const [dataCategory, setDataCategory] = useState<any[]>([]);
  const [dataBrand, setDataBrand] = useState<any[]>([])
  const [dataStatistical, setDataStatistical] = useState<any[]>([])

  const [selectedItem, setSelectedItem] = useState<number>(0);

  let tableComponent = <TableStatistical data={dataStatistical} />;

  if (
    selectedItem === 0 ||
    currentPath.toLowerCase() === ROUTE.ADMIN_STATISTICAL
  ) {
    tableComponent = <TableStatistical data={dataStatistical} />;
  } else if (
    selectedItem === 1 ||
    currentPath.toLowerCase() === ROUTE.ADMIN_CATEGORY
  ) {
    tableComponent = <TableCategory data={dataCategory} />;
  } else if (
    selectedItem === 2 ||
    currentPath.toLowerCase() === ROUTE.ADMIN_BRAND
  ) {
    tableComponent = <TableBrand data={dataBrand} />;
  } else if (
    selectedItem === 3 ||
    currentPath.toLowerCase() === ROUTE.ADMIN_SHOP
  ) {
    tableComponent = <TableShop data={dataShop} />;
  } else {
    tableComponent = <TableStatistical data={dataStatistical} />;
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
          const cats = await CategoryService.getAllCategories();
          if (cats?.result) {
            setDataCategory(cats?.data);
          }
          setSelectedItem(1);
        } else if (currentPath.toLowerCase() === ROUTE.ADMIN_BRAND) {
          const bras = await BrandService.getAllBrand();
          if (bras?.result) {
            setDataBrand(bras?.data);
          }
          setSelectedItem(2);
        } else if (currentPath.toLowerCase() === ROUTE.ADMIN_SHOP) {
          const shops = await ShopService.getAllShops();
          if (shops?.result) {
            setDataShop(shops?.data);
          }
          setSelectedItem(3);
        }
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    fetchData();
  }, [currentPath]);

  useEffect(() => { }, [
    dataShop,
    dataCategory,
    dataBrand,
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
