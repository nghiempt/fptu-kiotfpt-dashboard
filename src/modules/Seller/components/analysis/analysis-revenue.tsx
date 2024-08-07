import { useEffect, useState } from 'react'
import {
    TableRow,
    TableHeaderCell,
    TableHeader,
    TableCell,
    TableBody,
    Table,
    Loader,
} from 'semantic-ui-react'
import { ShopStatisService } from '../../../../services/shop-statis'

const AnalysisRevenue = (month: any) => {

    const [loading, setLoading] = useState(true)
    const [data, setData] = useState([] as any)

    const init = async () => {
        const payload = {
            month: 7,
            year: 2024
        }
        const res = await ShopStatisService.getStatisRevenue(payload)
        if (res?.statusCode === '200') {
            setData([res?.data])
            setLoading(false)
        }
    }

    useEffect(() => {
        init()
    }, [month])

    return (
        <div className='flex justify-center items-start gap-4'>
            <Table celled>
                <TableHeader>
                    <TableRow>
                        <TableHeaderCell>MONTH</TableHeaderCell>
                        <TableHeaderCell>REVENUE</TableHeaderCell>
                        <TableHeaderCell>TOTAL ORDER</TableHeaderCell>
                        <TableHeaderCell>TOTAL PRODUCT</TableHeaderCell>
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
                            data?.map((item: any, index: any) => {
                                return (
                                    <TableRow
                                        key={index}
                                    >
                                        <TableCell>July</TableCell>
                                        <TableCell>${item?.totalMoneyOfAllOrders}</TableCell>
                                        <TableCell>{item?.totalOrder} orders</TableCell>
                                        <TableCell>{item?.totalOrder} products</TableCell>
                                    </TableRow>
                                )
                            })
                    }
                </TableBody>
            </Table>
        </div>
    )
}

export default AnalysisRevenue