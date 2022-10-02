import { Box } from "@mui/material";
import { Globe } from "./components/Globe";
import { Navbar } from "./components/Navbar";
import { SocketContext, socket } from "./context/socket";

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
      <SocketContext.Provider value={socket}>
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
      </SocketContext.Provider>
    </div>
  );
}

export default App;
