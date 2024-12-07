import axios from "axios";

export const initiatePayment = async (paymentDetails) => {
  try {
    const response = await axios.post(
      "https://ftl-server.onrender.com/api/payments/initiate",
      paymentDetails,

      {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error initiating payment:", error.response || error.message);
    throw error.response ? error.response.data : error.message;
  }
};

// Function to check the payment status
export const checkPaymentStatus = async (reference) => {
  try {
    const response = await axios.get(
      `https://ftl-server.onrender.com/api/payments/status/${reference}`,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error checking payment status:",
      error.response || error.message
    );
    throw error.response ? error.response.data : error.message;
  }
};
