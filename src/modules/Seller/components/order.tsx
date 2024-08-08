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
import { formatDate } from '../../../utils/helper';

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
        const startIndex = (page - 1) * 10;
        const endIndex = page * 10;
        const currentData = data?.slice(startIndex, endIndex);
        return setCurrentData(currentData);
    };

    const renderAmountPage = (data: any) => {
        const amountPage = Math.ceil(data?.length / 10)       
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

    const renderButton = (status: any) => {
        switch (status) {
            case 'pending':
                return (
                    <CardContent extra>
                        <a className=' justify-center items-center grid grid-cols-2 gap-3'>
                            <Button color='red' onClick={() => updateStatus('rejected')} loading={loading ? true : false}>Reject</Button>
                            <Button color='blue' onClick={() => updateStatus('accepted')} loading={loading ? true : false}>Accept</Button>
                        </a>
                    </CardContent>
                )
            case 'accepted':
                return (
                    <CardContent extra>
                        <a className=' justify-center items-center grid grid-cols-1 gap-3'>
                            <Button color='blue' onClick={() => updateStatus('delivering')} loading={loading ? true : false}>Delivering</Button>
                        </a>
                    </CardContent>
                )
            case 'delivering':
                return (
                    <CardContent extra>
                        <a className=' justify-center items-center grid grid-cols-1 gap-3'>
                            <Button color='blue' onClick={() => updateStatus('completed')} loading={loading ? true : false}>Complete</Button>
                        </a>
                    </CardContent>
                )
            default:
                return null
        }
    }

    const renderColorStatus = (status: any) => {
        switch (status) {
            case 'pending':
                return 'blue'
            case 'accepted':
                return 'purple'
            case 'delivering':
                return 'yellow'
            case 'completed':
                return 'green'
            case 'rejected':
                return 'orange'
            case 'paying':
                return 'grey'
            default:
                return 'red'
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
                                                <Image src={renderImage(item?.profile?.avatar)} size='mini' className='rounded-full !w-10 !h-10' />
                                                {item?.profile?.name}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Button color={`${renderColorStatus(item?.status?.value)}`} className='!uppercase !text-[12px]'>
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
                            <span className='date'>{formatDate(currentItem?.time_init)}</span>
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
                        renderButton(currentItem?.status?.value)
                    }
                </Card>
            </div>
        </div>
    )
}

export default TableOrder