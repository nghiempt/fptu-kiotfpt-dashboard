import * as React from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { ProductService } from "../../services/product";
import { useEffect } from "react";

export default function DeleteProductModal({
  open,
  handleClose,
  id,
  data,
}: {
  open: boolean;
  handleClose: any;
  id: string;
  data: any;
}) {
  const [checked, setChecked] = React.useState<boolean[]>([]);
  const [selectAll, setSelectAll] = React.useState(false);
  const [selectedIds, setSelectedIds] = React.useState<string[]>([]);

  useEffect(() => {
    setChecked(new Array(data.length).fill(false));
    setSelectAll(false);
  }, [data]);

  useEffect(() => {
    const ids = data.filter((_: any, index: any) => checked[index]).map((item: any) => item?.id);
    setSelectedIds(ids);
  }, [checked, data]);

  const handleChange = (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const updatedChecked = checked.map((item, i) => (i === index ? event.target.checked : item));
    setChecked(updatedChecked);
    setSelectAll(updatedChecked.every(Boolean));
  };

  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked;
    setChecked(new Array(data.length).fill(isChecked));
    setSelectAll(isChecked);
  };

  const handleDelete = async () => {
    const deleP = await ProductService.deleteProduct(id, selectedIds);
    console.log(id);
    console.log(selectedIds);

    if (deleP?.result) {
      window.location.reload();
    } else {
      alert(deleP?.message);
    }
  };

  return (
    <div>
      <Modal open={open} onClose={handleClose}>
        <section className="">
          <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <div className="w-full relative bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
              <h1 className="text-center w-full text-white bg-[#0B2447] py-4 rounded-t-lg font-bold text-[18px]">
                Delete Product
              </h1>
              <div className="px-10 flex flex-col justify-center">
                <FormControlLabel
                  label="Select All"
                  control={
                    <Checkbox
                      checked={selectAll}
                      indeterminate={!selectAll && checked.some(Boolean)}
                      onChange={handleSelectAll}
                    />
                  }
                />
                <Box sx={{ display: "flex", flexDirection: "column", ml: 3 }}>
                  {data.map((item: any, index: any) => (
                    <FormControlLabel
                      key={item.id}
                      label={`${item.color?.value || "No Color"} - ${item.size?.value || "No Size"}`}
                      control={
                        <Checkbox
                          checked={checked[index]}
                          onChange={handleChange(index)}
                        />
                      }
                    />
                  ))}
                </Box>
              </div>
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <div className="flex gap-x-4">
                  <button
                    type="submit"
                    className="w-full text-white bg-red-500 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                    onClick={handleDelete}
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
    </div>
  );
}
