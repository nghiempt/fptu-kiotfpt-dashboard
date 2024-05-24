import { CssBaseline } from "@mui/material";
import ThemeProvider from "./themes/ThemeProvider";
import RootRoutes from "./routes/routes";

function App() {
  return (
    <ThemeProvider>
      <CssBaseline />
      <div className="">
        <RootRoutes />
      </div>
    </ThemeProvider>
  );
}
export default App;
