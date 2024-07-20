import StatisticalRevenue from './statistical-revenue'
import StatisticalOrder from './statistical-order'
import StatisticalProduct from './statistical-product'

const TableStatistical = () => {

    return (
        <div className='w-full flex flex-col gap-4'>
            <div className='w-full flex grid grid-cols-3 gap-4'>
                <StatisticalOrder />
                <StatisticalRevenue />
                <StatisticalProduct />
            </div>
        </div>
    )
}

export default TableStatistical