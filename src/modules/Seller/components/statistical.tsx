import StatisticalRevenue from './statistical-revenue'
import StatisticalOrder from './statistical-order'
import StatisticalCustomer from './statistical-customer'
import StatisticalReview from './statistical-review'
import StatisticalProduct from './statistical-product'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useState } from 'react'
import { Divider } from 'semantic-ui-react'

const TableStatistical = () => {

    const [startDate, setStartDate] = useState<Date | null>(new Date());
    const [month, setMonth] = useState(7);

    const handleFilter = (date: Date | null) => {
        setStartDate(date)
        setMonth(getMonth(date) || 0);
    }

    const getMonth = (date: Date | null) => {
        return date ? date.getMonth() + 1 : null;
    };

    return (
        <div className='w-full flex flex-col gap-4'>
            <div className='w-full flex justify-start items-center gap-4 text-[18px]'>
                <div className='font-bold'>Select Date: </div>
                <DatePicker
                    selected={startDate}
                    onChange={handleFilter}
                    showMonthYearPicker
                    dateFormat="MM/yyyy"
                />
            </div>
            <Divider className='!m-0' />
            <div className='w-full grid grid-cols-3 gap-4'>
                <StatisticalOrder month={month} />
                <StatisticalRevenue month={month} />
                <StatisticalCustomer />
            </div>
            <div className='w-full grid grid-cols-2 gap-10'>
                <StatisticalReview />
                <StatisticalProduct month={month} />
            </div>
        </div>
    )
}

export default TableStatistical