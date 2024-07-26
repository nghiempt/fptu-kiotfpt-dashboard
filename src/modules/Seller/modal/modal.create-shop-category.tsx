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

interface ModalCreateShopCategoryProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  initialData: any;
}

const ModalCreateShopCategory: React.FC<ModalCreateShopCategoryProps> = ({
  open,
  setOpen,
  initialData,
}) => {
  const [message, setMessage] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [thumbnail, setThumbnail] = React.useState("");
  const [name, setName] = React.useState("");
  const [imageCloud, setImageCloud] = React.useState("");
  const [listCategories, setListCategories] = React.useState([] as any);
  const [selectedIndex, setSelectedIndex] = React.useState(null);

  const uploadImageToCloudinary = async (file: File) => {
    setLoading(true);
    const formdata = new FormData();
    formdata.append("file", file);
    formdata.append("upload_preset", "kiotfpt");
    formdata.append("folder", "kiotfpt");
    fetch(CLOUDINARY, {
      method: "POST",
      body: formdata,
      redirect: "follow",
    })
      .then((response) => response.text())
      .then((result) => {
        const data = JSON.parse(result);
        setImageCloud(data.secure_url);
        setMessage("done");
        setLoading(false);
      })
      .catch((error) => console.error(error));
  };

  const validate = () => {
    if (name === "") {
      setMessage("Name is required");
      return false;
    } else if (imageCloud === "") {
      setMessage("Thumbnail is required");
      return false;
    } else {
      return true;
    }
  };

  const submit = async () => {
    if (!validate()) {
      return;
    } else {
      const payload = {
        name: name,
        thumbnail: imageCloud,
      };
      const res = await CategoryService.createCategory(payload);
      if (res?.result) {
        initialData();
        setThumbnail("");
        setName("");
        setImageCloud("");
        setOpen(false);
        toast({
          type: "success",
          icon: "sync",
          title: "Create Category",
          description: "Create category successfully",
          time: 1000,
        });
      } else {
        setMessage("Create category failed");
      }
    }
  };

  const handleClear = () => {
    setThumbnail("");
    setName("");
    setImageCloud("");
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
    
  };

  

  useEffect(() => {
    init();
  }, []);

  useEffect(() => {}, [imageCloud]);

  return (
    <Modal
      size="small"
      onClose={handleClear}
      onOpen={() => setOpen(true)}
      open={open}
    >
      <ModalHeader>Create Shop Category</ModalHeader>
      {checkMessage() && (
        <div className="mt-1 p-4 bg-red-100 text-red-600 dark:bg-red-500 dark:text-red-100">
          {message}
        </div>
      )}
      <ModalContent
        image
        className="!relative !flex !flex-row !justify-center !items-start !gap-36"
      >
        {/* <div className="!flex !flex-col !justify-center !items-center">
          <div className="w-full flex justify-start items-center">
            <Header as="h4">Add From Repository</Header>
          </div>
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
                      onClick={() => setSelectedIndex(index)}
                    >
                      <h1 className="text-[12px] text-center">{item?.name}</h1>
                    </div>
                  </MenuItem>
                );
              })}
            </MenuMenu>
          </Menu>
        </div> */}
        <div className="!flex !flex-col justify-center !items-center">
          <div className="w-full flex justify-start items-center">
            <Header as="h4">Create New</Header>
          </div>
          {loading ? (
            <Dimmer active inverted>
              <Loader inverted content="Loading" />
            </Dimmer>
          ) : (
            <Image size="small" src={thumbnail} className="rounded-lg" />
          )}
          {thumbnail === "" && (
            <div className="w-full h-[160px] flex flex-col items-center justify-center border my-4 rounded-lg">
              <label
                htmlFor="thumbnai1"
                className="cursor-pointer hover:opacity-80 px-4 py-1 rounded-full font-semibold text-xs"
              >
                <Icon name="cloud upload" size="huge" color="grey" />
              </label>
              <input
                type="file"
                id="thumbnai1"
                className="hidden"
                onChange={(e: any) => {
                  const file = e.target.files[0];
                  const reader = new FileReader();
                  reader.onloadend = () => {
                    setThumbnail(reader.result as string);
                  };
                  reader.readAsDataURL(file);
                  uploadImageToCloudinary(file);
                }}
              />
            </div>
          )}
          <Input
            label="Name"
            value={name}
            placeholder="Category Name"
            onChange={(e) => {
              setName(e.target.value);
              setMessage("done");
            }}
          />
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

export default ModalCreateShopCategory;
