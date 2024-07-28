import React, { useEffect } from "react";
import {
  ModalHeader,
  ModalContent,
  ModalActions,
  Button,
  Image,
  Modal,
  Input,
  FormInput,
  FormGroup,
  Form,
  Dimmer,
  Select,
  Header,
  Divider,
  Icon,
  Loader,
} from "semantic-ui-react";
import { toast } from "react-semantic-toasts";
import { CLOUDINARY } from "../../../utils/api";
import { ProductService } from "../../../services/product";
import { fakeData } from "../../../utils/fakeData";
import { AuthService } from "../../../services/auth";

interface ModalUpdateProductProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  currentItem: any;
  setCurrentItem: (currentItem: any) => void;
  initialData: any;
}

const ModalUpdateProduct: React.FC<ModalUpdateProductProps> = ({
  open,
  setOpen,
  currentItem,
  setCurrentItem,
  initialData,
}) => {
  const [imageCloud, setImageCloud] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const [brand, setBrand] = React.useState({ brand_id: 0 } as any);
  const [category, setCategory] = React.useState({ category_id: 0 } as any);
  const [color, setColor] = React.useState({ color_id: 0 } as any);
  const [size, setSize] = React.useState({ size_id: 0 } as any);

  const handleChangeBrand = (e: any, data: any) => {
    const selectedBrand = fakeData.brands.find(
      (brand) => brand.brand_id === data.value
    );
    setBrand(selectedBrand);
    console.log(selectedBrand);
  };
  const handleChangeCategory = (e: any, data: any) => {
    const selectedCategory = fakeData.categories.find(
      (category) => category.category_id === data.value
    );
    setCategory(selectedCategory);
  };
  const handleChangeColor = (e: any, data: any) => {
    const selectedColor = fakeData.colors.find(
      (color) => color.color_id === data.value
    );
    setColor(selectedColor);
  };
  const handleChangeSize = (e: any, data: any) => {
    const selectedSize = fakeData.sizes.find(
      (size) => size.size_id === data.value
    );
    setSize(selectedSize);
  };

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
        setLoading(false);
      })
      .catch((error) => console.error(error));
  };

  const validate = () => {
    if (currentItem?.name === "") {
      setMessage("Name is required");
      return false;
    } else {
      return true;
    }
  };

  const getFirstItemVariant: any = () => {
    let tmp = null;
    currentItem?.variants?.forEach((variant: any) => {
      tmp = variant;
    });
    return tmp;
  };

  const submit = async () => {
    if (!validate()) {
      return;
    } else {
      const payload = {
        brand_id: currentItem?.brand?.brand_id,
        category_id: currentItem?.category?.category_id,
        condition_id: 1,
        discount: currentItem?.discount,
        description: currentItem?.description,
        name: currentItem?.name,
        shop_id: Number(AuthService.getShopID()),
        thumbnails: [
          imageCloud === "" ? currentItem?.thumbnail[0]?.link : imageCloud,
        ],
        variants: [
          {
            colorId: currentItem?.variants[0]?.color?.id,
            price: currentItem?.variants[0]?.price,
            quantity: currentItem?.variants[0]?.quantity,
            sizeId: currentItem?.variants[0]?.size?.id,
          },
        ],
      };
      const res = await ProductService.updateProduct(
        currentItem?.id.toString(),
        payload
      );
      if (res?.result) {
        initialData();
        handleClear();
        toast({
          type: "success",
          icon: "sync",
          title: "Update Product",
          description: "Update product successfully",
          time: 1000,
        });
      } else {
        setMessage("Update product failed");
      }
    }
  };

  const handleClear = () => {
    setImageCloud("");
    setMessage("");
    setOpen(false);
  };

  const handleChangeCurrentItem = (key: string, value: any) => {
    setCurrentItem({
      ...currentItem,
      [key]: value,
    });
    setMessage("done");
  };

  const checkMessage = () => {
    if (message !== "" && message !== "done") {
      return true;
    }
    return false;
  };

  useEffect(() => { }, [imageCloud]);

  return (
    <Modal
      size="large"
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
    >
      <ModalHeader>Update Product</ModalHeader>
      {checkMessage() && (
        <div className="mt-1 p-4 bg-red-100 text-red-600 dark:bg-red-500 dark:text-red-100">
          {message}
        </div>
      )}
      <ModalContent
        image
        className="!relative !flex !flex-col !justify-center !items-center !gap-8"
      >
        {loading ? (
          <Dimmer active inverted>
            <Loader inverted content="Loading" />
          </Dimmer>
        ) : (
          <Image
            size="small"
            src={currentItem?.thumbnail[0]?.link}
            className="rounded-lg"
          />
        )}
        <Form className="w-3/4">
          <FormGroup unstackable widths={2}>
            <FormInput
              label="Name"
              placeholder="Name"
              value={currentItem?.name}
              onChange={(e) => handleChangeCurrentItem("name", e.target.value)}
            />
            <FormInput
              label="Description"
              placeholder="Description"
              value={currentItem?.description}
              onChange={(e) =>
                handleChangeCurrentItem("description", e.target.value)
              }
            />
          </FormGroup>
          <FormGroup unstackable widths={3}>
            <FormInput
              label="Price"
              placeholder="Price"
              value={getFirstItemVariant()?.price}
              onChange={(e) => handleChangeCurrentItem("price", e.target.value)}
            />
            <FormInput
              label="Quantity"
              placeholder="Quantity"
              value={getFirstItemVariant()?.quantity}
              onChange={(e) =>
                handleChangeCurrentItem("quantity", e.target.value)
              }
            />
            <FormInput
              label="Discount"
              placeholder="Discount"
              value={currentItem?.discount}
              onChange={(e) =>
                handleChangeCurrentItem("discount", e.target.value)
              }
            />
          </FormGroup>
          <Header as="h6">Variant</Header>
          <Divider />
          <div className="w-full grid grid-cols-3 gap-4">
            <Select
              placeholder="Select brand"
              value={currentItem?.brand?.brand_id}
              options={fakeData.brands.map((brand: any) => {
                return {
                  key: brand.brand_id,
                  value: brand?.brand_id,
                  text: brand.brand_name,
                };
              })}
              onChange={handleChangeBrand}
            />
            <Select
              fluid
              placeholder="Select category"
              value={currentItem?.category?.category_id}
              options={fakeData.categories.map((category: any) => {
                return {
                  key: category.category_id,
                  value: category.category_id,
                  text: category.category_name,
                };
              })}
              onChange={handleChangeCategory}
            />
            <Select
              fluid
              placeholder="Select color"
              value={getFirstItemVariant()?.color?.id}
              options={fakeData.colors.map((color: any) => {
                return {
                  key: color.color_id,
                  value: color.color_id,
                  text: color.color_value,
                };
              })}
              onChange={handleChangeColor}
            />
            <Select
              fluid
              placeholder="Select size"
              value={getFirstItemVariant()?.size?.id}
              options={fakeData.sizes.map((size: any) => {
                return {
                  key: size.size_id,
                  value: size.size_id,
                  text: size.size_value,
                };
              })}
              onChange={handleChangeSize}
            />
          </div>
        </Form>
        <div className="absolute cursor-pointer top-4 right-40">
          <div className="flex flex-col items-center justify-center">
            <label
              htmlFor="thumbnai1"
              className="cursor-pointer hover:opacity-80 px-4 py-1 rounded-full font-semibold text-xs"
            >
              <Icon name="cloud upload" size="big" color="grey" />
            </label>
            <input
              type="file"
              id="thumbnai1"
              className="hidden"
              onChange={(e: any) => {
                const file = e.target.files[0];
                uploadImageToCloudinary(file);
                const reader = new FileReader();
                reader.onloadend = () => {
                  handleChangeCurrentItem("thumbnail", reader.result as string);
                };
                reader.readAsDataURL(file);
              }}
            />
          </div>
        </div>
      </ModalContent>
      <ModalActions>
        <Button color="grey" onClick={() => setOpen(false)}>
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

export default ModalUpdateProduct;
