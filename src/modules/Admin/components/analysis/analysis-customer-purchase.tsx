import { useEffect, useState } from 'react'
import {
    TableRow,
    TableHeaderCell,
    TableHeader,
    TableCell,
    TableBody,
    Table,
    Loader,
    Image,
    Pagination,
} from 'semantic-ui-react'
import { ShopStatisService } from '../../../../services/shop-statis'

const AnalysisCustomerPurchase = (month: any) => {

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

    const calculateAverage = (data: any) => {
        let total = 0
        data?.forEach((item: any) => {
            total += item
        })
        return Math.ceil(total / data?.length)
    }

    const init = async () => {
        const res = await ShopStatisService.getStatisCustomer()
        if (res?.result) {
            setData(res?.data)
            loadDataByPage(res?.data, 1)
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
                        <TableHeaderCell>CUSTOMER NAME</TableHeaderCell>
                        <TableHeaderCell>CUSTOMER EMAIL</TableHeaderCell>
                        <TableHeaderCell>TOTAL ORDER</TableHeaderCell>
                        <TableHeaderCell>AVERAGE SPENT</TableHeaderCell>
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
                                    >
                                        <TableCell>
                                            <div className='flex items-center gap-4'>
                                                <Image src={item?.avatar} size='mini' className='rounded-lg' />
                                                {item?.name}
                                            </div>
                                        </TableCell>
                                        <TableCell>{item?.email}</TableCell>
                                        <TableCell>{item?.orderTotals?.length} orders</TableCell>
                                        <TableCell>${calculateAverage(item?.orderTotals)}</TableCell>
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

export default AnalysisCustomerPurchase