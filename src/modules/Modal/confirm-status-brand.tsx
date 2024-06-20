import Modal from "@mui/material/Modal";
import { BrandService } from "../../services/brand";

export default function ConfirmStatusBrand({
  open,
  handleClose,
  id,
  payload,
}: {
  open: boolean;
  handleClose: any;
  id: string;
  payload: string;
}) {

  const updateBrand = async (id: string, payload: any) => {
    const fetch = await BrandService.deleteBrand(id);
    alert(fetch.message)
    // window.location.reload();
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
                  Do you agree to change status brand?
                </h1>
                <div className="flex gap-x-4">
                  <button
                    onClick={handleClose}
                    className="w-full text-white bg-gray-400 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="w-full text-white bg-[rgb(var(--quaternary-rgb))] hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                    onClick={() => updateBrand(id, payload)}
                  >
                    Submit
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
