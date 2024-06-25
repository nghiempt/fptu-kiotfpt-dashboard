import { Box, Typography, Card, CardContent, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, Avatar } from "@mui/material";
import { useEffect, useState } from "react";
import { Bar } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import dayjs, { Dayjs } from 'dayjs';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { StatisService } from "../../../../services/statis";

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface SellerTableProps {
  data: any[];
}

const TableStatistical: React.FC<SellerTableProps> = ({ data: initialData }) => {

  const [data, setData] = useState(initialData);

  useEffect(() => {
    setData(initialData);
  }, [initialData]);

  type Order = {
    id: number;
    date: string;
    amount: number;
    status: string;
    products: { name: string; quantity: number }[];
    customer: { name: string };
  };

  type Review = {
    product: string;
    review: string;
  };

  const orders: Order[] = [
    { id: 1, date: '2024-06-20', amount: 100, status: 'completed', products: [{ name: 'Product 1', quantity: 2 }], customer: { name: 'Customer 1' } },
    { id: 2, date: '2024-06-21', amount: 150, status: 'completed', products: [{ name: 'Product 2', quantity: 3 }], customer: { name: 'Customer 2' } },
    { id: 3, date: '2024-06-22', amount: 450, status: 'completed', products: [{ name: 'Product 2', quantity: 3 }], customer: { name: 'Customer 2' } },
    { id: 4, date: '2024-06-23', amount: 50, status: 'completed', products: [{ name: 'Product 2', quantity: 3 }], customer: { name: 'Customer 2' } },
    { id: 5, date: '2024-06-24', amount: 110, status: 'completed', products: [{ name: 'Product 2', quantity: 3 }], customer: { name: 'Customer 2' } },
  ];

  const reviews: Review[] = [
    { product: 'Product 1', review: 'Great product!' },
    { product: 'Product 2', review: 'Very satisfied!' },
    { product: 'Product 3', review: 'Good value for money.' },
  ];

  const filterOrders = (orders: Order[], filter: string, selectedDate: Dayjs | null) => {
    if (!selectedDate) return [];
    if (filter === 'day') {
      return orders.filter(order => dayjs(order.date).isSame(selectedDate, 'day') && order.status === 'completed');
    } else if (filter === 'month') {
      return orders.filter(order => dayjs(order.date).isSame(selectedDate, 'month') && order.status === 'completed');
    } else if (filter === 'year') {
      return orders.filter(order => dayjs(order.date).isSame(selectedDate, 'year') && order.status === 'completed');
    }
    return orders;
  };

  const getTopProducts = (orders: Order[]) => {
    const productSales: { [key: string]: number } = {};
    orders.forEach(order => {
      if (order.status === 'completed') {
        order.products.forEach(product => {
          if (!productSales[product.name]) {
            productSales[product.name] = 0;
          }
          productSales[product.name] += product.quantity;
        });
      }
    });
    return Object.keys(productSales).map(product => ({
      name: product,
      quantity: productSales[product],
    })).sort((a, b) => b.quantity - a.quantity);
  };

  const getLoyalCustomers = (orders: Order[]) => {
    const customerSpending: { [key: string]: number } = {};
    orders.forEach(order => {
      if (order.status === 'completed') {
        if (!customerSpending[order.customer.name]) {
          customerSpending[order.customer.name] = 0;
        }
        customerSpending[order.customer.name] += order.amount;
      }
    });
    return Object.keys(customerSpending).map(customer => ({
      name: customer,
      totalSpent: customerSpending[customer],
    })).sort((a, b) => b.totalSpent - a.totalSpent);
  };

  const getChartData = (orders: Order[], label: string) => {
    const data = orders.reduce((acc, order) => {
      const date = new Date(order.date).toDateString();
      if (!acc[date]) {
        acc[date] = 0;
      }
      acc[date] += order.amount;
      return acc;
    }, {} as { [key: string]: number });
    return {
      labels: Object.keys(data),
      datasets: [
        {
          label,
          data: Object.values(data),
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
        },
      ],
    };
  };

  const [filter, setFilter] = useState<string>('day');
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(dayjs());

  const filteredOrders = filterOrders(orders, filter, selectedDate);
  const totalOrders = filteredOrders.length;
  const totalRevenue = filteredOrders.reduce((sum, order) => sum + order.amount, 0);
  const [topProducts, setTopProducts] = useState([] as any);
  const [loyalCustomers, setLoyalCustomers] = useState([] as any);

  const getShopRevenueViaTime = async () => {
    const payload = {
      day: 0,
      month: 6,
      year: 2024
    }
    const reven = await StatisService.getShopRevenueByTime(10, payload);
    console.log(reven);
  }

  const getShopTopProductViaTime = async () => {
    const payload = {
      day: 0,
      month: 6,
      year: 2024
    }
    const topP = await StatisService.getShopTopProductByTime(10, payload);
    if (topP?.result) {
      setTopProducts(topP?.data?.products)
    }
  }

  const getLoyalCus = async () => {
    const topP = await StatisService.getLoyalCustomer();
    if (topP?.result) {
      setLoyalCustomers(topP?.data)
    }
  }

  useEffect(() => {
    setFilter('month')
    getShopTopProductViaTime()
    getLoyalCus()
  }, []);

  return (
    <Box>
      <Box sx={{ marginBottom: "20px", marginTop: "10px", marginLeft: "20px", marginRight: "20px" }}>
        <Typography variant="h3" noWrap component="div" sx={{ flexGrow: 1 }}>
          <b>STATISTICAL MANAGEMENT</b>
        </Typography>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <div className="w-full flex justify-between items-center px-8 box-border mt-8">
            <div className="flex justify-center items-center gap-4">
              <button onClick={() => setFilter('day')} className="hover:bg-blue-200 border border-2 text-[rgb(var(--quaternary-rgb))] font-bold border-[rgb(var(--quaternary-rgb))] px-4 py-3 rounded-lg">Current Day</button>
              <button onClick={() => setFilter('month')} className="hover:bg-blue-200 border border-2 text-[rgb(var(--quaternary-rgb))] font-bold border-[rgb(var(--quaternary-rgb))] px-4 py-3 rounded-lg">Current Month</button>
              <button onClick={() => setFilter('year')} className="hover:bg-blue-200 border border-2 text-[rgb(var(--quaternary-rgb))] font-bold border-[rgb(var(--quaternary-rgb))] px-4 py-3 rounded-lg">Current Year</button>
            </div>
            <DatePicker
              label={`Select ${filter}`}
              views={filter === 'day' ? ['year', 'month', 'day'] : filter === 'month' ? ['year', 'month'] : ['year']}
              value={selectedDate}
              onChange={(newValue) => setSelectedDate(newValue)}
            />
          </div>
          <div className="min-h-screen bg-gray-100 p-8 grid grid-cols-2 gap-4">
            <Card className="bg-white shadow-md rounded p-4">
              <CardContent>
                <h1 className="text-[18px] font-semibold">Total Orders: <span className="px-2 py-1 bg-red-500 text-white rounded-lg">{totalOrders}</span></h1>
                <Bar data={getChartData(filteredOrders, 'Total Orders')} />
              </CardContent>
            </Card>
            <Card className="bg-white shadow-md rounded p-4">
              <CardContent>
                <h1 className="text-[18px] font-semibold">Total Revenue: <span className="px-2 py-1 bg-red-500 text-white rounded-lg">${totalRevenue.toLocaleString()}</span></h1>
                <Bar data={getChartData(filteredOrders, 'Total Revenue')} />
              </CardContent>
            </Card>
            <Card className="bg-white shadow-md rounded p-4">
              <CardContent>
                <h1 className="text-[18px] font-semibold mb-4">Loyal Customers</h1>
                <TableContainer component={Paper}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Phone</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell align="center">Total spending</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {loyalCustomers?.slice(0, 5)?.map((customer: any, index: any) => (
                        <TableRow key={index}>
                          <TableCell component="th" scope="row">
                            <div className="flex justify-start items-center gap-2">
                              <Avatar src={customer?.avatar} />
                              <h1>{customer?.name}</h1>
                            </div>
                          </TableCell>
                          <TableCell>{customer?.phone}</TableCell>
                          <TableCell>{customer?.email}</TableCell>
                          <TableCell align="center">${customer?.totalSpent}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
            <Card className="bg-white shadow-md rounded p-4">
              <CardContent>
                <h1 className="text-[18px] font-semibold mb-4">Top Best Selling Products</h1>
                <TableContainer component={Paper}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Product</TableCell>
                        <TableCell>Price</TableCell>
                        <TableCell align="center">Quantity</TableCell>
                        <TableCell align="center">Total</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {topProducts.map((product: any, index: any) => (
                        <TableRow key={index}>
                          <TableCell component="th" scope="row">
                            <div className="flex justify-start items-center gap-2">
                              <Avatar src="https://cdn-icons-png.flaticon.com/128/679/679821.png" />
                              <h1>{product?.name}</h1>
                            </div>
                          </TableCell>
                          <TableCell>${product?.variant?.price}</TableCell>
                          <TableCell align="center">{product?.bought_quantity}</TableCell>
                          <TableCell align="center">
                            <h1 className="px-2 py-1 bg-red-500 text-white font-semibold rounded-lg">{product?.total}</h1>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
            <Card className="bg-white shadow-md rounded p-4">
              <CardContent>
                <h1 className="text-[18px] font-semibold mb-4">Review Product</h1>
                <TableContainer component={Paper}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Product</TableCell>
                        <TableCell>Price</TableCell>
                        <TableCell>Rate</TableCell>
                        <TableCell align="center">Review</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {reviews.map((review, index) => (
                        <TableRow key={index}>
                          <TableCell component="th" scope="row">
                            <div className="flex justify-start items-center gap-2">
                              <Avatar src="https://cdn-icons-png.flaticon.com/128/679/679821.png" />
                              <h1>{review.product}</h1>
                            </div>
                          </TableCell>
                          <TableCell>$89.09</TableCell>
                          <TableCell>5 stars</TableCell>
                          <TableCell align="center">{review.review}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </div>
        </LocalizationProvider>
      </Box>
    </Box>
  );
};

export default TableStatistical;
