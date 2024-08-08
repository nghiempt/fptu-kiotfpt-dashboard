import { useEffect, useState } from "react";
import {
  TableRow,
  TableHeaderCell,
  TableHeader,
  TableFooter,
  TableCell,
  TableBody,
  MenuItem,
  Label,
  Menu,
  Table,
  CardMeta,
  CardHeader,
  CardContent,
  Card,
  Icon,
  Image,
  Button,
  Loader,
  Divider,
} from "semantic-ui-react";
import { ShopService } from "../../../services/shop";
import { toast } from "react-semantic-toasts";
import TableUser from "./user";
import ModalChangeStatus from "../modal/modal.change-status";

const TableShop = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([] as any);
  const [currentData, setCurrentData] = useState([] as any);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentItem, setCurrentItem] = useState({} as any);
  const [openModalChangeStatus, setOpenModalChangeStatus] = useState(false);

  const handleChangePage = (page: number) => {
    setCurrentPage(page);
    loadDataByPage(data, page);
  };

  const updateStatus = async (status: string, reason: string) => {
    setLoading(true);
    const res = await ShopService.updateStatusShop(
      currentItem?.id,
      status,
      reason
    );
    if (res?.result) {
      toast({
        type: "success",
        icon: "sync",
        title: "Update Status Shop",
        description: `Update status shop successfully to ${status}`,
        time: 1000,
      });
      init();
    } else {
      toast({
        type: "error",
        icon: "sync",
        title: "Update Status Shop",
        description: `Update status shop failed`,
        time: 1000,
      });
    }
    setLoading(false);
  };

  const handleReject = () => {
    setOpenModalChangeStatus(true);
  };

  const handleConfirm = async (reason: string) => {
    if (currentItem?.status?.value === "wait for active") {
      if (reason.trim() !== "") {
        // Nếu trạng thái là "wait for active" và lý do không trống, chuyển trạng thái thành "inactive"
        await updateStatus("inactive", reason);
      } else {
        toast({
          type: "error",
          icon: "warning",
          title: "Missing Reason",
          description: "Please provide a reason for rejection.",
          time: 2000,
        });
      }
    } else if (currentItem?.status?.value === "active") {
      // Nếu trạng thái là "active", chỉ thay đổi trạng thái
      await updateStatus("inactive", reason); // Ví dụ: Nếu bạn muốn chuyển sang trạng thái "inactive"
    } else {
      await updateStatus("", reason);
    }
    setOpenModalChangeStatus(false); // Đóng modal sau khi xác nhận
  };
  
  const loadDataByPage = async (data: any, page: number) => {
    const startIndex = (page - 1) * 12;
    const endIndex = page * 12;
    const currentData = data?.slice(startIndex, endIndex);
    return setCurrentData(currentData);
  };

  const renderAmountPage = (data: any) => {
    const amountPage = Math.ceil(data?.length / 12);
    let amount = [];
    for (let i = 1; i <= amountPage; i++) {
      amount.push(i);
    }
    return amount;
  };

  const init = async () => {
    const res = await ShopService.getAllShops(1, 12);
    if (res?.result) {
      setData(res?.data);
      setCurrentItem(res?.data[0]);
      setCurrentPage(1);
      loadDataByPage(res?.data, 1);
      setLoading(false);
    }
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <div className="w-full flex flex-col justify-center items-center gap-4">
      <ModalChangeStatus
        open={openModalChangeStatus}
        setOpen={setOpenModalChangeStatus}
        onConfirm={handleConfirm}
      />
      <div className="w-full flex justify-start items-center text-2xl font-bold">
        List Shop
      </div>
      <div className="w-full flex justify-center items-start gap-4">
        <Table celled>
          <TableHeader>
            <TableRow>
              <TableHeaderCell>SHOP ID</TableHeaderCell>
              <TableHeaderCell>SHOP NAME</TableHeaderCell>
              <TableHeaderCell>SHOP FOLLOWER</TableHeaderCell>
              <TableHeaderCell>RATE</TableHeaderCell>
              <TableHeaderCell>OFFICIAL</TableHeaderCell>
              <TableHeaderCell>STATUS</TableHeaderCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <Loader active inline />
              </TableRow>
            ) : (
              currentData?.map((item: any, index: any) => {
                return (
                  <TableRow
                    key={index}
                    onClick={() => setCurrentItem(item)}
                    className={`${
                      item?.id === currentItem?.id ? "!bg-gray-100" : ""
                    } cursor-pointer`}
                  >
                    <TableCell>
                      <Label ribbon>KTF-CAT-0{item?.id}</Label>
                    </TableCell>
                    <TableCell className="flex items-center gap-4">
                      <Image
                        src={item?.thumbnail}
                        size="mini"
                        className="rounded-lg"
                      />{" "}
                      {item?.name}
                    </TableCell>
                    <TableCell>{item?.follower}</TableCell>
                    <TableCell>{item?.rate}</TableCell>
                    <TableCell>{item?.official ? "Yes" : "No"}</TableCell>
                    <TableCell>
                      <Button
                        color={`${
                          item?.status?.value === "active"
                            ? "teal"
                            : item?.status?.value === "wait for active"
                            ? "yellow"
                            : "grey"
                        }`}
                        className="!uppercase !text-[12px]"
                      >
                        {item?.status?.value}
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableHeaderCell colSpan="6">
                <Menu floated="right" pagination>
                  <MenuItem as="a" icon>
                    <Icon name="chevron left" />
                  </MenuItem>
                  {renderAmountPage(data)?.map((item: any, index: any) => {
                    return (
                      <MenuItem
                        as="a"
                        key={index}
                        onClick={() => handleChangePage(item)}
                        className={`${
                          item === currentPage ? "!bg-gray-200" : ""
                        }`}
                      >
                        {index + 1}
                      </MenuItem>
                    );
                  })}
                  <MenuItem as="a" icon>
                    <Icon name="chevron right" />
                  </MenuItem>
                </Menu>
              </TableHeaderCell>
            </TableRow>
          </TableFooter>
        </Table>
        <div>
          <Card className="!mt-0">
            <Image
              size="tiny"
              src={currentItem?.thumbnail}
              wrapped
              ui={false}
              className="rounded-md"
            />
            <CardContent>
              <CardHeader>{currentItem?.name}</CardHeader>
            </CardContent>
            <CardContent extra>
              <div className="flex w-full items-center">
                {currentItem?.status?.value === "wait for active" ? (
                  <div className="flex w-full justify-between">
                    <Button
                      onClick={() => updateStatus('active', '')}
                      loading={loading ? true : false}
                      className="flex-1 !bg-blue-500 hover:!bg-blue-600 "
                    >
                      Accept
                    </Button>
                    <Button
                      onClick={handleReject}
                      loading={loading ? true : false}
                      className="flex-1 !bg-red-600 hover:!bg-red-700 "
                    >
                      Reject
                    </Button>
                  </div>
                ) : (
                    <div className="flex w-full justify-between items-center">
                    <Button
                      onClick={() => {
                        if (currentItem?.status?.value !== "inactive") {
                          setOpenModalChangeStatus(true);
                        } else {
                          updateStatus('', '');
                        }
                      }}
                      loading={loading}
                      className="flex-1"
                    >
                      Change Status
                    </Button>
                    <Label
                      as="a"
                      color={`${
                        currentItem?.status?.value === "active" ? "teal" : "grey"
                      }`}
                      className="!uppercase !text-[12px] flex-1 text-center"
                      tag
                    >
                      {currentItem?.status?.value}
                    </Label>
                  </div>
                  
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <Divider className="!m-0" />
      <div className="w-full flex justify-start items-center text-2xl font-bold">
        List User
      </div>
      <TableUser />
    </div>
  );
};

export default TableShop;
