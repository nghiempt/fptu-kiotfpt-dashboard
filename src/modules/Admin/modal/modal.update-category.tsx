import React, { useEffect } from 'react'
import {
    ModalHeader,
    ModalContent,
    ModalActions,
    Button,
    Image,
    Modal,
    Input,
    Icon,
    Dimmer,
    Loader,
} from 'semantic-ui-react'
import { CategoryService } from '../../../services/category'
import { toast } from 'react-semantic-toasts'
import { CLOUDINARY } from '../../../utils/api'

interface ModalUpdateCategoryProps {
    open: boolean
    setOpen: (open: boolean) => void
    currentItem: any
    setCurrentItem: (currentItem: any) => void
    initialData: any
}

const ModalUpdateCategory: React.FC<ModalUpdateCategoryProps> = ({ open, setOpen, currentItem, setCurrentItem, initialData }) => {

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
            const payload = {
                name: currentItem?.name,
                thumbnail: imageCloud === '' ? currentItem?.thumbnail : imageCloud,
            }
            const res = await CategoryService.updateCategory(currentItem?.id, payload)
            if (res?.result) {
                initialData()
                setImageCloud('')
                setOpen(false)
                toast({
                    type: 'success',
                    icon: 'sync',
                    title: 'Update Category',
                    description: 'Update category successfully',
                    time: 1000,
                });
            } else {
                setMessage('Update category failed')
            }
        }
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
            size='mini'
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
        >
            <ModalHeader>Update Category</ModalHeader>
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
                        <Image size='small' src={currentItem?.thumbnail} className='rounded-lg' />
                }
                <Input label='Name' value={currentItem?.name} onChange={(e) => handleChangeCurrentItem('name', e.target.value)} />
                <div className='absolute cursor-pointer top-4 right-16'>
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

export default ModalUpdateCategory