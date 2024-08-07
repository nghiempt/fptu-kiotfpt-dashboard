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
    CardContent,
    Card,
    Icon,
    Image,
    Button,
    Loader,
} from 'semantic-ui-react'
import { ShopService } from '../../../services/shop'
import { toast } from 'react-semantic-toasts'
import { UserService } from '../../../services/user'

const TableUser = () => {

    const [loading, setLoading] = useState(true)
    const [data, setData] = useState([] as any)
    const [currentData, setCurrentData] = useState([] as any)
    const [currentPage, setCurrentPage] = useState(1)
    const [currentItem, setCurrentItem] = useState({} as any)

    const handleChangePage = (page: number) => {
        setCurrentPage(page)
        loadDataByPage(data, page)
    }

    const updateStatus = async () => {
        setLoading(true)
        const status = currentItem?.status?.value === 'active' ? 'inactive' : 'active'
        const res = await ShopService.updateStatusShop(currentItem?.id, status)
        if (res?.result) {
            toast({
                type: 'success',
                icon: 'sync',
                title: 'Update Status Shop',
                description: 'Update status shop successfully',
                time: 1000,
            });
            init()
        } else {
            toast({
                type: 'error',
                icon: 'sync',
                title: 'Update Status Shop',    
                description: 'Update status shop failed',
                time: 1000,
            });
        }
        setLoading(false)
    }

    const loadDataByPage = async (data: any, page: number) => {
        const startIndex = (page - 1) * 12;
        const endIndex = page * 12;
        const currentData = data?.slice(startIndex, endIndex);
        return setCurrentData(currentData);
    };

    const renderAmountPage = (data: any) => {
        const amountPage = Math.ceil(data?.length / 12)
        let amount = []
        for (let i = 1; i <= amountPage; i++) {
            amount.push(i)
        }
        return amount
    }

    const init = async () => {
        const res = await UserService.getAllUsers()
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
        <div className='w-full flex justify-center items-start gap-4'>
            <Table celled>
                <TableHeader>
                    <TableRow>
                        <TableHeaderCell>USER NAME</TableHeaderCell>
                        <TableHeaderCell>USER EMAIL</TableHeaderCell>
                        <TableHeaderCell>USER PHONE</TableHeaderCell>
                        <TableHeaderCell>TOTAL SPENT</TableHeaderCell>
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
                                        <TableCell className='flex items-center gap-4'>
                                            <Image src={item?.avatar} size='mini' className='rounded-lg' /> {item?.name}</TableCell>
                                        <TableCell>{item?.email}</TableCell>
                                        <TableCell>{item?.phone}</TableCell>
                                        <TableCell>${item?.totalSpent}</TableCell>
                                    </TableRow>
                                )
                            })
                    }
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TableHeaderCell colSpan='6'>
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
        </div>
    )
}

export default TableUser