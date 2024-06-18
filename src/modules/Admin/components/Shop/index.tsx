import { Box, Pagination, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import StarIcon from "@mui/icons-material/Star";
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import ConfirmBanShop from "../../../Modal/confirm-ban-shop";

interface AdminTableProps {
  data: any[];
}

const TableShop: React.FC<AdminTableProps> = ({ data: initialData }) => {

  const [data, setData] = useState(initialData);
  const [pageData, setPageData] = useState([] as any);
  const [isShowModalBan, setIsShowModalBan] = useState(false);

  const handleOpenModal = () => {
    setIsShowModalBan(true);
  };

  const handleCloseModal = () => {
    setIsShowModalBan(false);
  };

  const renderTotalPageByAmountData = (data: any) => {
    return parseInt((data?.length / 8).toFixed(0));
  };

  const changePage = (pageNumber: any) => {
    const start = (pageNumber - 1) * 8;
    const end = pageNumber * 8;
    setPageData(data.slice(start, end));
  };

  useEffect(() => {
    setData(initialData);
    changePage(1)
  }, [initialData]);

  return (
    <Box>
      <ConfirmBanShop open={isShowModalBan} handleClose={handleCloseModal} id="2" payload="inactive" />
      <Box sx={{ marginBottom: "20px", marginTop: "10px", marginLeft: "20px", marginRight: "20px" }}>
        <Typography variant="h3" noWrap component="div" sx={{ flexGrow: 1 }}>
          <b>SHOP MANAGEMENT</b>
        </Typography>
        <div className="w-full flex mt-4">
          <div className="w-full flex flex-col">
            <div className="w-full">
              <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <table className="min-w-full leading-normal">
                  <thead>
                    <tr>
                      <th className="px-5 py-3 bg-[rgb(var(--tertiary-rgb))] text-left text-md font-semibold text-white uppercase tracking-wider">
                        ID
                      </th>
                      <th className="px-5 py-3 bg-[rgb(var(--tertiary-rgb))] text-left text-md font-semibold text-white uppercase tracking-wider">
                        Shop name
                      </th>
                      <th className="px-5 py-3 bg-[rgb(var(--tertiary-rgb))] text-left text-md font-semibold text-white uppercase tracking-wider">
                        Phone
                      </th>
                      <th className="px-5 py-3 bg-[rgb(var(--tertiary-rgb))] text-left text-md font-semibold text-white uppercase tracking-wider">
                        Rate
                      </th>
                      <th className="px-5 py-3 bg-[rgb(var(--tertiary-rgb))] text-left text-md font-semibold text-white uppercase tracking-wider">
                        Official
                      </th>
                      <th className="py-3 bg-[rgb(var(--tertiary-rgb))] text-left text-md font-semibold text-white uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {pageData?.map((item: any, index: any) => {
                      return (
                        <tr key={index}>
                          <td
                            className={`px-5 py-5 bg-white
                              } border-b border-gray-200 text-[15px] cursor-pointer`}
                          >
                            <p className="text-gray-900 whitespace-no-wrap">
                              KFSH-0{item?.id}
                            </p>
                          </td>
                          <td
                            className={`px-5 py-5 bg-white
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
                            className={`px-5 py-5 bg-white
                              } border-b border-gray-200 text-[15px] cursor-pointer`}
                          >
                            <p className="text-gray-600 font-bold text-[16px] whitespace-no-wrap">
                              {item?.phone}
                            </p>
                          </td>
                          <td
                            className={`px-5 py-5 bg-white
                              } border-b border-gray-200 text-[15px] cursor-pointer`}
                          >
                            <p className="text-gray-600 font-bold text-[16px] whitespace-no-wrap">
                              {item?.rate.toString()} <StarIcon className="text-[#FF9017]" style={{ width: '14px' }} />
                            </p>
                          </td>
                          <td
                            className={`px-5 py-5 bg-white
                              } border-b border-gray-200 text-[15px] cursor-pointer`}
                          >
                            {
                              item?.official
                                ?
                                <p className="text-[rgb(var(--quaternary-rgb))] gap-2 font-medium text-[14px] whitespace-no-wrap flex justify-start items-center">
                                  official <DoneOutlineIcon style={{ width: '14px' }} />
                                </p>
                                :
                                null
                            }
                          </td>
                          <td
                            className={`py-5 bg-white
                              } border-b border-gray-200 text-[15px] cursor-pointer pr-20 flex gap-2`}
                          >
                            <button onClick={handleOpenModal} className="w-full border border-[rgb(var(--quaternary-rgb))] py-2 rounded-md text-[rgb(var(--quaternary-rgb))] font-bold text-[16px]">Ban</button>
                            <button onClick={handleOpenModal} className="w-full border border-[rgb(var(--quaternary-rgb))] py-2 rounded-md text-[rgb(var(--quaternary-rgb))] font-bold text-[16px]">Unban</button>
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
        </div>
      </Box>
    </Box>
  );
};

export default TableShop;
