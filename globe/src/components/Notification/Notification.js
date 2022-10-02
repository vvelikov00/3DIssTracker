import {
  Alert,
  Box,
  Button,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { addEmail } from "../../api/addEmail";

export const Notification = () => {
  const [position, setPostition] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const successCallback = (position) => {
    setPostition(position);
  };

  const errorCallback = (error) => {
    console.log(error);
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      email: e.target.email.value,
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    };
    const response = await addEmail(data);
    if (response.status >= 400) {
      setError(response.data);
    }
    if (response.status === 200) {
      setMessage("Email added successfully!");
    }
  };

  const handleClose = () => {
    setMessage("");
    setError("");
  };

  return (
    <>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography sx={{ color: "#ededed" }}>
          Sign up for ISS flyover alerts
        </Typography>
        <TextField
          type="email"
          id="email"
          label="Email"
          InputLabelProps={{ style: { color: "#ededed" } }}
          inputProps={{ style: { color: "#ededed" } }}
          sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#ededed",
              },
              "&:hover fieldset": {
                borderColor: "#ededed",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#4377e8",
              },
            },
            mt: 1,
          }}
        />
        <Button
          variant="contained"
          type="submit"
          sx={{
            borderRadius: 5,
            marginTop: 2,
            width: "max-content",
            alignSelf: "end",
          }}
        >
          Sign up
        </Button>
      </Box>

      <Snackbar
        open={Boolean(message)}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>

      <Snackbar
        open={Boolean(error)}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          {error}
        </Alert>
      </Snackbar>
    </>
  );
};
