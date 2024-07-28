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
    Rating,
} from 'semantic-ui-react'
import { StatisService } from '../../../services/statis'

const StatisticalReview = () => {

    const [loading, setLoading] = useState(true)
    const [data, setData] = useState([] as any)

    const init = async () => {
        const res = await StatisService.sellerStatisFeedback()
        if (res?.result) {
            setData(res?.data)
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
                        <TableHeaderCell>REVIEWER</TableHeaderCell>
                        <TableHeaderCell>PRODUCT</TableHeaderCell>
                        <TableHeaderCell>RATE</TableHeaderCell>
                        <TableHeaderCell>COMMENT</TableHeaderCell>
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
                            data?.slice(0, 5)?.map((item: any, index: any) => {
                                return (
                                    <TableRow
                                        key={index}
                                    >
                                        <TableCell>
                                            <div className='flex justify-start items-center gap-2'>
                                                <Image src={item?.comments[0]?.profile?.avatar} size='mini' className='rounded-lg' />
                                                {item?.comments[0]?.profile?.name}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className='flex justify-start items-center gap-4'>
                                                <Image src={item?.product?.thumbnail[0]?.link} size='mini' className='rounded-lg' />
                                                {item?.product?.name}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className='flex justify-center items-center gap-1'>
                                                {item?.comments[0]?.rate}
                                                <Rating icon='star' defaultRating={1} maxRating={1} />
                                            </div>
                                        </TableCell>
                                        <TableCell>{item?.comments[0]?.content}</TableCell>
                                    </TableRow>
                                )
                            })
                    }
                </TableBody>
            </Table>
        </div>
    )
}

export default StatisticalReview