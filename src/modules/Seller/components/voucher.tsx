import { useEffect, useState } from 'react'
import {
    TableRow,
    TableHeaderCell,
    TableHeader,
    TableFooter,
    TableCell,
    TableBody,
    MenuItem,
    Label,
    Menu,
    Table,
    CardMeta,
    CardHeader,
    CardDescription,
    CardContent,
    Card,
    Icon,
    Image,
    Button,
    Loader,
} from 'semantic-ui-react'
import ModalUpdateCategory from '../modal/modal.update-category'
import ModalCreateCategory from '../modal/modal.create-category'
import { CategoryService } from '../../../services/category'
import { toast } from "react-semantic-toasts";
import { VoucherService } from '../../../services/voucher'
import ModalUpdateVoucher from '../modal/modal.update-voucher'
import ModalCreateVoucher from '../modal/modal.create-voucher'

const TableVoucher = () => {

    const [loading, setLoading] = useState(true)
    const [data, setData] = useState([] as any)
    const [currentData, setCurrentData] = useState([] as any)
    const [currentPage, setCurrentPage] = useState(1)
    const [currentItem, setCurrentItem] = useState({} as any)

    const [openModalUpdate, setOpenModalUpdate] = useState(false)
    const [openModalCreate, setOpenModalCreate] = useState(false)

    const handleOpenModalUpdate = () => {
        setOpenModalUpdate(true)
    }

    const handleOpenModalCreate = () => {
        setOpenModalCreate(true)
    }

    const handleChangePage = (page: number) => {
        setCurrentPage(page)
        loadDataByPage(data, page)
    }

    const updateStatus = async () => {
        setLoading(true)
        const payload = currentItem?.status?.value === 'active' ? 'inactive' : 'active'
        const res = await VoucherService.updateStatusVoucher(currentItem?.id, payload)
        if (res?.result) {
            reloadData()
            toast({
                type: 'success',
                icon: 'sync',
                title: 'Update Status Voucher',
                description: 'Update status voucher successfully',
                time: 1000,
            });
        } else {
            toast({
                type: 'error',
                icon: 'sync',
                title: 'Update Status Voucher',
                description: 'Update status voucher failed',
                time: 1000,
            });
        }
        setLoading(false)
    }

    const loadDataByPage = async (data: any, page: number) => {
        return data
    }

    const renderAmountPage = (data: any) => {
        const amountPage = Math.ceil(data?.length / 12)
        let amount = []
        for (let i = 1; i <= amountPage; i++) {
            amount.push(i)
        }
        return amount
    }

    const filterDataActive = (data: any) => {
        let tmp: any = []
        data?.map((item: any) => {
            if (item?.status?.value === 'active') {
                tmp.push(item)
            }
        })
        return tmp
    }

    const reloadData = async () => {
        const res = await VoucherService.getAllVouchers(10)
        if (res?.result) {
            setData(res?.data?.vouchers)
            setLoading(false)
        }
    }

    const init = async () => {
        const res = await VoucherService.getAllVouchers(10)
        if (res?.result) {
            setData(res?.data?.vouchers)
            setCurrentItem(res?.data?.vouchers[0])
            setCurrentPage(1)
            setLoading(false)
        }
    }

    useEffect(() => {
        init()
    }, [])

    return (
        <div className='flex justify-center items-start gap-4'>
            <ModalUpdateVoucher open={openModalUpdate} setOpen={setOpenModalUpdate} currentItem={currentItem} setCurrentItem={setCurrentItem} initialData={reloadData} />
            <ModalCreateVoucher open={openModalCreate} setOpen={setOpenModalCreate} initialData={reloadData} />
            <Table celled>
                <TableHeader>
                    <TableRow>
                        <TableHeaderCell>VOUCHER ID</TableHeaderCell>
                        <TableHeaderCell>VOUCHER VALUE</TableHeaderCell>
                        <TableHeaderCell>STATUS</TableHeaderCell>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        loading
                            ?
                            <TableRow>
                                <Loader active inline />
                            </TableRow>
                            :
                            filterDataActive(data)?.map((item: any, index: any) => {
                                return (
                                    <TableRow
                                        key={index}
                                        onClick={() => setCurrentItem(item)}
                                        className={`${item?.id === currentItem?.id ? '!bg-gray-100' : ''} cursor-pointer`}
                                    >
                                        <TableCell>
                                            <Label ribbon>KTF-CAT-0{item?.id}</Label>
                                        </TableCell>
                                        <TableCell>
                                            <div className='flex items-center gap-4'>
                                                <Image src="https://cdn-icons-png.flaticon.com/128/3837/3837117.png" size='mini' className='rounded-lg' /> {item?.value}%
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Button color={`${item?.status?.value === 'active' ? 'teal' : 'grey'}`} className='!uppercase !text-[12px]'>
                                                {item?.status?.value}
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                )
                            })
                    }
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TableHeaderCell colSpan='3'>
                            <Menu floated='right' pagination>
                                <MenuItem as='a' icon>
                                    <Icon name='chevron left' />
                                </MenuItem>
                                {
                                    renderAmountPage(data)?.map((item: any, index: any) => {
                                        return (
                                            <MenuItem
                                                as='a'
                                                key={index}
                                                onClick={() => handleChangePage(item)}
                                                className={`${item === currentPage ? '!bg-gray-200' : ''}`}
                                            >{index + 1}
                                            </MenuItem>
                                        )
                                    })
                                }
                                <MenuItem as='a' icon>
                                    <Icon name='chevron right' />
                                </MenuItem>
                            </Menu>
                        </TableHeaderCell>
                    </TableRow>
                </TableFooter>
            </Table>
            <div>
                <Card className='!mt-0'>
                    <Image size='tiny' src={"https://cdn-icons-png.flaticon.com/128/3837/3837117.png"} wrapped ui={false} className='rounded-md' />
                    <CardContent>
                        <CardHeader>{currentItem?.value}</CardHeader>
                        <CardMeta>
                            <span className='date'>July 15th 2024</span>
                        </CardMeta>
                    </CardContent>
                    <CardContent extra>
                        <a className='flex justify-between items-center'>
                            <Button onClick={updateStatus} loading={loading ? true : false} color='red'>Remove</Button>
                            <Label as='a' color={`${currentItem?.status?.value === 'active' ? 'teal' : 'grey'}`} className='!uppercase !text-[12px]' tag>
                                {currentItem?.status?.value}
                            </Label>
                        </a>
                    </CardContent>
                </Card>
                <div className='w-full flex justify-center items-center gap-3'>
                    <Button color='facebook' onClick={handleOpenModalCreate} className='!w-full'>
                        <Icon name='plus' /> Create
                    </Button>
                    <Button color='orange' onClick={handleOpenModalUpdate} className='!w-full'>
                        <Icon name='edit' /> Update
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default TableVoucher