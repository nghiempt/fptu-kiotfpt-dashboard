import { useEffect, useState } from "react";
import { ShopService } from "../../../services/shop";
import {
  FormGroup,
  FormField,
  Form,
  Input,
  Header,
  Image,
  Select,
  Button,
  Rating,
  Label,
  Icon,
  Loader,
} from "semantic-ui-react";
import { AddressService } from "../../../services/address";
import { toast } from "react-semantic-toasts";
import { AuthService } from "../../../services/auth";
import { CLOUDINARY } from "../../../utils/api";

const TableShop = () => {
  const [loadingInit, setLoadingInit] = useState(true);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({} as any);
  const [initialData, setInitialData] = useState({} as any);
  const [provinces, setProvinces] = useState([] as any);
  const [districts, setDistricts] = useState([] as any);

  const [addressValue, setAddressValue] = useState("");
  const [addressProvince, setAddressProvince] = useState({} as any);
  const [addressDistrict, setAddressDistrict] = useState({} as any);
  const [imageCloud, setImageCloud] = useState("");

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

  const handleUpdate = async () => {
    setLoading(true);
    const payload = {
      account_id: AuthService.getAccountID(),
      address: {
        account_profile_id: data?.address?.profile?.id,
        address_id: data?.address?.id,
        address_value: addressValue,
        default: true,
        district_id: addressDistrict?.id,
        province_id: addressProvince?.id,
      },
      email: data?.email,
      id: data?.id,
      name: data?.name,
      phone: data?.phone,
      thumbnail: imageCloud === "" ? data?.thumbnail : imageCloud,
    };
    const res = await ShopService.updateShop(data?.id, payload);
    if (res?.result) {
      init();
      toast({
        type: "success",
        icon: "sync",
        title: "Update Profile",
        description: "Update profile successfully",
        time: 1000,
      });
      setLoading(false);
    } else {
      toast({
        type: "error",
        icon: "sync",
        title: "Update profile failed",
        description: res?.message,
        time: 1000,
      });
      setLoading(false);
    }
  };

  const handleUpdateInput = (key: string, value: any) => {
    setData({
      ...data,
      [key]: value,
    });
  };

  const getAllProvince = async () => {
    let tmp: any = [];
    const province = await AddressService.getAllProvinces();
    if (province?.result) {
      province?.data.map((item: any) => {
        tmp = [...tmp, { key: item?.id, value: item?.id, text: item?.value }];
      });
    }
    return tmp;
  };

  const getAllDistrict = async (provinceID: any) => {
    let tmp: any = [];
    const district = await AddressService.getAllDistrictsByProvinceID(
      provinceID
    );
    if (district?.result) {
      district?.data.map((item: any) => {
        tmp = [...tmp, { key: item?.id, value: item?.id, text: item?.value }];
      });
    }
    return tmp;
  };

  const handleChangeProvince = async (e: any) => {
    let provinceID = provinces.find(
      (item: any) => item?.text === e?.target?.innerText
    )?.key;
    setAddressProvince({ id: provinceID, value: e?.target?.innerText });
    setAddressDistrict({ id: 0, value: "" });
    const districts = await getAllDistrict(provinceID);
    setDistricts(districts);
    handleUpdateInput("address", {
      ...data?.address,
      province: { id: provinceID, value: e?.target?.innerText },
    });
  };

  const handleChangeDistrict = async (e: any) => {
    let districtID = districts.find(
      (item: any) => item?.text === e?.target?.innerText
    )?.key;
    setAddressDistrict({ id: districtID, value: e?.target?.innerText });
    handleUpdateInput("address", {
      ...data?.address,
      district: { id: districtID, value: e?.target?.innerText },
    });
  };

  const init = async () => {
    const res = await ShopService.getShopByID("10");
    if (res?.result) {
      setData(res?.data);
      setInitialData(res?.data); // Lưu trữ dữ liệu ban đầu
      setAddressValue(res?.data?.address?.value);
      setAddressProvince(res?.data?.address?.province);
      setAddressDistrict(res?.data?.address?.district);
      setLoadingInit(false);
    }
    const provinces = await getAllProvince();
    setProvinces(provinces);
    const districts = await getAllDistrict(res?.data?.address?.province?.id);
    setDistricts(districts);
  };

  const hasChanges = () => {
    return (
      JSON.stringify(initialData) !== JSON.stringify(data) ||
      initialData.address?.value !== addressValue ||
      initialData.address?.province?.id !== addressProvince?.id ||
      initialData.address?.district?.id !== addressDistrict?.id ||
      (imageCloud && imageCloud !== initialData.thumbnail)
    );
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <>
      {loadingInit ? (
        <div className="w-full flex flex-col justify-center items-start gap-2">
          <Loader active inline="centered" />
        </div>
      ) : (
        <div className="w-full flex flex-col justify-center items-start gap-2">
          <Header as="h2">Shop Profile</Header>
          <div className="flex justify-start items-start gap-8">
            <div className="relative">
              <Image
                src={data?.thumbnail}
                size="small"
                className="rounded-lg mb-4"
              />
              <div className="flex flex-col items-center justify-center absolute top-0 right-0">
                <label
                  htmlFor="thumbnai1"
                  className="cursor-pointer hover:opacity-80 p-0.5 rounded-full font-semibold text-xs"
                >
                  <Icon name="cloud upload" size="big" color="grey" />
                </label>
                <input
                  type="file"
                  id="thumbnai1"
                  className="hidden"
                  onChange={(e: any) => {
                    const file = e.target.files[0];
                    const reader = new FileReader();
                    reader.onloadend = () => {
                      handleUpdateInput("thumbnail", reader.result as string);
                    };
                    reader.readAsDataURL(file);
                    uploadImageToCloudinary(file);
                  }}
                />
              </div>
            </div>

            <div className="flex flex-col justify-start items-start">
              <Label as="a" color="blue" image>
                <Icon name="check" />
                Official
              </Label>
              <span className="font-bold flex justify-center items-center gap-2 mt-4 mb-3">
                {[...Array(5)].map((_, index) => (
                  <Rating
                    key={index}
                    icon="star"
                    defaultRating={index < data?.rate ? 1 : 0}
                    maxRating={1}
                    disabled
                  />
                ))}
              </span>

              <span className="">
                <strong>{data?.follower}</strong> follower{data?.follower > 1 && "s"}
              </span>
            </div>
          </div>
          <Form className="w-full">
            <FormGroup widths="equal">
              <FormField>
                <label>Name</label>
                <Input
                  fluid
                  placeholder="Name"
                  value={data?.name}
                  onChange={(e) => handleUpdateInput("name", e.target.value)}
                />
              </FormField>
              <FormField>
                <label>Email</label>
                <Input
                  fluid
                  placeholder="Email"
                  value={data?.email}
                  onChange={(e) => handleUpdateInput("email", e.target.value)}
                />
              </FormField>
              <FormField>
                <label>Phone</label>
                <Input
                  fluid
                  placeholder="Phone"
                  value={data?.phone}
                  onChange={(e) => handleUpdateInput("phone", e.target.value)}
                />
              </FormField>
            </FormGroup>
          </Form>
          <Form className="w-full">
            <FormGroup widths="equal">
              <FormField>
                <label>Address</label>
                <Input
                  fluid
                  placeholder="Address"
                  value={addressValue}
                  onChange={(e) => setAddressValue(e.target.value)}
                />
              </FormField>
              <FormField>
                <label>Province</label>
                <div className="w-full flex gap-2">
                  <Select
                    placeholder="Select your province"
                    className="w-full"
                    value={addressProvince?.id}
                    options={provinces}
                    onChange={(e) => handleChangeProvince(e)}
                  />
                </div>
              </FormField>
              <FormField>
                <label>District</label>
                <div className="w-full flex gap-2">
                  <Select
                    placeholder="Select your district"
                    className="w-full"
                    value={addressDistrict?.id}
                    options={districts}
                    onChange={(e) => handleChangeDistrict(e)}
                  />
                </div>
              </FormField>
            </FormGroup>
          </Form>
          <div className="w-full flex justify-end items-center">
            <Button
              primary
              onClick={handleUpdate}
              loading={loading}
              disabled={!hasChanges()}
            >
              Update
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default TableShop;
