import * as React from "react";
import CloseIcon from "@mui/icons-material/Close";
import Modal from "@mui/material/Modal";
import { VoucherService } from "../../services/voucher";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const addVoucher = async (data: any) => {
  const addV = await VoucherService.addVoucher(data);
  if (addV?.result) {
    window.location.reload();
    console.log(data);
  } else {
    alert(addV?.message);
  }
};

export default function AddVoucherModal({
  open,
  handleClose,
  data,
}: {
  open: boolean;
  handleClose: any;
  data: any;
}) {
  const [voucherId, setVoucherId] = React.useState("");
  const [voucherValue, setVoucherValue] = React.useState("");
  const handleSubmit = () => {
    data = {
      shop_id: 10,
      value: voucherValue,
    };
    addVoucher(data);
    console.log(data);
  };
  return (
    <div>
      <Modal open={open} onClose={handleClose}>
        <section className="">
          <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <div className="w-full relative bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 ">
              <div
                className="absolute top-4 right-4 cursor-pointer"
                onClick={handleClose}
              >
                <CloseIcon />
              </div>
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                  Create Voucher
                </h1>
                <div className="flex flex-col gap-4">
                  <input
                    type="text"
                    placeholder="Voucher value"
                    value={voucherValue}
                    onChange={(e) => setVoucherValue(e.target.value)}
                    className="w-full border px-4 py-3 text-gray-700 bg-gray-200 rounded-lg focus:outline-none focus:bg-white"
                  />
                </div>
                <div className="flex gap-x-2">
                  <button
                    type="submit"
                    className="w-full text-white bg-[#0B2447] hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                    onClick={handleSubmit}
                  >
                    Create
                  </button>
                  <button
                    onClick={handleClose}
                    className="w-full text-white bg-red-800 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Modal>
    </div>
  );
}
