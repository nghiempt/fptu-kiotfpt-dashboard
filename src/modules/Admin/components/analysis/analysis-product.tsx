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
import { StatisService } from '../../../../services/statis'

const AnalysisProduct = (month: any) => {

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
        const payload = {
            month: month?.month,
            year: 2024
        }
        const res = await StatisService.sellerStatisProduct(payload)
        if (res?.result) {
            setData(res?.data?.products)
            loadDataByPage(res?.data?.products, 1)
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
                        <TableHeaderCell>PRODUCT ID</TableHeaderCell>
                        <TableHeaderCell>PRODUCT NAME</TableHeaderCell>
                        <TableHeaderCell>SHOP</TableHeaderCell>
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
                                                <Image src={item?.thumbnails[0]?.link} size='mini' className='rounded-lg' />
                                                {item?.name}
                                            </div>
                                        </TableCell>
                                        <TableCell>{item?.shop?.name}</TableCell>
                                        <TableCell>${item?.total}</TableCell>
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

export default AnalysisProduct