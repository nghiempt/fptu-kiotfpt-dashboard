import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { Card, CardContent, Typography, ButtonGroup, Button, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Bar } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import dayjs, { Dayjs } from 'dayjs';

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
interface AdminTableProps {
  data: any[];
}

const TableStatistical: React.FC<AdminTableProps> = ({ data: initialData }) => {

  const [data, setData] = useState(initialData);

  useEffect(() => {
    setData(initialData);
  }, [initialData]);

  type Order = {
    id: number;
    date: string;
    amount: number;
    status: string; // e.g., "completed"
    products: { name: string; quantity: number }[];
  };
  
  const orders: Order[] = [
    { id: 1, date: '2024-06-20', amount: 100, status: 'completed', products: [{ name: 'Product 1', quantity: 2 }] },
    { id: 2, date: '2024-06-21', amount: 150, status: 'completed', products: [{ name: 'Product 2', quantity: 3 }] },
    // Add more orders as needed
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
    const topProducts = getTopProducts(filteredOrders);

  return (
    <Box>
      <Box sx={{ marginBottom: "20px", marginTop: "10px", marginLeft: "20px", marginRight: "20px" }}>
        <Typography variant="h3" noWrap component="div" sx={{ flexGrow: 1 }}>
          <b>STATISTICAL MANAGEMENT</b>
        </Typography>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="min-h-screen bg-gray-100 p-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="col-span-1 md:col-span-2 mb-4">
          <Typography variant="h5" className="mb-2">Filter by Time</Typography>
          <ButtonGroup variant="contained" className="mr-4">
            <Button onClick={() => setFilter('day')}>Day</Button>
            <Button onClick={() => setFilter('month')}>Month</Button>
            <Button onClick={() => setFilter('year')}>Year</Button>
          </ButtonGroup>
          <DatePicker
            label={`Select ${filter}`}
            views={filter === 'day' ? ['year', 'month', 'day'] : filter === 'month' ? ['year', 'month'] : ['year']}
            value={selectedDate}
            onChange={(newValue) => setSelectedDate(newValue)}
          />
        </div>
        
        <Card className="bg-white shadow-md rounded p-4 mb-4">
          <CardContent>
            <Typography variant="h6">Total order</Typography>
            <Typography variant="h4">{totalOrders}</Typography>
            <Bar data={getChartData(filteredOrders, 'Total Orders')} />
          </CardContent>
        </Card>
        
        <Card className="bg-white shadow-md rounded p-4 mb-4">
          <CardContent>
            <Typography variant="h6">Total Revenue</Typography>
            <Typography variant="h4">${totalRevenue.toLocaleString()}</Typography>
            <Bar data={getChartData(filteredOrders, 'Total Revenue')} />
          </CardContent>
        </Card>
        
        <Card className="bg-white shadow-md rounded p-4 mb-4">
          <CardContent>
            <Typography variant="h6">Top best selling products</Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Product</TableCell>
                    <TableCell align="right">Quantity</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {topProducts.map((product, index) => (
                    <TableRow key={index}>
                      <TableCell component="th" scope="row">{product.name}</TableCell>
                      <TableCell align="right">{product.quantity}</TableCell>
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
