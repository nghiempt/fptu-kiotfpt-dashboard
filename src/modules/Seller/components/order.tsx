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
import { toast } from "react-semantic-toasts";
import { OrderService } from '../../../services/order'

const TableOrder = () => {

    const [loading, setLoading] = useState(true)
    const [data, setData] = useState([] as any)
    const [currentData, setCurrentData] = useState([] as any)
    const [currentPage, setCurrentPage] = useState(1)
    const [currentItem, setCurrentItem] = useState({ product: [{ thumbnail: '' }] } as any)

    const handleChangePage = (page: number) => {
        setCurrentPage(page)
        loadDataByPage(data, page)
    }

    const updateStatus = async (status: any) => {
        setLoading(true)
        const payload = status
        const res = await OrderService.updateStatusOrder(currentItem?.id, payload)
        if (res?.result) {
            reloadData()
            toast({
                type: 'success',
                icon: 'sync',
                title: 'Update Status Order',
                description: 'Update status order successfully',
                time: 1000,
            });
        } else {
            toast({
                type: 'error',
                icon: 'sync',
                title: 'Update Status Order',
                description: 'Update status order failed',
                time: 1000,
            });
        }
        setLoading(false)
    }

    const loadDataByPage = async (data: any, page: number) => {
        switch (page) {
            case 1:
                return setCurrentData(data?.slice(0, 12))
            case 2:
                return setCurrentData(data?.slice(12, 24))
            case 3:
                return setCurrentData(data?.slice(24, data?.length))
            default:
                return data
        }
    }

    const renderAmountPage = (data: any) => {
        const amountPage = Math.ceil(data?.length / 12)
        let amount = []
        for (let i = 1; i <= amountPage; i++) {
            amount.push(i)
        }
        return amount
    }

    const renderImage = (url: string) => {
        if (url) {
            return url
        } else {
            return 'https://react.semantic-ui.com/images/wireframe/image.png'
        }
    }

    const reloadData = async () => {
        const res = await OrderService.getOrderByShop(1, 12)
        if (res?.result) {
            setData(res?.data)
            setCurrentItem(res?.data.find((item: any) => item?.id === currentItem?.id))
            loadDataByPage(res?.data, currentPage)
            setLoading(false)
        }
    }

    const init = async () => {
        const res = await OrderService.getOrderByShop(1, 12)
        if (res?.result) {
            setData(res?.data)
            setCurrentItem(res?.data[0])
            setCurrentPage(1)
            loadDataByPage(res?.data, 1)
            setLoading(false)
        }
    }

    useEffect(() => {
        init()
    }, [])

    return (
        <div className='flex justify-center items-start gap-4'>
            <Table celled>
                <TableHeader>
                    <TableRow>
                        <TableHeaderCell>ORDER ID</TableHeaderCell>
                        <TableHeaderCell>PRODUCT</TableHeaderCell>
                        <TableHeaderCell>TOTAL</TableHeaderCell>
                        <TableHeaderCell>CUSTOMER</TableHeaderCell>
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
                            currentData?.map((item: any, index: any) => {
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
                                                <Image src={renderImage(item?.product[0]?.thumbnail)} size='mini' className='rounded-lg' />
                                                {item?.product[0]?.name}
                                            </div>
                                        </TableCell>
                                        <TableCell>${item?.total}</TableCell>
                                        <TableCell>
                                            <div className='flex items-center gap-4'>
                                                <Image src={renderImage(item?.profile?.avatar)} size='mini' className='rounded-full' />
                                                {item?.profile?.name}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Button color={`${item?.status?.value === 'completed' ? 'teal' : 'grey'}`} className='!uppercase !text-[12px]'>
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
                        <TableHeaderCell colSpan='5'>
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
                    <Image size='tiny' src={currentItem?.product[0]?.thumbnail} wrapped ui={false} className='rounded-md' />
                    <CardContent>
                        <CardHeader>{currentItem?.name}</CardHeader>
                        <CardMeta>
                            <span className='date'>{currentItem?.time_init}</span>
                        </CardMeta>
                        <div className='flex flex-col mt-4 gap-2'>
                            <CardDescription>
                                <strong>Total: </strong>${currentItem?.total}
                            </CardDescription>
                            <CardDescription>
                                <strong>Product: </strong>{currentItem?.product[0]?.name}
                            </CardDescription>
                            <CardDescription>
                                <strong>Customer: </strong>{currentItem?.profile?.name}
                            </CardDescription>
                            <CardDescription>
                                <strong>Phone: </strong>{currentItem?.profile?.phone}
                            </CardDescription>
                            <CardDescription>
                                <strong>Email: </strong>{currentItem?.profile?.email}
                            </CardDescription>
                        </div>
                    </CardContent>
                    {
                        currentItem?.status?.value === 'pending' && (
                            <CardContent extra>
                                <a className='flex justify-center items-center grid grid-cols-2 gap-3'>
                                    <Button color='red' onClick={() => updateStatus('rejected')} loading={loading ? true : false}>Reject</Button>
                                    <Button color='blue' onClick={() => updateStatus('completed')} loading={loading ? true : false}>Complete</Button>
                                </a>
                            </CardContent>
                        )
                    }
                </Card>
            </div>
        </div>
    )
}

export default TableOrder