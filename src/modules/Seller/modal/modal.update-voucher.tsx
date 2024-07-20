import React from 'react'
import {
    ModalHeader,
    ModalContent,
    ModalActions,
    Button,
    Modal,
    Input,
} from 'semantic-ui-react'
import { toast } from 'react-semantic-toasts'
import { AuthService } from '../../../services/auth'
import { VoucherService } from '../../../services/voucher'

interface ModalUpdateVoucherProps {
    open: boolean
    setOpen: (open: boolean) => void
    currentItem: any
    setCurrentItem: (currentItem: any) => void
    initialData: any
}

const ModalUpdateVoucher: React.FC<ModalUpdateVoucherProps> = ({ open, setOpen, currentItem, setCurrentItem, initialData }) => {

    const [message, setMessage] = React.useState('')

    const validate = () => {
        if (currentItem?.value === '') {
            setMessage('Value is required')
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
                value: currentItem?.value,
                shop_id: AuthService.getShopID(),
            }
            const res = await VoucherService.updateVoucher(currentItem?.id, payload)
            if (res?.result) {
                initialData()
                setOpen(false)
                toast({
                    type: 'success',
                    icon: 'sync',
                    title: 'Update Voucher',
                    description: 'Update voucher successfully',
                    time: 1000,
                });
            } else {
                setMessage('Update voucher failed')
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

    return (
        <Modal
            size='mini'
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
        >
            <ModalHeader>Update Voucher</ModalHeader>
            {
                checkMessage() && (
                    <div className="mt-1 p-4 bg-red-100 text-red-600 dark:bg-red-500 dark:text-red-100">
                        {message}
                    </div>
                )
            }
            <ModalContent image className='!relative !flex !flex-col !justify-center !items-center !gap-8'>
                <Input label='Value (%)' value={currentItem?.value} onChange={(e) => handleChangeCurrentItem('value', e.target.value)} />
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

export default ModalUpdateVoucher