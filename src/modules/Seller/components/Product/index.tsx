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

  const [selectedImage, setSelectedImage] = useState<string>("");
  //kiểm tra trùng color
  const mergedColors = selectedProduct?.variants?.reduce(
    (acc: any, curr: any) => {
      const existingColor = acc.find(
        (item: any) => item.color?.value === curr.color?.value
      );
      if (existingColor) {
        existingColor.quantity += curr.quantity;
      } else {
        acc.push(curr);
      }
      return acc;
    },
    []
  );

  //kiểm tra trùng size
  const mergedVariants = selectedProduct?.variants?.reduce(
    (acc: any, curr: any) => {
      const existingVariant = acc.find(
        (item: any) => item.size?.value === curr.size?.value
      );
      if (existingVariant) {
        existingVariant.quantity += curr.quantity;
      } else {
        acc.push(curr);
      }
      return acc;
    },
    []
  );

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
    console.log(selectedProduct);
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

  useEffect(() => {
    if (selectedProduct?.thumbnail?.length) {
      setSelectedImage(selectedProduct.thumbnail[0].link);
    }
  }, [selectedProduct]);

  useEffect(() => { }, [selectedProduct, dataVCurent, idCurent]);

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
                        className={`cursor-pointer ${selectedIndex === index ? "bg-gray-200" : "bg-white"
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
            <div className="w-full mb-4">
              <button
                onClick={handleOpenAddProduct}
                className="w-full border border-[rgb(var(--tertiary-rgb))] font-bold py-3 rounded-lg text-[rgb(var(--tertiary-rgb))]"
              >
                Add New Voucher
              </button>
            </div>
            <div className="w-full flex flex-col gap-6 ">
              <div className="w-full container mx-auto ">
                <div className="w-full bg-white shadow-md p-6 rounded-lg">
                  <h3 className="text-lg font-bold mb-4 text-center">
                    Product Details
                  </h3>
                  <div className="w-full flex items-center mb-4 ">
                    <div className="w-full flex items-center gap-x-4 ">
                      <div className="w-1/3 flex flex-col gap-2 ">
                        <div className="flex justify-center ">
                          <img
                            src={selectedImage}
                            alt="Selected"
                            className="w-56 border rounded-md shadow-md"
                          />
                        </div>

                        <div className="grid gap-x-1 grid-cols-6 cursor-pointer ">
                          {selectedProduct?.thumbnail
                            ?.slice(0, 6)
                            .map((item: any, index: any) => (
                              <div key={index}>
                                <img
                                  src={item?.link}
                                  alt="Thumbnail"
                                  className="w-10 border rounded-md shadow-md"
                                  onMouseEnter={() =>
                                    setSelectedImage(item?.link)
                                  }
                                />
                              </div>
                            ))}
                        </div>
                      </div>

                      <div className="w-2/3 ml-3 flex flex-col">
                        <div className="flex items-center gap-x-2">
                          <h2 className="text-lg font-semibold">
                            {selectedProduct?.name}
                          </h2>
                          {selectedProduct?.discount > 0 && (
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
                          )}
                        </div>
                        <span className="text-sm text-gray-900 font-semibold">
                          Sold: {selectedProduct?.sold}
                        </span>
                        <span className="text-sm text-gray-900 font-semibold">
                          Price: {selectedProduct?.minPrice === selectedProduct?.maxPrice ? `$${selectedProduct?.minPrice}` : `$${selectedProduct?.minPrice} - $${selectedProduct?.maxPrice}`}
                        </span>
                        <span className="text-sm text-gray-900 font-semibold mb-4">
                          Rate: {selectedProduct?.rate} / 5
                        </span>
                        <div className="mb-4 flex gap-x-2 items-center">
                          <p className="text-sm text-gray-900 font-semibold">
                            Color:
                          </p>
                          <div className="flex gap-x-1">
                            {mergedColors?.map((item: any, index: any) => (
                              <div key={index}>
                                <button className="px-3 py-1 border rounded-sm border-gray-500 font-semibold">
                                  {item?.color?.value}
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="mb-4 flex gap-x-2 items-center">
                          <p className="text-sm text-gray-900 font-semibold">
                            Size:
                          </p>
                          <div className="flex gap-x-1">
                            {mergedVariants?.map((item: any, index: any) => (
                              <div key={index}>
                                <button

                                  className="px-3 py-1 border rounded-sm border-gray-500 font-semibold hover:shadow-xl"
                                >
                                  {item?.size?.value}
                                </button>
                              </div>
                            ))}
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
                    <div className="py-4 flex gap-x-2">
                      <p className="text-sm text-gray-900 font-semibold">
                        Discription:
                      </p>
                      <p className="text-sm text-[20px] text-gray-500">
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </Box>
    </Box>
  );
};

export default TableProduct;
