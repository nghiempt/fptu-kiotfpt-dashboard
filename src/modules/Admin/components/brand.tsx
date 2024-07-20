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
import { BrandService } from '../../../services/brand'
import ModalCreateBrand from '../modal/modal.create-brand'
import ModalUpdateBrand from '../modal/modal.update-brand'
import { toast } from 'react-semantic-toasts'

const TableBrand = () => {

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
        const status = currentItem?.status?.value === 'active' ? 'inactive' : 'active'
        const res = await BrandService.updateStatusBrand(currentItem?.brand_id, status)
        if (res?.result) {
            init()
            toast({
                type: 'success',
                icon: 'sync',
                title: 'Update Status Brand',
                description: 'Update status brand successfully',
                time: 1000,
            });
        } else {
            toast({
                type: 'error',
                icon: 'sync',
                title: 'Update Status Brand',
                description: 'Update status brand failed',
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

    const init = async () => {
        const res = await BrandService.getAllBrands()
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
            <ModalUpdateBrand open={openModalUpdate} setOpen={setOpenModalUpdate} currentItem={currentItem} setCurrentItem={setCurrentItem} initialData={init} />
            <ModalCreateBrand open={openModalCreate} setOpen={setOpenModalCreate} initialData={init} />
            <Table celled>
                <TableHeader>
                    <TableRow>
                        <TableHeaderCell>BRAND ID</TableHeaderCell>
                        <TableHeaderCell>BRAND NAME</TableHeaderCell>
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
                                        className={`${item?.brand_id === currentItem?.brand_id ? '!bg-gray-100' : ''} cursor-pointer`}
                                    >
                                        <TableCell>
                                            <Label ribbon>KTF-CAT-0{item?.brand_id}</Label>
                                        </TableCell>
                                        <TableCell className='flex items-center gap-4'>
                                            <Image src={item?.brand_thumbnail} size='mini' className='rounded-lg' /> {item?.brand_name}</TableCell>
                                        <TableCell>{item?.total_product}</TableCell>
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
                    <Image size='tiny' src={currentItem?.brand_thumbnail} wrapped ui={false} className='rounded-md' />
                    <CardContent>
                        <CardHeader>{currentItem?.brand_name}</CardHeader>
                        <CardMeta>
                            <span className='date'>July 15th 2024</span>
                        </CardMeta>
                        <CardDescription>
                            {currentItem?.total_product} products
                        </CardDescription>
                    </CardContent>
                    <CardContent extra>
                        <a className='flex justify-between items-center'>
                            <Button onClick={updateStatus} loading={loading ? true : false}>Change Status</Button>
                            <Label as='a' color={`${currentItem?.status?.value === 'active' ? 'teal' : 'grey'}`} className='!uppercase !text-[12px]' tag>
                                {currentItem?.status?.value}
                            </Label>
                        </a>
                    </CardContent>
                </Card>
                <div className='w-full flex justify-center items-center gap-2'>
                    <Button color='facebook' onClick={handleOpenModalCreate}>
                        <Icon name='plus' /> Create
                    </Button>
                    <Button color='google plus' onClick={handleOpenModalUpdate}>
                        <Icon name='edit' /> Update
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default TableBrand