import { Divider, Header } from "semantic-ui-react"
import AnalysisProduct from "./analysis-product"
import AnalysisRevenue from "./analysis-revenue"
import AnalysisCustomerPurchase from "./analysis-customer-purchase"
import AnalysisReview from "./analysis-review"

const TableAnalysis = () => {

    return (
        <div className='w-full flex flex-col'>
            <Header as='h2'>Sales Performance Analysis</Header>
            <div className='w-full grid grid-cols-2 gap-10 mb-6'>
                <div className="flex flex-col gap-4">
                    <div>
                        <Header as='h3' className="!m-0">Revenue Trends</Header>
                        <div className="font-medium mt-1">Show revenue over time</div>
                    </div>
                    <AnalysisRevenue month={7} />
                </div>
                <div className="flex flex-col gap-4">
                    <div>
                        <Header as='h3' className="!m-0">Product Performance</Header>
                        <div className="font-medium mt-1">Identify top-selling and underperforming products</div>
                    </div>
                    <AnalysisProduct month={7} />
                </div>
            </div>
            <Divider />
            <Header as='h2'>Customer Behavior Analysis</Header>
            <div className='w-full grid grid-cols-2 gap-10 mb-6'>
                <div className="flex flex-col gap-4">
                    <div>
                        <Header as='h3' className="!m-0">Purchase Patterns</Header>
                        <div className="font-medium mt-1">Analyze customer purchase frequency and average order value.</div>
                    </div>
                    <AnalysisCustomerPurchase month={7} />
                </div>
                <div className="flex flex-col gap-4">
                    <div>
                        <Header as='h3' className="!m-0">Customer Segmentation</Header>
                        <div className="font-medium mt-1">Divide customers based on purchase behavior to adjust marketing campaigns.</div>
                    </div>
                    <AnalysisReview />
                </div>
            </div>
        </div>
    )
}

export default TableAnalysis