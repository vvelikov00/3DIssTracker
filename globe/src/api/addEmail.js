import axios from "axios";

export const addEmail = async (data) => {
  console.log(data);
  try {
    const response = await axios.post(
      "http://localhost:8080/notifications/addEmail",
      {
        email: data.email,
        latitude: data.latitude,
        longitude: data.longitude,
      }
    );
    return response;
  } catch (error) {
    return error.response;
  }
};
