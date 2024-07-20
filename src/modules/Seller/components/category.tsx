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
import { CategoryService } from '../../../services/category'
import { toast } from "react-semantic-toasts";
import { ShopCategoryService } from '../../../services/shop-category'
import ModalCreateShopCategory from '../modal/modal.create-shop-category'

const TableCategory = () => {

    const [loading, setLoading] = useState(true)
    const [data, setData] = useState([] as any)
    const [currentData, setCurrentData] = useState([] as any)
    const [currentPage, setCurrentPage] = useState(1)
    const [currentItem, setCurrentItem] = useState({} as any)

    const [openModalCreate, setOpenModalCreate] = useState(false)

    const handleOpenModalCreate = () => {
        setOpenModalCreate(true)
    }

    const handleChangePage = (page: number) => {
        setCurrentPage(page)
        loadDataByPage(data, page)
    }

    const updateStatus = async () => {
        setLoading(true)
        const payload = {
            value: currentItem?.status?.value === 'active' ? 'inactive' : 'active'
        }
        const res = await CategoryService.updateStatusCategory(currentItem?.id, payload)
        if (res?.result) {
            reloadData()
            toast({
                type: 'success',
                icon: 'sync',
                title: 'Update Status Category',
                description: 'Update status category successfully',
                time: 1000,
            });
        } else {
            toast({
                type: 'error',
                icon: 'sync',
                title: 'Update Status Category',
                description: 'Update status category failed',
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

    const reloadData = async () => {
        const res = await CategoryService.getAllCategories()
        if (res?.result) {
            setData(res?.data)
            loadDataByPage(res?.data, currentPage)
            setCurrentItem(res?.data.find((item: any) => item?.id === currentItem?.id))
            setLoading(false)
        }
    }

    const init = async () => {
        const res = await ShopCategoryService.getAllCategories()
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
            <ModalCreateShopCategory open={openModalCreate} setOpen={setOpenModalCreate} initialData={reloadData} />
            <Table celled>
                <TableHeader>
                    <TableRow>
                        <TableHeaderCell>CATEGORY ID</TableHeaderCell>
                        <TableHeaderCell>CATEGORY NAME</TableHeaderCell>
                        <TableHeaderCell>NUMBER OF PRODUCT</TableHeaderCell>
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
                                                <Image src={item?.category?.thumbnail} size='mini' className='rounded-lg' /> {item?.category?.name}
                                            </div>
                                        </TableCell>
                                        <TableCell>{item?.product_total} products</TableCell>
                                        <TableCell>
                                            <Button color={`${item?.category?.status?.value === 'active' ? 'teal' : 'grey'}`} className='!uppercase !text-[12px]'>
                                                {item?.category?.status?.value}
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                )
                            })
                    }
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TableHeaderCell colSpan='4'>
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
                    <Image size='tiny' src={currentItem?.category?.thumbnail} wrapped ui={false} className='rounded-md' />
                    <CardContent>
                        <CardHeader>{currentItem?.category?.name}</CardHeader>
                        <CardMeta>
                            <span className='date'>July 15th 2024</span>
                        </CardMeta>
                        <CardDescription>
                            {currentItem?.product_total} products
                        </CardDescription>
                    </CardContent>
                    <CardContent extra>
                        <a className='flex justify-between items-center'>
                            <Button onClick={updateStatus} loading={loading ? true : false}>Change Status</Button>
                            <Label as='a' color={`${currentItem?.category?.status?.value === 'active' ? 'teal' : 'grey'}`} className='!uppercase !text-[12px]' tag>
                                {currentItem?.category?.status?.value}
                            </Label>
                        </a>
                    </CardContent>
                </Card>
                <div className='w-full flex justify-center items-center'>
                    <Button color='facebook' onClick={handleOpenModalCreate} className='w-full !m-0 shadow-md'>
                        <Icon name='plus' /> Create
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default TableCategory