import { Box } from "@mui/material";
import { Globe } from "./components/Globe";
import { Navbar } from "./components/Navbar";

function App() {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "start",
        alignItems: "end",
        background: "#0f0f0f",
      }}
    >
      <Navbar />
      <Box
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "end",
        }}
      >
        <Globe />
      </Box>
    </div>
  );
}

export default App;
