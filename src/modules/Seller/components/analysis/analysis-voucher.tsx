import { useEffect, useState } from 'react'
import {
    TableRow,
    TableHeaderCell,
    TableHeader,
    TableCell,
    TableBody,
    Label,
    Table,
    Loader,
    Image,
    Pagination
} from 'semantic-ui-react'
import { OrderService } from '../../../../services/order'

const AnalysisVoucher = (month: any) => {

    const [loading, setLoading] = useState(true)
    const [data, setData] = useState([] as any)
    const [currentData, setCurrentData] = useState([] as any)

    const loadDataByPage = async (data: any, page: number) => {
        const startIndex = (page - 1) * 3;
        const endIndex = page * 3;
        const currentData = data?.slice(startIndex, endIndex);
        return setCurrentData(currentData);
    };

    const handleChangePage = (e: any, page: number) => {
        loadDataByPage(data, page)
    }

    const sortProductPrice = (data: any) => {
        return data.sort((a: any, b: any) => {
            return b?.voucherValue - a?.voucherValue
        })
    }

    const init = async () => {
        const res = await OrderService.getOrderByShop(1, 200)
        if (res?.result) {
            let tmp: any = []
            res?.data?.forEach((item: any) => {
                if (item?.status?.value === 'completed') {
                    tmp.push(item)
                }
            })
            setData(tmp)
            loadDataByPage(tmp, 1)
            setLoading(false)
        }
    }

    useEffect(() => {
        init()
    }, [month])

    return (
        <div className='flex flex-col justify-center items-center gap-4'>
            <Table celled>
                <TableHeader>
                    <TableRow>
                        <TableHeaderCell>ORDER ID</TableHeaderCell>
                        <TableHeaderCell>PRODUCT</TableHeaderCell>
                        <TableHeaderCell>TOTAL ORDER</TableHeaderCell>
                        <TableHeaderCell>DISCOUNT</TableHeaderCell>
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
                            sortProductPrice(currentData)?.map((item: any, index: any) => {
                                return (
                                    <TableRow
                                        key={index}
                                    >
                                        <TableCell>
                                            <Label ribbon>#{item?.id}</Label>
                                        </TableCell>
                                        <TableCell>
                                            <div className='flex items-center gap-4'>
                                                <Image src={item?.product[0]?.thumbnail} size='mini' className='rounded-lg' />
                                                {item?.product[0]?.name}
                                            </div>
                                        </TableCell>
                                        <TableCell>${item?.total}</TableCell>
                                        <TableCell>{item?.voucherValue}%</TableCell>
                                    </TableRow>
                                )
                            })
                    }
                </TableBody>
            </Table>
            <Pagination
                defaultActivePage={1}
                firstItem={null}
                lastItem={null}
                pointing
                secondary
                totalPages={data?.length / 3}
                onPageChange={(e, { activePage }) => handleChangePage(e, activePage as number)}
            />
        </div>
    )
}

export default AnalysisVoucher