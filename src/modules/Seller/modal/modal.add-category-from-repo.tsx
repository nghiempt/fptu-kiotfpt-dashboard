import React, { useEffect } from "react";
import {
  ModalHeader,
  ModalContent,
  ModalActions,
  Button,
  Modal,
  Image,
  Loader,
  Dimmer,
  MenuMenu,
  MenuItem,
  Icon,
  Input,
  Menu,
  Header,
} from "semantic-ui-react";
import { CategoryService } from "../../../services/category";
import { toast } from "react-semantic-toasts";
import { CLOUDINARY } from "../../../utils/api";
import { AuthService } from "../../../services/auth";

interface ModalAddCategoryFromRepoProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  initialData: any;
}

const ModalAddCategoryFromRepo: React.FC<ModalAddCategoryFromRepoProps> = ({
  open,
  setOpen,
  initialData,
}) => {
  const [message, setMessage] = React.useState("");
  const [listCategories, setListCategories] = React.useState([] as any);
  const [selectedIndex, setSelectedIndex] = React.useState(null);
  const [idCategory, setIdCategory] = React.useState(null);

  const getCategoryID = (index: any, idC:any) => {
    setSelectedIndex(index); 
    setIdCategory(idC);   
  }

  const submit = async () => {
      const res = await CategoryService.createShopCategory(Number(AuthService.getShopID()),idCategory);
      if (res?.result) {
        toast({
          type: "success",
          icon: "sync",
          title: "Create Category",
          description: "Create category successfully",
          time: 1000,
        });
        handleClear();
      } else {
        toast({
          type: "error",
          icon: "sync",
          title: "Create Category",
          description: "Create category failed",
          time: 1000,
        });
      }
      
    
  };

  const handleClear = () => {
    setMessage("");
    setOpen(false);
  };

  const checkMessage = () => {
    if (message !== "" && message !== "done") {
      return true;
    }
    return false;
  };

  const init = async () => {
    const res = await CategoryService.getAllCategories();
    if (res?.result) {
      setListCategories(res?.data);
    }
    console.log(listCategories);
    
  };

  

  useEffect(() => {
    init();
  }, []);

  useEffect(() => {}, []);

  return (
    <Modal
      size="small"
      onClose={handleClear}
      onOpen={() => setOpen(true)}
      open={open}
    >
      <ModalHeader>Add From Repository</ModalHeader>
      {checkMessage() && (
        <div className="mt-1 p-4 bg-red-100 text-red-600 dark:bg-red-500 dark:text-red-100">
          {message}
        </div>
      )}
      <ModalContent
        image
        className="!relative !flex !flex-row !justify-center !items-start !gap-36"
      >
        <div className="!flex !flex-col !justify-center !items-center">
          <Menu vertical>
            <MenuItem>
              <Input placeholder="Search..." />
            </MenuItem>
            <MenuMenu className="flex flex-col w-full">
              {listCategories?.slice(0, 10)?.map((item: any, index: any) => {
                return (
                  <MenuItem key={index} name={item?.name}>
                    <div
                      className={`w-full cursor-pointer rounded-sm py-1 ${
                        selectedIndex === index
                          ? "bg-gray-500"
                          : "hover:bg-gray-200"
                      }`}
                      onClick={() => getCategoryID(index,item?.id)}
                    >
                      <h1 className="text-[12px] text-center">{item?.name}</h1>
                    </div>
                  </MenuItem>
                );
              })}
            </MenuMenu>
          </Menu>
        </div>
      </ModalContent>
      <ModalActions>
        <Button color="grey" onClick={handleClear}>
          Cancel
        </Button>
        <Button
          content="Submit"
          className="!bg-[rgb(78,178,173)]"
          labelPosition="right"
          icon="checkmark"
          onClick={submit}
          positive
        />
      </ModalActions>
    </Modal>
  );
};

export default ModalAddCategoryFromRepo;
