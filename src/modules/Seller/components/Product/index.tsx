import { Box, Divider, Pagination, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import CheckIcon from "@mui/icons-material/Check";

interface SellerTableProps {
  data: any[];
}

const TableProduct: React.FC<SellerTableProps> = ({ data: initialData }) => {

  const [data, setData] = useState(initialData);
  const [selectedProduct, setSelectedProduct] = useState({
    thumbnail: [
      {
        link: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTed7ytmvKOdAhKD4DibQ3xEuFuBozev9PjLp3a00xpu94MUrWzIcX_pideQYkSK91kydw&usqp=CAU'
      },
      {
        link: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTed7ytmvKOdAhKD4DibQ3xEuFuBozev9PjLp3a00xpu94MUrWzIcX_pideQYkSK91kydw&usqp=CAU'
      },
      {
        link: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTed7ytmvKOdAhKD4DibQ3xEuFuBozev9PjLp3a00xpu94MUrWzIcX_pideQYkSK91kydw&usqp=CAU'
      },
      {
        link: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTed7ytmvKOdAhKD4DibQ3xEuFuBozev9PjLp3a00xpu94MUrWzIcX_pideQYkSK91kydw&usqp=CAU'
      },
      {
        link: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTed7ytmvKOdAhKD4DibQ3xEuFuBozev9PjLp3a00xpu94MUrWzIcX_pideQYkSK91kydw&usqp=CAU'
      },
      {
        link: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTed7ytmvKOdAhKD4DibQ3xEuFuBozev9PjLp3a00xpu94MUrWzIcX_pideQYkSK91kydw&usqp=CAU'
      }
    ],
  } as any);

  useEffect(() => {
    setData(initialData);
  }, [initialData]);

  useEffect(() => { }, [selectedProduct]);

  return (
    <Box>
      <Box sx={{ padding: "20px" }}>
        <Typography variant="h3" noWrap component="div" sx={{ flexGrow: 1 }}>
          <b>PRODUCT MANAGEMENT</b>
        </Typography>
        <div className="w-full flex gap-x-4 mt-4">
          <div className="w-3/5 flex flex-col gap-6">
            <div className="container mx-auto">
              <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <table className="min-w-full leading-normal">
                  <thead>
                    <tr>
                      <th className="px-5 py-3 bg-[#0B2447] text-left text-xs font-semibold text-white uppercase tracking-wider">
                        Name
                      </th>
                      <th className="px-5 py-3 bg-[#0B2447] text-left text-xs font-semibold text-white uppercase tracking-wider">
                        Price
                      </th>
                      <th className="px-5 py-3 bg-[#0B2447] text-left text-xs font-semibold text-white uppercase tracking-wider">
                        Discount
                      </th>
                      <th className="px-5 py-3 bg-[#0B2447] text-left text-xs font-semibold text-white uppercase tracking-wider">
                        Official
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      data?.map((item: any, index: any) => {
                        return (
                          <tr key={index} onClick={() => setSelectedProduct(item)}>
                            <td className={`px-5 py-5 ${index === 1 ? 'bg-gray-200' : 'bg-white'} border-b border-gray-200 text-sm cursor-pointer`}>
                              <div className="flex items-center">
                                <div className="flex-shrink-0 w-10 h-10">
                                  <img className="w-full h-full rounded-full" src={item?.thumbnail[0]?.link} alt="transaction icon" />
                                </div>
                                <div className="ml-3">
                                  <p className="text-gray-900 whitespace-no-wrap">
                                    {item?.name}
                                  </p>
                                  <p className="text-gray-600 whitespace-no-wrap">
                                    Sold: {item?.maxPrice}
                                  </p>
                                </div>
                              </div>
                            </td>
                            <td className={`px-5 py-5 ${index === 1 ? 'bg-gray-200' : 'bg-white'} border-b border-gray-200 text-sm cursor-pointer`}>
                              <p className="text-gray-900 whitespace-no-wrap">${item?.maxPrice}</p>
                            </td>
                            <td className={`px-5 py-5 ${index === 1 ? 'bg-gray-200' : 'bg-white'} border-b border-gray-200 text-sm cursor-pointer`}>
                              <p className="text-gray-900 whitespace-no-wrap">{item?.discount}%</p>
                            </td>
                            <td className={`px-5 py-5 ${index === 1 ? 'bg-gray-200' : 'bg-white'} border-b border-gray-200 text-sm cursor-pointer`}>
                              <span className="relative inline-block font-semibold text-green-900 leading-tight">
                                <div className="w-full flex justify-center items-center bg-green-500 p-1 rounded-full">
                                  <CheckIcon style={{ color: "white" }} />
                                </div>
                              </span>
                            </td>
                          </tr>
                        )
                      })
                    }
                  </tbody>
                </table>
                <div className="flex justify-center gap-x-2 mt-8 pb-6">
                  <Pagination count={10} variant="outlined" shape="rounded" />
                </div>
              </div>
            </div>
          </div>
          <div className="w-2/5 flex flex-col gap-6">
            <div className="container mx-auto">
              <div className="bg-white shadow-md rounded-lg p-6">
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center">
                    <img src={selectedProduct?.thumbnail[0]?.link} alt="transaction icon" className="w-10 h-10 rounded-full" />
                    <div className="ml-3">
                      <h2 className="text-lg font-semibold">{selectedProduct?.name}</h2>
                      <span className="text-sm text-gray-500">{selectedProduct?.sold}</span>
                    </div>
                  </div>
                  <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                    <span aria-hidden className="absolute inset-0 border border-green-900 opacity-50 rounded-full"></span>
                    <span className="relative">Completed</span>
                  </span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Purchase Details</h3>
                  <div className="mb-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-500">Invoice Number</p>
                        <p className="text-sm text-blue-500">JSRY302-1843-01</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Date Purchased</p>
                        <p className="text-sm text-gray-900">18 May 2024, 16:01 PM</p>
                      </div>
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Timeline</h3>
                  <div className="mb-4">
                    <ul className="timeline">
                      <li className="mb-4">
                        <p className="text-sm text-gray-500">18 May 2024</p>
                        <p className="text-sm text-gray-900 font-semibold">Transaction Finished</p>
                        <p className="text-sm text-gray-500">Balance is received</p>
                      </li>
                      <li className="mb-4">
                        <p className="text-sm text-gray-500">17 May 2024</p>
                        <p className="text-sm text-gray-900 font-semibold">Transaction Confirmed</p>
                        <p className="text-sm text-gray-500">Balance is sent by customer</p>
                      </li>
                      <li className="mb-4">
                        <p className="text-sm text-gray-500">16 May 2024</p>
                        <p className="text-sm text-gray-900 font-semibold">Transaction has verified</p>
                        <p className="text-sm text-gray-500">Payment has verified by system</p>
                      </li>
                    </ul>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Payment Details</h3>
                  <div className="mb-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-500">Payment Method</p>
                        <p className="text-sm text-gray-900">Credit Card <img src="https://cdn-icons-png.flaticon.com/128/8983/8983163.png" alt="visa" className="w-6 h-6 inline-block ml-2" /></p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Shipment Price</p>
                        <p className="text-sm text-gray-900">30.000đ</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Total Price</p>
                        <p className="text-sm text-gray-900">1.230.000đ</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center mt-6">
                    <h3 className="text-lg font-semibold">Total</h3>
                    <p className="text-lg font-semibold text-gray-900">1.230.000đ</p>
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
