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

const AnalysisReturn = (month: any) => {

    const [loading, setLoading] = useState(true)
    const [data, setData] = useState([{ thumbnails: [{ link: '' }] }] as any)
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
            return b?.total - a?.total
        })
    }

    const init = async () => {
        const res = await OrderService.getOrderByShop(1, 200)
        if (res?.result) {
            let tmp: any = []
            res?.data?.forEach((item: any) => {
                if (item?.status?.value === 'cancel') {
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
                        <TableHeaderCell>CUSTOMER EMAIL</TableHeaderCell>
                        <TableHeaderCell>TOTAL ORDER</TableHeaderCell>
                        <TableHeaderCell>REASON</TableHeaderCell>
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
                                        <TableCell>{item?.profile?.email}</TableCell>
                                        <TableCell>${item?.total}</TableCell>
                                        <TableCell>{item?.desc}</TableCell>
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

export default AnalysisReturn