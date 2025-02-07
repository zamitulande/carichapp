import { Container, ThemeProvider, useMediaQuery } from "@mui/material"
import Dashboard from "./components/Dashboard"
import Header from "./components/Header"
import { getTheme } from "./config/Theme"

function App() {

  const isMobile = useMediaQuery("(max-width:600px)");

  const content = (
    <ThemeProvider theme={getTheme}>
      <Header />
      <Dashboard />
    </ThemeProvider>
  );
  
  return isMobile ? content : <Container>{content}</Container>;
}

export default App
