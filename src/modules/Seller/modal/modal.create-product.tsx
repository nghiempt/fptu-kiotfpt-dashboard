import React, { useEffect } from "react";
import {
  ModalHeader,
  ModalContent,
  ModalActions,
  Button,
  Modal,
  Image,
  Icon,
  Loader,
  FormInput,
  FormGroup,
  Form,
  Dimmer,
  Select,
  Header,
  Divider,
} from "semantic-ui-react";
import { toast } from "react-semantic-toasts";
import { CLOUDINARY } from "../../../utils/api";
import { ProductService } from "../../../services/product";
import { fakeData } from "../../../utils/fakeData";
import { AuthService } from "../../../services/auth";

interface ModalCreateProductProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  initialData: any;
}

const ModalCreateProduct: React.FC<ModalCreateProductProps> = ({
  open,
  setOpen,
  initialData,
}) => {
  const [message, setMessage] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [thumbnail, setThumbnail] = React.useState("");
  const [imageCloud, setImageCloud] = React.useState("");
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [quantity, setQuantity] = React.useState("");
  const [discount, setDiscount] = React.useState("");
  const [brand, setBrand] = React.useState({ brand_id: 0 } as any);
  const [category, setCategory] = React.useState({ category_id: 0 } as any);
  const [color, setColor] = React.useState({ color_id: 0 } as any);
  const [size, setSize] = React.useState({ size_id: 0 } as any);

  const handleChangeBrand = (e: any, data: any) => {
    const selectedBrand = fakeData.brands.find(brand => brand.brand_id === data.value);
    setBrand(selectedBrand);
  };

  const handleChangeCategory = (e: any, data: any) => {
    const selectedCategory = fakeData.categories.find(category => category.category_id === data.value);
    setCategory(selectedCategory);
  };
  const handleChangeColor = (e: any, data: any) => {
    const selectedColor = fakeData.colors.find(color => color.color_id === data.value);
    setColor(selectedColor);
  };
  const handleChangeSize = (e: any, data: any) => {
    const selectedSize = fakeData.sizes.find(size => size.size_id === data.value);
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
        setMessage("done");
        setLoading(false);
      })
      .catch((error) => console.error(error));
  };

  const validate = () => {
    if (name === "") {
      setMessage("Name is required");
      return false;
    }
    if (description === "") {
      setMessage("Description is required");
      return false;
    }
    if (price === "") {
      setMessage("Price is required");
      return false;
    }
    if (quantity === "") {
      setMessage("Quantity is required");
      return false;
    }
    if (discount === "") {
      setMessage("Discount is required");
      return false;
    }
    if (brand?.brand_id === 0) {
      setMessage("Brand is required");
      return false;
    }
    if (category?.category_id === 0) {
      setMessage("Category is required");
      return false;
    }
    if (color?.color_id === 0) {
      setMessage("Color is required");
      return false;
    }
    if (size?.size_id === 0) {
      setMessage("Size is required");
      return false;
    }
    return true;
  };

  const submit = async () => {
    if (!validate()) {
      return;
    } else {
      const payload = {
        brand_id: brand?.brand_id,
        category_id: category?.category_id,
        condition_id: 1,
        description: description,
        discount: discount,
        name: name,
        shop_id: Number(AuthService.getShopID()),
        thumbnails: [imageCloud],
        variants: [
          {
            colorId: color?.color_id,
            price: price,
            quantity: quantity,
            sizeId: size?.size_id,
          },
        ],
      };
      //   console.log(payload);
      //   return

      const res = await ProductService.createProduct(payload);
      if (res?.result) {
        initialData();
        handleClear();
        setOpen(false);
        toast({
          type: "success",
          icon: "sync",
          title: "Create Product",
          description: "Create product successfully",
          time: 1000,
        });
      } else {
        setMessage("Create product failed");
      }
    }
  };

  const handleClear = () => {
    setThumbnail("");
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

  useEffect(() => { }, [imageCloud]);

  return (
    <Modal
      size="large"
      onClose={handleClear}
      onOpen={() => setOpen(true)}
      open={open}
    >
      <ModalHeader>Create Product</ModalHeader>
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
          <Image size="small" src={thumbnail} className="rounded-lg" />
        )}
        {thumbnail === "" && (
          <div className="h-[160px] flex flex-col items-center justify-center">
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
        <Form className="w-3/4">
          <FormGroup unstackable widths={2}>
            <FormInput
              label="Name"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <FormInput
              label="Description"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </FormGroup>
          <FormGroup unstackable widths={3}>
            <FormInput
              label="Price"
              placeholder="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <FormInput
              label="Quantity"
              placeholder="Quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
            <FormInput
              label="Discount"
              placeholder="Discount"
              value={discount}
              onChange={(e) => setDiscount(e.target.value)}
            />
          </FormGroup>
          <Header as="h6">Variant</Header>
          <Divider />
          <div className="w-full grid grid-cols-3 gap-4">
            <Select
              placeholder="Select brand"
              value={brand?.brand_id}
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
              value={category?.category_id}
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
              value={color?.color_id}
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
              value={size?.size_id}
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

export default ModalCreateProduct;
