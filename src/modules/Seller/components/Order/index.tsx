import { Box, Typography, Pagination } from "@mui/material";
import { useEffect, useState } from "react";
import { AssetImages } from "../../../../utils/images";
import Helper from "../../../../utils/helper";
import ConfirmStatusOrder from "../../../Modal/confirm-status-order";

interface SellerTableProps {
  data: any[];
}

const TableOrder: React.FC<SellerTableProps> = ({ data: initialData }) => {

  const [data, setData] = useState(initialData);
  const [isShowModalConfirm, setIsShowModalConfirm] = useState(false);
  const [status, setStatus] = useState("");
  const [selectedItem, setSelectedItem] = useState({} as any);

  const handleOpenModal = (status: string) => {
    setStatus(status);
    setIsShowModalConfirm(true);
  };

  const handleCloseModal = () => {
    setIsShowModalConfirm(false);
  };

  useEffect(() => {
    setData(initialData);
    setSelectedItem(initialData[0]);
  }, [initialData]);

  return (
    <Box>
      <ConfirmStatusOrder open={isShowModalConfirm} handleClose={handleCloseModal} id="2" payload={status} />
      <Box sx={{ marginBottom: "20px", marginTop: "20px", marginLeft: "20px" }}>
        <Typography variant="h3" noWrap component="div" sx={{ flexGrow: 1 }}>
          <b>ORDER MANAGEMENT</b>
        </Typography>
        <div className="w-full flex gap-x-4 mt-4">
          <div className="w-3/5 flex flex-col gap-6">
            <div className="container mx-auto">
              <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <table className="min-w-full leading-normal">
                  <thead>
                    <tr>
                      <th className="px-5 py-3 bg-[rgb(var(--tertiary-rgb))] text-left text-md font-semibold text-white uppercase tracking-wider">
                        ID
                      </th>
                      <th className="px-5 py-3 bg-[rgb(var(--tertiary-rgb))] text-left text-md font-semibold text-white uppercase tracking-wider">
                        Customer name
                      </th>
                      <th className="px-5 py-3 bg-[rgb(var(--tertiary-rgb))] text-left text-md font-semibold text-white uppercase tracking-wider">
                        Total
                      </th>
                      <th className="py-3 bg-[rgb(var(--tertiary-rgb))] text-left text-md font-semibold text-white uppercase tracking-wider">
                        Time
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {data?.map((item: any, index: any) => {
                      return (
                        <tr key={index} onClick={() => setSelectedItem(item)}>
                          <td
                            className={`px-5 py-5 ${item === selectedItem ? "bg-gray-100" : "bg-white"
                              } border-b border-gray-200 text-[15px] cursor-pointer`}
                          >
                            <p className="text-gray-900 whitespace-no-wrap">
                              KFOR-0{item?.id}
                            </p>
                          </td>
                          <td
                            className={`px-5 py-5 ${item === selectedItem ? "bg-gray-100" : "bg-white"
                              } border-b border-gray-200 text-[15px] cursor-pointer`}
                          >
                            <div className="flex items-center gap-2">
                              <img
                                src={item?.shop?.thumbnail}
                                alt="voucher"
                                className="w-8 h-8"
                              />
                              <p className="text-gray-600 whitespace-no-wrap">
                                {item?.account_id}
                              </p>
                            </div>
                          </td>
                          <td
                            className={`px-5 py-5 ${item === selectedItem ? "bg-gray-100" : "bg-white"
                              } border-b border-gray-200 text-[15px] cursor-pointer`}
                          >
                            <p className="text-gray-600 font-bold text-[16px] whitespace-no-wrap">
                              ${item?.total}
                            </p>
                          </td>
                          <td
                            className={`py-5 ${item === selectedItem ? "bg-gray-100" : "bg-white"
                              } border-b border-gray-200 text-[15px] cursor-pointer`}
                          >
                            <p className="text-gray-600 whitespace-no-wrap">
                              {Helper.formatTime(item?.time_init)}
                            </p>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                <div className="flex justify-center gap-x-2 mt-8 pb-6">
                  <Pagination count={1} variant="outlined" shape="rounded" />
                </div>
              </div>
            </div>
          </div>
          <div className="w-2/5 flex flex-col gap-4">
            <div className="container mx-auto">
              <div className="bg-white shadow-md rounded-lg p-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2">
                    Order Detail
                  </h3>
                  <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-2xl font-bold mb-4">Order ID: 4</h2>
                    <div className="mb-4">
                      <p><strong>Time Initiated:</strong> 2024-06-14T07:31:25.000+00:00</p>
                      <p><strong>Time Completed:</strong> 2024-06-14T08:22:54.000+00:00</p>
                      <p><strong>Description:</strong> No note</p>
                      <p><strong>Total:</strong> $120.0</p>
                      <p><strong>Status:</strong> Completed</p>
                    </div>
                    <div className="mb-4">
                      <h3 className="text-xl font-semibold mb-2">Shop Details</h3>
                      <div className="flex items-center">
                        <img src="https://assets.kiotfpt.store/kattie_handmade_shop_kiotfpt.jpg" alt="Shop Thumbnail" className="w-16 h-16 rounded-full mr-4" />
                        <div>
                          <p><strong>Shop ID:</strong> 10</p>
                          <p><strong>Name:</strong> Levents</p>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Product Details</h3>
                      <div className="bg-gray-50 p-4 rounded-lg shadow-inner">
                        <div className="flex items-center mb-4">
                          <img src="https://assets.kiotfpt.store/Cream_LPOOVCOC229UC0101SS24_1.webp" alt="Product Thumbnail" className="w-20 h-20 rounded mr-4" />
                          <div>
                            <p><strong>Product ID:</strong> 1</p>
                            <p><strong>Name:</strong> Levents Stripe Polo</p>
                          </div>
                        </div>
                        <div className="ml-24">
                          <p><strong>Variant ID:</strong> 1</p>
                          <p><strong>Price:</strong> $20.0</p>
                          <p><strong>Quantity:</strong> 100</p>
                          <p><strong>Color:</strong> White</p>
                          <p><strong>Size:</strong> S</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-full flex justify-center items-center gap-2 pt-20">
                  <button onClick={() => handleOpenModal("cancel")} className="w-full bg-[rgb(var(--quaternary-rgb))] py-2 rounded-md text-white font-bold text-[16px]">Complete</button>
                  <button onClick={() => handleOpenModal("rejected")} className="w-full bg-[rgb(var(--primary-rgb))] py-2 rounded-md text-white font-bold text-[16px]">Reject</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Box>
    </Box>
  );
};

export default TableOrder;
