import React, { useEffect } from "react";
import {
  ModalHeader,
  ModalContent,
  ModalActions,
  Button,
  Modal,
  ListHeader,
  ListDescription,
  ListContent,
  Image,
} from "semantic-ui-react";
import { CategoryService } from "../../../services/category";
import { toast } from "react-semantic-toasts";
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
  const [selectedItem, setSelectedItem] = React.useState({} as any);
  const submit = async () => {
    const res = await CategoryService.createShopCategory(Number(AuthService.getShopID()), selectedItem?.id);
    if (res?.result) {
      toast({
        type: "success",
        icon: "sync",
        title: "Create Category",
        description: "Create category successfully",
        time: 1000,
      });
      initialData()
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
    setSelectedItem({});
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
  };

  useEffect(() => {
    init();
  }, []);

  useEffect(() => { }, []);

  return (
    <Modal
      size="mini"
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
        <div className="!w-full !flex !flex-col !justify-center !items-center gap-2 overflow-y-auto max-h-96">
          {listCategories?.map((item: any, index: any) => {
            return (
              <div
                key={index}
                onClick={() => setSelectedItem(item)}
                className={`${selectedItem?.id === item?.id ? 'border-2 border-gray-700' : 'border'} w-full flex justify-start items-center gap-2 p-2 rounded-lg cursor-pointer hover:border-gray-700`}
              >
                <Image avatar src={item?.thumbnail} />
                <ListContent>
                  <ListHeader>{item?.name}</ListHeader>
                  <ListDescription>{item?.description}</ListDescription>
                </ListContent>
              </div>
            );
          })}
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
