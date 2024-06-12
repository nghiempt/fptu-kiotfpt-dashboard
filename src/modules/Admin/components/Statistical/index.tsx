import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";

interface AdminTableProps {
  data: any[];
}

const TableStatistical: React.FC<AdminTableProps> = ({ data: initialData }) => {

  const [data, setData] = useState(initialData);

  useEffect(() => {
    setData(initialData);
  }, [initialData]);

  return (
    <Box>
      <Box sx={{ marginBottom: "20px", marginTop: "10px", marginLeft: "20px", marginRight: "20px" }}>
        <Typography variant="h3" noWrap component="div" sx={{ flexGrow: 1 }}>
          <b>STATISTICAL MANAGEMENT</b>
        </Typography>

      </Box>
    </Box>
  );
};

export default TableStatistical;
