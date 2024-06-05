import * as React from "react";
import Modal from "@mui/material/Modal";
import { VoucherService } from "../../services/voucher";

export default function ConfirmDeleteVoucherModal({
  open,
  handleClose,
  id,
}: {
  open: boolean;
  handleClose: any;
  id: string;
}) {

  const deleteVoucher = async (id: string) => {
    const deleV = await VoucherService.deleteVoucher(id);
    if (deleV?.result) {
      window.location.reload();
    } else {
      alert(deleV?.message);
    }
  };

  return (
    <div>
      <Modal open={open} onClose={handleClose}>
        <section className="">
          <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <div className="w-full relative bg-white rounded-lg shadow  md:mt-0 sm:max-w-md xl:p-0 ">
              <h1 className="text-center w-full text-white bg-[#0B2447] py-4 rounded-t-lg font-bold text-[18px]">
                Confirm
              </h1>
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="font-medium text-[16px] text-center">
                  Are you sure you want to delete this voucher?
                </h1>
                <div className="flex gap-x-4">
                  <button
                    type="submit"
                    className="w-full text-white bg-red-500 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                    onClick={() => deleteVoucher(id)}
                  >
                    Delete
                  </button>
                  <button
                    onClick={handleClose}
                    type="submit"
                    className="w-full text-white bg-[#0B2447] hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Modal>
    </div >
  );
}
