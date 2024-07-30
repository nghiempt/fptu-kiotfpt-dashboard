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
    Rating,
    CardDescription,
} from 'semantic-ui-react'
import { ProductService } from '../../../services/product'
import ModalUpdateProduct from '../modal/modal.update-product'
import ModalCreateProduct from '../modal/modal.create-product'
import { toast } from 'react-semantic-toasts'

const TableProduct = () => {

    const [loading, setLoading] = useState(true)
    const [data, setData] = useState([] as any)
    const [currentPage, setCurrentPage] = useState(1)
    const [currentItem, setCurrentItem] = useState({ thumbnail: [{ link: '' }], variants: [{ quantity: 0, color: { value: '' }, size: { value: '' } }] } as any)

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
        getDataByPage(page)
    }

    const updateStatus = async () => {
        setLoading(true)
        const payload = currentItem?.status?.value === 'active' ? 'inactive' : 'active'
        const res = await ProductService.updateStatusProduct(currentItem?.id, payload)
        if (res?.result) {
            init()
            toast({
                type: 'success',
                icon: 'sync',
                title: 'Update Status Product',
                description: 'Update status product successfully',
                time: 1000,
            });
        } else {
            toast({
                type: 'error',
                icon: 'sync',
                title: 'Update Status Product',
                description: 'Update status product failed',
                time: 1000,
            });
        }
        setLoading(false)
    }

    const renderAmountPage = () => {
        let amount = []
        for (let i = 1; i <= data?.totalPage; i++) {
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

    const getDataByPage = async (page: any) => {
        setLoading(true)
        const res = await ProductService.getProductByShop(page, 12)
        if (res?.result) {
            setData(res?.data)
            setCurrentItem(res?.data?.products[0])
            setLoading(false)
        }
    }

    const init = async () => {
        getDataByPage(currentPage)
    }

    useEffect(() => {
        init()
    }, [])

    return (
        <div className='flex justify-center items-start gap-4'>
            <ModalUpdateProduct open={openModalUpdate} setOpen={setOpenModalUpdate} currentItem={currentItem} setCurrentItem={setCurrentItem} initialData={init} />
            <ModalCreateProduct open={openModalCreate} setOpen={setOpenModalCreate} initialData={init} />
            <Table celled className=''>
                <TableHeader>
                    <TableRow>
                        <TableHeaderCell>PRODUCT ID</TableHeaderCell>
                        <TableHeaderCell>PRODUCT NAME</TableHeaderCell>
                        <TableHeaderCell>BRAND</TableHeaderCell>
                        <TableHeaderCell>CATEGORY</TableHeaderCell>
                        <TableHeaderCell>RATE</TableHeaderCell>
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
                            data?.products?.map((item: any, index: any) => {
                                return (
                                    <TableRow
                                        key={index}
                                        onClick={() => setCurrentItem(item)}
                                        className={`${item?.id === currentItem?.id ? '!bg-gray-100' : ''} cursor-pointer`}
                                    >
                                        <TableCell>
                                            <Label ribbon>KTF-CAT-0{item?.id}</Label>
                                        </TableCell>
                                        <TableCell className='flex items-center gap-4'>
                                            <Image src={renderImage(item?.thumbnail[0]?.link)} size='mini' className='rounded-lg' />
                                            {item?.name}
                                        </TableCell>
                                        <TableCell>
                                            {item?.brand?.brand_name}
                                        </TableCell>
                                        <TableCell>
                                            {item?.category?.name}
                                        </TableCell>
                                        <TableCell>
                                            {item?.rate} <Rating icon='star' defaultRating={1} maxRating={1} className='ml-1' />
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
                        <TableHeaderCell colSpan='6'>
                            <Menu floated='right' pagination>
                                <MenuItem as='a' icon>
                                    <Icon name='chevron left' />
                                </MenuItem>
                                {
                                    renderAmountPage()?.map((item: any, index: any) => {
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
                    <Image size='tiny' src={renderImage(currentItem?.thumbnail[0]?.link)} wrapped ui={false} className='rounded-md' />
                    <CardContent>
                        <CardHeader>{currentItem?.name}</CardHeader>
                        <CardMeta>
                            <span className='date'>{currentItem?.description}</span>
                        </CardMeta>
                        <CardDescription className='!text-[12px]'>
                            <strong>Quantity: </strong>{currentItem?.variants[0]?.quantity}
                        </CardDescription>
                        <CardDescription className='!text-[12px]'>
                            <strong>Discount: </strong>{currentItem?.discount}%
                        </CardDescription>
                        <CardDescription className='!text-[12px]'>
                            <strong>Price: </strong>${currentItem?.minPrice}
                        </CardDescription>
                        <CardDescription className='!text-[12px]'>
                            <strong>Color: </strong>{currentItem?.variants[0]?.color?.value}
                        </CardDescription>
                        <CardDescription className='!text-[12px]'>
                            <strong>Size: </strong>{currentItem?.variants[0]?.size?.value}
                        </CardDescription>
                        <div className='w-full grid grid-cols-4 gap-2 mt-2'>
                            <Button color={`${currentItem?.bestSeller ? 'teal' : 'grey'}`} onClick={handleOpenModalCreate} className='!w-full !m-0 !py-1 !px-0 !text-[12px]'>
                                B.Seller
                            </Button>
                            <Button color={`${currentItem?.topDeal ? 'teal' : 'grey'}`} onClick={handleOpenModalUpdate} className='!w-full !m-0 !py-1 !px-0 !text-[12px]'>
                                T.Deal
                            </Button>
                            <Button color={`${currentItem?.popular ? 'teal' : 'grey'}`} onClick={handleOpenModalCreate} className='!w-full !m-0 !py-1 !px-0 !text-[12px]'>
                                Popular
                            </Button>
                            <Button color={`${currentItem?.official ? 'teal' : 'grey'}`} onClick={handleOpenModalUpdate} className='!w-full !m-0 !py-1 !px-0 !text-[12px]'>
                                Official
                            </Button>
                        </div>
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

export default TableProduct