import { useEffect, useState } from 'react'
import {
    TableRow,
    TableHeaderCell,
    TableHeader,
    TableCell,
    TableBody,
    Table,
    Loader,
    Pagination,
} from 'semantic-ui-react'
import { ShopStatisService } from '../../../../services/shop-statis'
import { StatisService } from '../../../../services/statis'

const AnalysisRevenue = (month: any) => {

    const [loading, setLoading] = useState(true)
    const [data, setData] = useState([] as any)
    const [currentData, setCurrentData] = useState([] as any)

    const loadDataByPage = async (data: any, page: number) => {
        const startIndex = (page - 1) * 5;
        const endIndex = page * 5;
        const currentData = data?.slice(startIndex, endIndex);
        return setCurrentData(currentData);
    };

    const handleChangePage = (e: any, page: number) => {
        loadDataByPage(data, page)
    }

    function getMonthName(monthNumber: any) {
        let monthName;
        switch (monthNumber) {
            case 1:
                monthName = "January";
                break;
            case 2:
                monthName = "February";
                break;
            case 3:
                monthName = "March";
                break;
            case 4:
                monthName = "April";
                break;
            case 5:
                monthName = "May";
                break;
            case 6:
                monthName = "June";
                break;
            case 7:
                monthName = "July";
                break;
            case 8:
                monthName = "August";
                break;
            case 9:
                monthName = "September";
                break;
            case 10:
                monthName = "October";
                break;
            case 11:
                monthName = "November";
                break;
            case 12:
                monthName = "December";
                break;
            default:
                monthName = "Invalid month number";
        }
        return monthName;
    }

    const init = async () => {
        const res = await StatisService.getStatisRevenueAll()
        if (res?.statusCode === '200') {
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
                            currentData?.map((item: any, index: any) => {
                                return (
                                    <TableRow
                                        key={index}
                                    >
                                        <TableCell>{getMonthName(item?.month)}</TableCell>
                                        <TableCell>${item?.totalMoneyOfAllOrders}</TableCell>
                                        <TableCell>{item?.totalOrder} orders</TableCell>
                                        <TableCell>{item?.totalVariant} products</TableCell>
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
                totalPages={data?.length / 5}
                onPageChange={(e, { activePage }) => handleChangePage(e, activePage as number)}
            />
        </div>
    )
}

export default AnalysisRevenue