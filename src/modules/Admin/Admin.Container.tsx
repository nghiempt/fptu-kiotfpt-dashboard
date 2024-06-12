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

const AdminContainer: React.FC<{}> = () => {

  const location = useLocation();
  const currentPath = location.pathname;

  const [dataShop, setDataShop] = useState<any[]>([
    {
      id: 10,
      name: "Levents",
      email: "levent@gmail.com",
      phone: "0877366566",
      thumbnail: "https://assets.kiotfpt.store/kattie_handmade_shop_kiotfpt.jpg",
      rate: 4.5,
      official: false,
      follower: 0,
    },
    {
      id: 10,
      name: "Levents",
      email: "levent@gmail.com",
      phone: "0877366566",
      thumbnail: "https://assets.kiotfpt.store/kattie_handmade_shop_kiotfpt.jpg",
      rate: 4.5,
      official: false,
      follower: 0,
    },
    {
      id: 10,
      name: "Levents",
      email: "levent@gmail.com",
      phone: "0877366566",
      thumbnail: "https://assets.kiotfpt.store/kattie_handmade_shop_kiotfpt.jpg",
      rate: 4.5,
      official: false,
      follower: 0,
    },
    {
      id: 10,
      name: "Levents",
      email: "levent@gmail.com",
      phone: "0877366566",
      thumbnail: "https://assets.kiotfpt.store/kattie_handmade_shop_kiotfpt.jpg",
      rate: 4.5,
      official: false,
      follower: 0,
    },
    {
      id: 10,
      name: "Levents",
      email: "levent@gmail.com",
      phone: "0877366566",
      thumbnail: "https://assets.kiotfpt.store/kattie_handmade_shop_kiotfpt.jpg",
      rate: 4.5,
      official: false,
      follower: 0,
    },
    {
      id: 10,
      name: "Levents",
      email: "levent@gmail.com",
      phone: "0877366566",
      thumbnail: "https://assets.kiotfpt.store/kattie_handmade_shop_kiotfpt.jpg",
      rate: 4.5,
      official: false,
      follower: 0,
    },
    {
      id: 10,
      name: "Levents",
      email: "levent@gmail.com",
      phone: "0877366566",
      thumbnail: "https://assets.kiotfpt.store/kattie_handmade_shop_kiotfpt.jpg",
      rate: 4.5,
      official: false,
      follower: 0,
    },
    {
      id: 10,
      name: "Levents",
      email: "levent@gmail.com",
      phone: "0877366566",
      thumbnail: "https://assets.kiotfpt.store/kattie_handmade_shop_kiotfpt.jpg",
      rate: 4.5,
      official: false,
      follower: 0,
    },
  ]);
  const [dataCategory, setDataCategory] = useState<any[]>([
    {
      id: 1,
      name: "Category 1",
      amount_product: 50,
      thumbnail: "https://assets.kiotfpt.store/clothes_category_kiotfpt.jpg",
      status: {
        id: 1,
        name: "active",
      }
    },
  ]);
  const [dataBrand, setDataBrand] = useState<any[]>([
    {
      id: 1,
      name: "Brand 1",
      thumbnail: "https://assets.kiotfpt.store/clothes_category_kiotfpt.jpg",
      status: {
        id: 1,
        name: "active",
      }
    },
  ])
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
