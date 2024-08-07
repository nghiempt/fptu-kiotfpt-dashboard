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
    Image
} from 'semantic-ui-react'
import { StatisService } from '../../../../services/statis'

const StatisticalProduct = (month: any) => {

    const [loading, setLoading] = useState(true)
    const [data, setData] = useState([{ thumbnails: [{ link: '' }] }] as any)

    const init = async () => {
        const payload = {
            month: month?.month,
            year: 2024
        }
        const res = await StatisService.sellerStatisProduct(payload)
        if (res?.result) {
            setData(res?.data?.products)
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
                        <TableHeaderCell>PRODUCT ID</TableHeaderCell>
                        <TableHeaderCell>PRODUCT NAME</TableHeaderCell>
                        <TableHeaderCell>TOTAL SALES</TableHeaderCell>
                        <TableHeaderCell>TOTAL MONEY</TableHeaderCell>
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
                                            <Label ribbon>KTF-CAT-0{item?.id}</Label>
                                        </TableCell>
                                        <TableCell>
                                            <div className='flex items-center gap-4'>
                                                <Image src={item?.thumbnails[0]?.link} size='mini' className='rounded-lg' />
                                                {item?.name}
                                            </div>
                                        </TableCell>
                                        <TableCell>{item?.bought_quantity} items</TableCell>
                                        <TableCell>${item?.total}</TableCell>
                                    </TableRow>
                                )
                            })
                    }
                </TableBody>
            </Table>
        </div>
    )
}

export default StatisticalProduct