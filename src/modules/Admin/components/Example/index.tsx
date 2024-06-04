import { Box, Divider, Typography } from "@mui/material";
import { useEffect, useState } from "react";

interface AdminTableProps {
  data: any[];
}

const TableExample: React.FC<AdminTableProps> = ({ data: initialData }) => {

  const [data, setData] = useState(initialData);

  useEffect(() => {
    setData(initialData);
  }, [initialData]);

  return (
    <Box>
      <Box sx={{ marginBottom: "20px", marginTop: "20px", marginLeft: "20px" }}>
        <Typography variant="h3" noWrap component="div" sx={{ flexGrow: 1 }}>
          <b>ADMIN MANAGEMENT</b>
        </Typography>
      </Box>
      <Divider />
    </Box>
  );
};

export default TableExample;
