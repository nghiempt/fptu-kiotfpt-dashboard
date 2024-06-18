import { Box, Pagination, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import ConfirmStatusCategory from "../../../Modal/confirm-status-category";
import AddCategoryModal from "../../../Modal/add-category";
import Grid3x3Icon from '@mui/icons-material/Grid3x3';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import SyncAltIcon from '@mui/icons-material/SyncAlt';
import { CategoryService } from "../../../../services/category";

interface AdminTableProps {
  data: any[];
}

const TableCategory: React.FC<AdminTableProps> = ({ data: initialData }) => {

  const [data, setData] = useState(initialData as any);
  const [pageData, setPageData] = useState([] as any);
  const [isShowModalConfirm, setIsShowModalConfirm] = useState(false);
  const [status, setStatus] = useState("");
  const [isShowAddCategoryModal, setIsShowAddCategoryModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState({} as any);

  const handleOpenAddCategoryModal = () => {
    setIsShowAddCategoryModal(true);
  };

  const handleCloseAddCategoryModal = () => {
    setIsShowAddCategoryModal(false);
  };

  const handleOpenModal = (status: string) => {
    setStatus(status);
    setIsShowModalConfirm(true);
  };

  const handleCloseModal = () => {
    setIsShowModalConfirm(false);
  };

  const renderTotalPageByAmountData = (data: any) => {
    return parseInt((data?.length / 8).toFixed(0));
  };

  const changePage = (pageNumber: any) => {
    const start = (pageNumber - 1) * 8;
    const end = pageNumber * 8;
    setPageData(data.slice(start, end));
  };

  const handleUpdateCategory = async () => {
    const payload = {
      name: selectedItem?.name,
      shop_id: "10",
      thumbnail: selectedItem?.thumbnail,
    }
    const fetch = await CategoryService.updateCategory(selectedItem?.id, payload);
    window.location.reload();
  };

  useEffect(() => {
    setData(initialData);
    changePage(1);
    setSelectedItem(initialData[0]);
  }, [initialData]);

  return (
    <Box>
      <ConfirmStatusCategory open={isShowModalConfirm} handleClose={handleCloseModal} id="2" payload={status} />
      <AddCategoryModal
        open={isShowAddCategoryModal}
        handleClose={handleCloseAddCategoryModal}
        data={null}
      />
      <Box sx={{ marginBottom: "20px", marginTop: "10px", marginLeft: "20px", marginRight: "20px" }}>
        <Typography variant="h3" noWrap component="div" sx={{ flexGrow: 1 }}>
          <b>CATEGORY MANAGEMENT</b>
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
                        Category name
                      </th>
                      <th className="px-5 py-3 bg-[rgb(var(--tertiary-rgb))] text-left text-md font-semibold text-white uppercase tracking-wider">
                        Number of Product
                      </th>
                      <th className="py-3 bg-[rgb(var(--tertiary-rgb))] text-left text-md font-semibold text-white uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {pageData?.map((item: any, index: any) => {
                      return (
                        <tr key={index} onClick={() => setSelectedItem(item)}>
                          <td
                            className={`px-5 py-5 ${item === selectedItem ? "bg-gray-100" : "bg-white"
                              } border-b border-gray-200 text-[15px] cursor-pointer`}
                          >
                            <p className="text-gray-900 whitespace-no-wrap">
                              KFCAT-0{item?.id}
                            </p>
                          </td>
                          <td
                            className={`px-5 py-5 ${item === selectedItem ? "bg-gray-100" : "bg-white"
                              } border-b border-gray-200 text-[15px] cursor-pointer`}
                          >
                            <div className="flex items-center gap-2">
                              <img
                                src={item?.thumbnail}
                                alt="voucher"
                                className="w-10 h-10 rounded-md"
                              />
                              <p className="text-gray-600 whitespace-no-wrap">
                                {item?.name}
                              </p>
                            </div>
                          </td>
                          <td
                            className={`px-5 py-5 ${item === selectedItem ? "bg-gray-100" : "bg-white"
                              } border-b border-gray-200 text-[15px] cursor-pointer`}
                          >
                            <p className="text-gray-600 font-bold text-[16px] whitespace-no-wrap">
                              {item?.product_total} products
                            </p>
                          </td>
                          <td
                            className={`py-5 ${item === selectedItem ? "bg-gray-100" : "bg-white"
                              } border-b border-gray-200 text-[15px] cursor-pointer pr-20`}
                          >
                            {
                              item?.status?.value === "active"
                                ?
                                <button className="w-full border border-[rgb(var(--quaternary-rgb))] py-2 rounded-md text-[rgb(var(--quaternary-rgb))] font-bold text-[16px]">{item?.status?.value}</button>
                                :
                                <button className="w-full border border-[rgb(var(--primary-rgb))] py-2 rounded-md text-[rgb(var(--primary-rgb))] font-bold text-[16px]">{item?.status?.value}</button>
                            }
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                <div className="flex justify-center gap-x-2 mt-8 pb-6">
                  <Pagination
                    count={renderTotalPageByAmountData(data)}
                    onChange={(e, page) => changePage(page)}
                    variant="outlined"
                    shape="rounded"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="w-2/5 flex flex-col gap-4">
            <div className="w-full">
              <button
                onClick={handleOpenAddCategoryModal}
                className="w-full border border-[rgb(var(--tertiary-rgb))] font-bold py-3 rounded-lg text-[rgb(var(--tertiary-rgb))]"
              >
                Add New Category
              </button>
            </div>
            <div className="container mx-auto">
              <div className="bg-white shadow-md rounded-lg p-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2">
                    Category Detail
                  </h3>
                  <div className="flex items-center justify-center gap-4">
                    <img
                      src={selectedItem?.thumbnail}
                      alt="voucher"
                      className="w-36 h-36 border rounded-md"
                    />
                    <label className="flex flex-col items-center justify-center w-full h-36 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                        </svg>
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                      </div>
                      <input
                        id="dropzone-file"
                        type="file"
                        className="hidden"
                        accept="image/png, image/jpeg, image/jpg, image/gif"
                      />
                    </label>
                  </div>
                  <div className="flex items-center justify-center gap-4 mt-4">
                    <div className="w-1/4 rounded-md border border-gray-300 flex items-center justify-center">
                      <button className="w-1/3 py-2 bg-gray-300 rounded-l-md text-gray-700 font-bold text-[14px]">
                        <Grid3x3Icon />
                      </button>
                      <button className="w-2/3 text-gray-700 font-medium text-[14px] text-start pl-4">KFCAT-0{selectedItem?.id}</button>
                    </div>
                    <div className="w-2/4 rounded-md border border-gray-300 flex items-center justify-center">
                      <button className="w-1/5 py-2 bg-gray-300 text-gray-700 rounded-l-md font-bold text-[14px]">
                        <DriveFileRenameOutlineIcon />
                      </button>
                      <input
                        type="text"
                        value={selectedItem?.name}
                        onChange={(e) => setSelectedItem({ ...selectedItem, name: e.target.value })}
                        className="w-4/5 pl-4 text-gray-700 font-medium focus:outline-none"
                      />
                    </div>
                    <div className="w-1/4 rounded-md border border-[rgb(var(--quaternary-rgb))] flex items-center justify-center">
                      <button onClick={handleUpdateCategory} className="w-full py-2 bg-[rgb(var(--quaternary-rgb))] text-white rounded-md font-bold text-[14px]">
                        <SyncAltIcon />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="w-full flex justify-center items-center gap-2 pt-12">
                  <button onClick={() => handleOpenModal("cancel")} className="w-full border border-[rgb(var(--primary-rgb))] bg-[rgb(var(--primary-rgb))] py-2 rounded-md text-white font-bold text-[16px]">Inactive</button>
                  <button onClick={() => handleOpenModal("cancel")} className="w-full border border-[rgb(var(--quaternary-rgb))] bg-[rgb(var(--quaternary-rgb))] py-2 rounded-md text-white font-bold text-[16px]">Active</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Box>
    </Box>
  );
};

export default TableCategory;
