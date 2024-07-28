import StatisticalRevenue from './statistical-revenue'
import StatisticalOrder from './statistical-order'
import StatisticalCustomer from './statistical-customer'
import StatisticalReview from './statistical-review'
import StatisticalProduct from './statistical-product'

const TableStatistical = () => {

    return (
        <div className='w-full flex flex-col gap-4'>
            <div className='w-full grid grid-cols-3 gap-4'>
                <StatisticalOrder />
                <StatisticalRevenue />
                <StatisticalCustomer />
            </div>
            <div className='w-full grid grid-cols-2 gap-10'>
                <StatisticalReview />
                <StatisticalProduct />
            </div>
        </div>
    )
}

export default TableStatistical