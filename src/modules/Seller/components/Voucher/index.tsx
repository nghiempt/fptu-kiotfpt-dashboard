import { Box, Pagination, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import AddVoucherModal from "../../../Modal/add-voucher";
import ConfirmDeleteVoucherModal from "../../../Modal/confirm-del-voucher";
import { AssetImages } from "../../../../utils/images";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { VoucherService } from "../../../../services/voucher";

interface SellerTableProps {
  data: any[];
}

const TableVoucher: React.FC<SellerTableProps> = ({ data: initialData }) => {
  const [data, setData] = useState(initialData);
  const [isShowAddVoucherModal, setIsShowAddVoucherModal] = useState(false);
  const [isShowConfirmDeleteVoucherModal, setIsShowConfirmDeleteVoucherModal] =
    useState(false);
  const [status, setStatus] = useState("Active");
  const [idCurent, setIdCurent] = useState("");
  const [valueVoucher, setValueVoucher] = useState("10");
  const [idShop] = useState("10");
  const [valueShopVoucher] = useState("");
  const [initialValueVoucher, setInitialValueVoucher] = useState("");
  const hasValueChanged = valueVoucher !== initialValueVoucher;

  const updateVoucher = async () => {
    const updateV = await VoucherService.updateVoucher(17, initialValueVoucher);
    if (updateV?.result) {
      window.location.reload();
    } else {
      alert(updateV?.message);
    }
  };

  const handleOnClickVoucher = (id: any) => {
    setIsShowConfirmDeleteVoucherModal(true);
    setIdCurent(id);
  };

  const handleOpenAddVoucherModal = () => {
    setIsShowAddVoucherModal(true);
  };

  const handleCloseAddVoucherModal = () => {
    setIsShowAddVoucherModal(false);
  };

  const handleCloseConfirmDeleteVoucherModal = () => {
    setIsShowConfirmDeleteVoucherModal(false);
  };

  const handleChange = (event: any) => {
    setStatus(event.target.value);
  };

  useEffect(() => {
    setData(initialData);
    setInitialValueVoucher(valueVoucher);
  }, [initialData]);

  return (
    <Box>
      <AddVoucherModal
        open={isShowAddVoucherModal}
        handleClose={handleCloseAddVoucherModal}
        data={{ id: idShop, value: valueShopVoucher }}
      />
      <ConfirmDeleteVoucherModal
        open={isShowConfirmDeleteVoucherModal}
        handleClose={handleCloseConfirmDeleteVoucherModal}
        id={idCurent}
      />
      <Box sx={{ marginBottom: "20px", marginTop: "6px", marginLeft: "20px", marginRight: "20px" }}>
        <Typography variant="h3" noWrap component="div" sx={{ flexGrow: 1 }}>
          <b>VOUCHER MANAGEMENT</b>
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
                        Value
                      </th>
                      <th className="px-5 py-3 bg-[rgb(var(--tertiary-rgb))] text-left text-md font-semibold text-white uppercase tracking-wider">
                        Status
                      </th>
                      <th className="py-3 bg-[rgb(var(--tertiary-rgb))] text-left text-md font-semibold text-white uppercase tracking-wider">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {data?.map((item: any, index: any) => {
                      return (
                        <tr key={index}>
                          <td
                            className={`px-5 py-5 ${index === 0 ? "bg-gray-100" : "bg-white"
                              } border-b border-gray-200 text-[15px] cursor-pointer`}
                          >
                            <p className="text-gray-900 whitespace-no-wrap">
                              VO-{item?.id}
                            </p>
                          </td>
                          <td
                            className={`px-5 py-5 ${index === 0 ? "bg-gray-100" : "bg-white"
                              } border-b border-gray-200 text-[15px] cursor-pointer`}
                          >
                            <div className="flex items-center gap-2">
                              <img
                                src={AssetImages.VOUCHER_ICON}
                                alt="voucher"
                                className="w-8 h-8"
                              />
                              <p className="text-gray-600 whitespace-no-wrap">
                                {item?.value}%
                              </p>
                            </div>
                          </td>
                          <td
                            className={`px-5 py-5 ${index === 0 ? "bg-gray-100" : "bg-white"
                              } border-b border-gray-200 text-[15px] cursor-pointer`}
                          >
                            <p className="text-gray-600 whitespace-no-wrap">
                              <button className="w-1/2 border border-[#0B2447] font-bold py-1 rounded-md text-[#0B2447]">
                                {item?.status?.value}
                              </button>
                            </p>
                          </td>
                          <td
                            className={`py-5 ${index === 0 ? "bg-gray-100" : "bg-white"
                              } border-b border-gray-200 text-[15px] cursor-pointer`}
                          >
                            <p className="text-gray-600 whitespace-no-wrap">
                              <button
                                onClick={() => handleOnClickVoucher(item?.id)}
                                className="text-red-500 rounded-md flex justify-center items-center text-[13px]"
                              >
                                <DeleteForeverIcon className="mr-1" />
                                remove
                              </button>
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
            <div className="w-full">
              <button
                onClick={handleOpenAddVoucherModal}
                className="w-full border border-[rgb(var(--tertiary-rgb))] font-bold py-3 rounded-lg text-[rgb(var(--tertiary-rgb))]"
              >
                Add New Voucher
              </button> 
            </div>
            <div className="container mx-auto">
              <div className="bg-white shadow-md rounded-lg p-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2">
                    Voucher Detail
                  </h3>
                  <div className="mb-4">
                    <div className="grid grid-cols-3 gap-4 items-center">
                      <div className="flex gap-x-2">
                        <p className="text-[15px] text-gray-500">ID:</p>
                        <p className="text-[15px] font-bold">2</p>
                      </div>
                      <div className="flex gap-x-2 items-center">
                        <p className="text-[15px] text-gray-500">Value:</p>
                        <input
                          type="text"
                          value={valueVoucher}
                          onChange={(e) => setValueVoucher(e.target.value)}
                          className="outline-none text-[15px] font-bold border px-2 py-1 rounded-md w-24 text-center"
                        />
                        <button
                          className={`border px-8 py-1 rounded-md ${hasValueChanged
                            ? "bg-[rgb(var(--tertiary-rgb))] cursor-pointer font-bold"
                            : "bg-gray-400 cursor-not-allowed"
                            }`}
                          disabled={!hasValueChanged}
                          onClick={updateVoucher}
                        >
                          <h1 className="text-white">Change</h1>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="mb-4">
                      <div>
                        <div className="flex gap-x-4 items-center">
                          <h3 className="text-lg font-semibold">Status:</h3>
                          <select
                            value={status}
                            onChange={handleChange}
                            className="border border-[rgb(var(--quaternary-rgb))] font-bold pr-4 py-1 rounded-md"
                          >
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                          </select>
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

export default TableVoucher;
