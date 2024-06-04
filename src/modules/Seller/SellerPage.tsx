import React, { useState, useEffect } from "react";
import InventoryIcon from "@mui/icons-material/Inventory";
import MenuIcon from "@mui/icons-material/Menu";
import PersonIcon from "@mui/icons-material/Person";
import StorefrontIcon from "@mui/icons-material/Storefront";
import LogoutIcon from '@mui/icons-material/Logout';
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { AssetImages } from "../../utils/images";
import { Link, useNavigate } from "react-router-dom";
import CategoryIcon from '@mui/icons-material/Category';
import ReceiptIcon from '@mui/icons-material/Receipt';
import BarChartIcon from '@mui/icons-material/BarChart';
import { ROUTE } from "../../routes/constant";
import Cookie from 'js-cookie';

interface data {
  username: any;
  permission: any;
  table: any;
  sideSelect: any;
}

export default function SellerPage(data: data) {

  const navigate = useNavigate();
  const { username, permission, table, sideSelect } = data;

  const [selectedItem, setSelectedItem] = useState(sideSelect);
  const [isTabletWidth, setIsTabletWidth] = useState(false);

  const signOut = () => {
    Cookie.remove('accountID');
    Cookie.remove('role');
    navigate(ROUTE.SIGN_IN);
  }

  const OpenSidebar = () => {
    if (isTabletWidth === false) {
      setIsTabletWidth(true);
    } else {
      setIsTabletWidth(false);
    }
  };

  const handleItemClick = (index: any) => {
    setSelectedItem(index);
  };

  useEffect(() => {
    setSelectedItem(sideSelect);
  }, [sideSelect]);

  useEffect(() => {
    function handleResize() {
      const tabletWidth = 1048;
      if (window.innerWidth <= tabletWidth) {
        setIsTabletWidth(true);
      } else {
        setIsTabletWidth(false);
      }
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="w-full" style={{ display: "flex", height: "100vh" }}>
      <div
        className="side-container"
        style={{
          position: "relative",
          width: "250px",
          height: "100vh",
          backgroundColor: "#0B2447",
          zIndex: "999999",
        }}
        hidden={isTabletWidth}
      >
        <div className="item" style={{ marginTop: "40px" }}>
          <div
            className="side-logo"
            style={{ display: "flex", justifyContent: "center" }}
          >
            <img
              className="logo"
              style={{ width: "120px", height: "120px", borderRadius: "50%" }}
              src={AssetImages.LOGO}
              alt="logo" />
          </div>
          <div className="option-item">
            <div
              className="option-title"
              style={{ marginTop: "50px", marginLeft: "20px" }}
            >
              <label style={{ color: "#B7B9C7" }}>
                Manager Options
              </label>
            </div>
            <div className="option-select">
              <List>
                {["Statistical", "Category", "Order", "Product", "Voucher", "Profile"].map((text: any, index: any) => (
                  <ListItem
                    className="option-item-list"
                    key={index}
                    disablePadding
                  >
                    <Link
                      to={`/seller/${text.toLowerCase()}`}
                      style={{ width: "100%" }}
                    >
                      <ListItemButton
                        onClick={() => handleItemClick(index)}
                        sx={{
                          backgroundColor: index === selectedItem ? "#07182F" : "inherit",
                        }}
                      >
                        <ListItemIcon sx={{ color: "white" }}>
                          {index === 0 ? <BarChartIcon /> : null}
                          {index === 1 ? <CategoryIcon /> : null}
                          {index === 2 ? <InventoryIcon /> : null}
                          {index === 3 ? <StorefrontIcon /> : null}
                          {index === 4 ? <ReceiptIcon /> : null}
                          {index === 5 ? <PersonIcon /> : null}
                        </ListItemIcon>
                        <ListItemText sx={{ color: "white", marginLeft: "-18px" }} primary={text} />
                      </ListItemButton>
                    </Link>
                  </ListItem>
                ))}
              </List>
            </div>
          </div>
        </div>
        <div
          className="side-logout"
          style={{
            position: "absolute",
            bottom: "33px",
            left: "20px",
            right: "20px",
          }}
        >
          <div>
            <IconButton style={{ width: "100%" }}>
              <Button
                className="btn-side-logout"
                variant="outlined"
                style={{
                  color: "white",
                  width: "100%",
                  borderColor: "white",
                  height: "35px",
                }}
                onClick={signOut}
              >
                Sign Out <LogoutIcon style={{
                  color: "white",
                  height: "15px",
                  fontWeight: "bold",
                  marginLeft: "6px"
                }} />
              </Button>
            </IconButton>
          </div>
        </div>
      </div>
      <div style={{ width: "100%", overflow: "auto" }}>
        <div
          className="nav-container"
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "nowrap",
            alignItems: "center",
            width: "100%",
            height: "70px",
            backgroundColor: "#07182F",
          }}
        >
          <div
            className="title"
            style={{ display: "flex", alignItems: "center" }}
          >
            <div className="menu">
              <IconButton sx={{ marginLeft: "20px" }} onClick={OpenSidebar}>
                <MenuIcon sx={{ color: "white" }} />
              </IconButton>
            </div>
            <div className="brand">
              <h2
                style={{ fontSize: "25px", marginLeft: "20px", color: "white" }}
              >
                <b>SELLER PANEL</b>
              </h2>
            </div>
          </div>
        </div>
        <div
          className="table-data"
          style={{ display: "flex", justifyContent: "center" }}
        >
          <div
            className="data"
            style={{
              width: "100%",
              backgroundColor: "#FFFFFF",
              borderRadius: "8px",
              boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.25)",
              marginTop: "20px",
              marginLeft: "20px",
              marginRight: "20px",
              marginBottom: "20px",
            }}
          >
            {table}
          </div>
        </div>
      </div>
    </div>
  );
}
