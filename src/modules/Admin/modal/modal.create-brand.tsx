import React, { useEffect } from 'react'
import {
    ModalHeader,
    ModalContent,
    ModalActions,
    Button,
    Modal,
    Input,
    Image,
    Icon,
    Loader,
    Dimmer
} from 'semantic-ui-react'
import { toast } from 'react-semantic-toasts'
import { CLOUDINARY } from '../../../utils/api'
import { BrandService } from '../../../services/brand'

interface ModalCreateBrandProps {
    open: boolean
    setOpen: (open: boolean) => void
    initialData: any
}

const ModalCreateBrand: React.FC<ModalCreateBrandProps> = ({ open, setOpen, initialData }) => {

    const [message, setMessage] = React.useState('')
    const [loading, setLoading] = React.useState(false)
    const [thumbnail, setThumbnail] = React.useState('')
    const [name, setName] = React.useState('')
    const [imageCloud, setImageCloud] = React.useState('')

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
                setMessage('done')
                setLoading(false)
            })
            .catch((error) => console.error(error));
    }

    const validate = () => {
        if (name === '') {
            setMessage('Name is required')
            return false
        } else if (imageCloud === '') {
            setMessage('Thumbnail is required')
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
                name: name,
                thumbnail: imageCloud,
            }
            const res = await BrandService.createBrand(payload)
            if (res?.result) {
                initialData()
                setThumbnail('')
                setName('')
                setImageCloud('')
                setOpen(false)
                toast({
                    type: 'success',
                    icon: 'sync',
                    title: 'Create Brand',
                    description: 'Create brand successfully',
                    time: 1000,
                });
            } else {
                setMessage('Create brand failed')
            }
        }
    }

    const handleClear = () => {
        setThumbnail('')
        setName('')
        setImageCloud('')
        setMessage('')
        setOpen(false)
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
            onClose={handleClear}
            onOpen={() => setOpen(true)}
            open={open}
        >
            <ModalHeader>Create Brand</ModalHeader>
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
                        <Image size='small' src={thumbnail} className='rounded-lg' />
                }
                {
                    thumbnail === '' && (
                        <div className="h-[160px] flex flex-col items-center justify-center">
                            <label htmlFor="thumbnai1" className="cursor-pointer hover:opacity-80 px-4 py-1 rounded-full font-semibold text-xs">
                                <Icon name='cloud upload' size='huge' color='grey' />
                            </label>
                            <input
                                type="file"
                                id="thumbnai1"
                                className="hidden"
                                onChange={(e: any) => {
                                    const file = e.target.files[0]
                                    const reader = new FileReader()
                                    reader.onloadend = () => {
                                        setThumbnail(reader.result as string)
                                    }
                                    reader.readAsDataURL(file)
                                    uploadImageToCloudinary(file)
                                }}
                            />
                        </div>
                    )
                }
                <Input label='Name' value={name} placeholder="Brand Name" onChange={(e) => { setName(e.target.value); setMessage('done') }} />
            </ModalContent>
            <ModalActions>
                <Button color='grey' onClick={handleClear}>
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

export default ModalCreateBrand