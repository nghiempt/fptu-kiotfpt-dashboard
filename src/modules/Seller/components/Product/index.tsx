import { Box, Divider, Fab, Pagination, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import CheckIcon from "@mui/icons-material/Check";
import { AssetImages } from "../../../../utils/images";
import CancelIcon from "@mui/icons-material/Cancel";
import AddProductModal from "../../../Modal/add-product";
import AddIcon from "@mui/icons-material/Add";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import DeleteProductModal from "../../../Modal/delete-product";

interface SellerTableProps {
  data: any[];
}

const TableProduct: React.FC<SellerTableProps> = ({ data: initialData }) => {
  const [data, setData] = useState(initialData);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isOpenAddProduct, setIsOpenAddProduct] = useState(false);
  const [isOpenDeleteProduct, setIsOpenDeleteProduct] = useState(false);
  const [idCurent, setIdCurent] = useState("");
  const [dataVCurent, setDataVCurent] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState({
    thumbnail: [
      {
        link: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTed7ytmvKOdAhKD4DibQ3xEuFuBozev9PjLp3a00xpu94MUrWzIcX_pideQYkSK91kydw&usqp=CAU",
      },
      {
        link: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTed7ytmvKOdAhKD4DibQ3xEuFuBozev9PjLp3a00xpu94MUrWzIcX_pideQYkSK91kydw&usqp=CAU",
      },
      {
        link: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTed7ytmvKOdAhKD4DibQ3xEuFuBozev9PjLp3a00xpu94MUrWzIcX_pideQYkSK91kydw&usqp=CAU",
      },
      {
        link: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTed7ytmvKOdAhKD4DibQ3xEuFuBozev9PjLp3a00xpu94MUrWzIcX_pideQYkSK91kydw&usqp=CAU",
      },
      {
        link: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTed7ytmvKOdAhKD4DibQ3xEuFuBozev9PjLp3a00xpu94MUrWzIcX_pideQYkSK91kydw&usqp=CAU",
      },
      {
        link: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTed7ytmvKOdAhKD4DibQ3xEuFuBozev9PjLp3a00xpu94MUrWzIcX_pideQYkSK91kydw&usqp=CAU",
      },
    ],
  } as any);

  const handleRowClick = (item: any, index: any) => {
    setSelectedIndex(index);
    setSelectedProduct(item);
  };

  const handleOpenAddProduct = () => {
    setIsOpenAddProduct(true);
    // console.log(selectedProduct);
  };
  const handleOpenDeleteProduct = (id: any, dataV: any) => {
    setIsOpenDeleteProduct(true);
    setIdCurent(id);
    setDataVCurent(dataV);
    console.log(dataV);
    
    console.log(id);
  };

  const handleCloseAddProduct = () => {
    setIsOpenAddProduct(false);
  };
  const handleCloseDeleteProduct = () => {
    setIsOpenDeleteProduct(false);
  };

  useEffect(() => {
    setData(initialData);
  }, [initialData]);

  useEffect(() => {
    if (data.length > 0) {
      setSelectedProduct(data[0]);
    }
  }, [data]);

  useEffect(() => {}, [selectedProduct, dataVCurent, idCurent]);

  return (
    <Box>
      <AddProductModal
        open={isOpenAddProduct}
        handleClose={handleCloseAddProduct}
      />
      <DeleteProductModal
        open={isOpenDeleteProduct}
        handleClose={handleCloseDeleteProduct}
        id={idCurent}
        data={dataVCurent}
      />
      <Box sx={{ padding: "20px" }}>
        <div className="flex justify-between">
          <Typography variant="h3" noWrap component="div" sx={{ flexGrow: 1 }}>
            <b>PRODUCT MANAGEMENT</b>
          </Typography>
          <Fab onClick={handleOpenAddProduct} color="success" aria-label="add">
            <AddIcon />
          </Fab>
        </div>

        <div className="w-full flex gap-x-4 mt-4">
          <div className="w-1/2 flex flex-col gap-6">
            <div className="container mx-auto">
              <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <table className="min-w-full leading-normal">
                  <thead>
                    <tr>
                      <th className="px-5 py-3 bg-[#0B2447] text-left text-xs font-semibold text-white uppercase tracking-wider">
                        ID
                      </th>
                      <th className="px-5 py-3 bg-[#0B2447] text-left text-xs font-semibold text-white uppercase tracking-wider">
                        Name
                      </th>
                      {/* <th className="px-5 py-3 bg-[#0B2447] text-left text-xs font-semibold text-white uppercase tracking-wider">
                        
                      </th> */}
                      <th className="px-5 py-3 bg-[#0B2447] text-left text-xs font-semibold text-white uppercase tracking-wider"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {data?.map((item, index) => (
                      <tr
                        key={index}
                        onClick={() => handleRowClick(item, index)}
                        className={`cursor-pointer ${
                          selectedIndex === index ? "bg-gray-200" : "bg-white"
                        }`}
                      >
                        <td className="px-5 py-5 border-b border-gray-200 text-sm">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {item?.id}
                          </p>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 text-sm">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 w-10 h-10">
                              <img
                                className="w-full h-full rounded-full"
                                src={item?.thumbnail[0]?.link}
                                alt="transaction icon"
                              />
                            </div>
                            <div className="ml-3">
                              <p className="text-gray-900 whitespace-no-wrap">
                                {item?.name}
                              </p>
                            </div>
                          </div>
                        </td>

                        <td className="px-5 py-5 border-b border-gray-200 text-sm">
                          <p className="text-gray-900 whitespace-no-wrap">
                            <button
                              onClick={() =>
                                handleOpenDeleteProduct(
                                  selectedProduct?.id,
                                  selectedProduct?.variants
                                )
                              }
                              className="text-red-500 rounded-md flex justify-center items-center text-[13px]"
                            >
                              <DeleteForeverIcon className="mr-1" />
                              remove
                            </button>
                          </p>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="flex justify-center gap-x-2 mt-8 pb-6">
                  <Pagination count={10} variant="outlined" shape="rounded" />
                </div>
              </div>
            </div>
          </div>
          <div className="w-1/2">
            <div className="w-full flex flex-col gap-6 ">
              <div className="w-full container mx-auto ">
                <div className="w-full bg-[rgb(var(--secondary-rgb))] shadow-md p-6 rounded-lg">
                  <h3 className="text-lg font-bold mb-4 text-center">
                    Product Details
                  </h3>
                  <div className="w-full flex items-center mb-4">
                    <div className="w-full flex items-center gap-x-4">
                      <img
                        src={selectedProduct?.thumbnail[0]?.link}
                        alt="transaction icon"
                        className="w-56 border rounded-md shadow-md"
                      />
                      <div className="ml-3 flex flex-col">
                        <div className="flex items-center gap-x-2">
                          <h2 className="text-lg font-semibold">
                            {selectedProduct?.name}
                          </h2>
                          <div className="flex items-center">
                            <img
                              src={AssetImages.DISCOUNT_ICON}
                              alt="img"
                              style={{ width: "20%" }}
                            />
                            <h1 className="text-red-600">
                              -{selectedProduct?.discount}%
                            </h1>
                          </div>
                        </div>
                        <span className="text-sm text-gray-900 font-semibold">
                          Sold: {selectedProduct?.sold}
                        </span>
                        <span className="text-sm text-gray-900 font-semibold">
                          Price: {selectedProduct?.minPrice}$ -
                          {selectedProduct?.maxPrice}$
                        </span>
                        <span className="text-sm text-gray-900 font-semibold">
                          Rate: {selectedProduct?.rate} / 5
                        </span>
                        <div className="mb-4 flex gap-x-2 items-center">
                          <p className="text-sm text-gray-900 font-semibold">
                            Color:
                          </p>
                          <div className="flex gap-x-1">
                            <button className="bg-red-500 p-3 rounded-sm"></button>
                            <button className="bg-blue-500 p-3 rounded-sm"></button>
                            <button className="bg-green-500 p-3 rounded-sm"></button>
                            <button className="bg-white p-3 rounded-sm"></button>
                            <button className="bg-black p-3 rounded-sm"></button>
                          </div>
                        </div>
                        <div className="mb-4 flex gap-x-2 items-center">
                          <p className="text-sm text-gray-900 font-semibold">
                            Size:
                          </p>
                          <div className="flex gap-x-1">
                            <button className="px-3 py-1 border rounded-sm border-gray-500 font-semibold">
                              S
                            </button>
                            <button className="px-3 py-1 border rounded-sm border-gray-500 font-semibold">
                              M
                            </button>
                            <button className="px-3 py-1 border rounded-sm border-gray-500 font-semibold">
                              L
                            </button>
                            <button className="px-3 py-1 border rounded-sm border-gray-500 font-semibold">
                              XL
                            </button>
                          </div>
                        </div>
                        <div className="mb-4 flex gap-x-2 items-center">
                          <p className="text-sm text-gray-900 font-semibold">
                            Availability:
                          </p>
                          <p className="text-sm text-gray-900 font-semibold">
                            1
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="mb-4 flex gap-x-2">
                      <p className="text-sm text-gray-900 font-semibold">
                        Discription:
                      </p>
                      <p className="text-sm text-gray-500">
                        {selectedProduct?.description}
                      </p>
                    </div>
                    <div className="w-full flex gap-x-4">
                      <div className="w-1/2">
                        <div className="mb-4">
                          <div className="flex gap-x-4 items-center">
                            <p className="w-1/3 text-sm text-gray-900 font-semibold">
                              Best seller
                            </p>
                            {selectedProduct?.bestSeller ? (
                              <CheckIcon style={{ color: "green" }} />
                            ) : (
                              <CancelIcon style={{ color: "red" }} />
                            )}
                          </div>
                        </div>
                        <div className="mb-4">
                          <div className="flex gap-x-4 items-center">
                            <p className="w-1/3 text-sm text-gray-900 font-semibold">
                              Popular
                            </p>
                            {selectedProduct?.popular ? (
                              <CheckIcon style={{ color: "green" }} />
                            ) : (
                              <CancelIcon style={{ color: "red" }} />
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="w-1/2">
                        <div className="mb-4">
                          <div className="flex gap-x-4 items-center">
                            <p className="w-1/3 text-sm text-gray-900 font-semibold">
                              Top deal
                            </p>
                            {selectedProduct?.topDeal ? (
                              <CheckIcon style={{ color: "green" }} />
                            ) : (
                              <CancelIcon style={{ color: "red" }} />
                            )}
                          </div>
                        </div>
                        <div className="mb-4">
                          <div className="flex gap-x-4 items-center">
                            <p className="w-1/3 text-sm text-gray-900 font-semibold">
                              Official
                            </p>
                            {selectedProduct?.official ? (
                              <CheckIcon style={{ color: "green" }} />
                            ) : (
                              <CancelIcon style={{ color: "red" }} />
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <Divider className="" />
                  <div className="my-4">
                    <div className="flex flex-col gap-x-2">
                      <p className="text-sm text-gray-900 font-semibold mb-4">
                        Related information:
                      </p>
                      <div className="flex gap-x-10">
                        <div>
                          <img
                            src={selectedProduct?.brand?.thumbnail}
                            alt="transaction icon"
                            className="w-10 rounded-md"
                          />
                          <span className="text-sm text-gray-500 text-[12px] font-medium">
                            {selectedProduct?.brand?.name}
                          </span>
                        </div>
                        <div>
                          <img
                            src={selectedProduct?.category?.thumbnail}
                            alt="transaction icon"
                            className="w-10 rounded-md"
                          />
                          <span className="text-sm text-gray-500 text-[12px] font-medium">
                            {selectedProduct?.category?.name}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Box>
      <Divider />
    </Box>
  );
};

export default TableProduct;
