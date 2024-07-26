import React, { useEffect } from 'react'
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
    Loader
} from 'semantic-ui-react'
import { toast } from 'react-semantic-toasts'
import { CLOUDINARY } from '../../../utils/api'
import { ProductService } from '../../../services/product'

interface ModalUpdateProductProps {
    open: boolean
    setOpen: (open: boolean) => void
    currentItem: any
    setCurrentItem: (currentItem: any) => void
    initialData: any
}

const ModalUpdateProduct: React.FC<ModalUpdateProductProps> = ({ open, setOpen, currentItem, setCurrentItem, initialData }) => {

    const [imageCloud, setImageCloud] = React.useState('')
    const [loading, setLoading] = React.useState(false)
    const [message, setMessage] = React.useState('')

    const uploadImageToCloudinary = async (file: File) => {
        setLoading(true)
        const formdata = new FormData();
        formdata.append("file", file);
        formdata.append("upload_preset", "kiotfpt");
        formdata.append("folder", "kiotfpt");
        fetch(CLOUDINARY, {
            method: "POST",
            body: formdata,
            redirect: "follow"
        })
            .then((response) => response.text())
            .then((result) => {
                const data = JSON.parse(result);
                setImageCloud(data.secure_url);
                setLoading(false)
            })
            .catch((error) => console.error(error));
    }

    const validate = () => {
        if (currentItem?.name === '') {
            setMessage('Name is required')
            return false
        } else {
            return true
        }
    }

    const submit = async () => {
        if (!validate()) {
            return
        } else {
            const payload =
            {
                brand_id: 9,
                category_id: 9,
                condition_id: 1,
                description: "nghiem ne",
                discount: 99,
                name: "Update ne",
                shop_id: 10,
                thumbnails: [
                    imageCloud === '' ? currentItem?.thumbnail[0]?.link : imageCloud,
                ],
                variants: [
                    {
                        colorId: 1,
                        price: 400,
                        quantity: 2,
                        sizeId: 15
                    }
                ]
            }
            const res = await ProductService.updateProduct(currentItem?.id, payload)
            if (res?.result) {
                initialData()
                handleClear()
                toast({
                    type: 'success',
                    icon: 'sync',
                    title: 'Update Product',
                    description: 'Update product successfully',
                    time: 1000,
                });
            } else {
                setMessage('Update product failed')
            }
        }
    }

    const handleClear = () => {
        setImageCloud('')
        setMessage('')
        setOpen(false)
    }

    const handleChangeCurrentItem = (key: string, value: any) => {
        setCurrentItem({
            ...currentItem,
            [key]: value
        })
        setMessage('done')
    }

    const checkMessage = () => {
        if (message !== '' && message !== 'done') {
            return true
        }
        return false
    }

    useEffect(() => { }, [imageCloud])

    return (
        <Modal
            size='large'
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
        >
            <ModalHeader>Update Product</ModalHeader>
            {
                checkMessage() && (
                    <div className="mt-1 p-4 bg-red-100 text-red-600 dark:bg-red-500 dark:text-red-100">
                        {message}
                    </div>
                )
            }
            <ModalContent image className='!relative !flex !flex-col !justify-center !items-center !gap-8'>
                {
                    loading
                        ?
                        <Dimmer active inverted>
                            <Loader inverted content='Loading' />
                        </Dimmer>
                        :
                        <Image size='small' src={currentItem?.thumbnail[0]?.link} className='rounded-lg' />
                }
                <Form className='w-3/4'>
                    <FormGroup unstackable widths={2}>
                        <FormInput label='Name' placeholder='Name' />
                        <FormInput label='Description' placeholder='Description' />
                    </FormGroup>
                    <FormGroup unstackable widths={3}>
                        <FormInput label='Price' placeholder='Price' />
                        <FormInput label='Quantity' placeholder='Quantity' />
                        <FormInput label='Discount' placeholder='Discount' />
                    </FormGroup>
                    <Header as='h6'>Variant</Header>
                    <Divider />
                    <div className='w-full grid grid-cols-3 gap-4'>
                        <Select
                            placeholder='Select brand'
                            options={[
                                { key: 'af', value: 'af', text: 'Afghanistan' },
                            ]}
                        />
                        <Select
                            placeholder='Select category'
                            options={[
                                { key: 'af', value: 'af', text: 'Afghanistan' },
                            ]}
                        />
                        <Select
                            placeholder='Select type'
                            options={[
                                { key: 'af', value: 'af', text: 'Afghanistan' },
                            ]}
                        />
                    </div>
                </Form>
                <div className='absolute cursor-pointer top-4 right-40'>
                    <div className="flex flex-col items-center justify-center">
                        <label htmlFor="thumbnai1" className="cursor-pointer hover:opacity-80 px-4 py-1 rounded-full font-semibold text-xs">
                            <Icon name='cloud upload' size='big' color='grey' />
                        </label>
                        <input
                            type="file"
                            id="thumbnai1"
                            className="hidden"
                            onChange={(e: any) => {
                                const file = e.target.files[0]
                                const reader = new FileReader()
                                reader.onloadend = () => {
                                    handleChangeCurrentItem('thumbnail', reader.result as string)
                                }
                                reader.readAsDataURL(file)
                                uploadImageToCloudinary(file)
                            }}
                        />
                    </div>
                </div>
            </ModalContent>
            <ModalActions>
                <Button color='grey' onClick={() => setOpen(false)}>
                    Cancel
                </Button>
                <Button
                    content="Submit"
                    className='!bg-[rgb(78,178,173)]'
                    labelPosition='right'
                    icon='checkmark'
                    onClick={submit}
                    positive
                />
            </ModalActions>
        </Modal>
    )
}

export default ModalUpdateProduct