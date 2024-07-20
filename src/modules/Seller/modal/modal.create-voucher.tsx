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
import { VoucherService } from '../../../services/voucher'
import { AuthService } from '../../../services/auth'

interface ModalCreateVoucherProps {
    open: boolean
    setOpen: (open: boolean) => void
    initialData: any
}

const ModalCreateVoucher: React.FC<ModalCreateVoucherProps> = ({ open, setOpen, initialData }) => {

    const [message, setMessage] = React.useState('')
    const [value, setValue] = React.useState('')

    const validate = () => {
        if (value === '') {
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
                shop_id: AuthService.getShopID(),
                value: value,
            }
            const res = await VoucherService.createVoucher(payload)
            if (res?.result) {
                initialData()
                setValue('')
                setOpen(false)
                toast({
                    type: 'success',
                    icon: 'sync',
                    title: 'Create Voucher',
                    description: 'Create voucher successfully',
                    time: 1000,
                });
            } else {
                setMessage('Create voucher failed')
            }
        }
    }

    const handleClear = () => {
        setValue('')
        setMessage('')
        setOpen(false)
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
            onClose={handleClear}
            onOpen={() => setOpen(true)}
            open={open}
        >
            <ModalHeader>Create Voucher</ModalHeader>
            {
                checkMessage() && (
                    <div className="mt-1 p-4 bg-red-100 text-red-600 dark:bg-red-500 dark:text-red-100">
                        {message}
                    </div>
                )
            }
            <ModalContent image className='!relative !flex !flex-col !justify-center !items-center !gap-8'>
                <Input label='Value (%)' value={value} placeholder="1x" onChange={(e) => { setValue(e.target.value); setMessage('done') }} />
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

export default ModalCreateVoucher