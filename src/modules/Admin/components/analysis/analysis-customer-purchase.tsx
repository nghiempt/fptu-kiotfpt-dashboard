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
} from 'semantic-ui-react'
import { ShopStatisService } from '../../../../services/shop-statis'

const AnalysisCustomerPurchase = (month: any) => {

    const [loading, setLoading] = useState(true)
    const [data, setData] = useState([] as any)

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
                            data?.map((item: any, index: any) => {
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
        </div>
    )
}

export default AnalysisCustomerPurchase