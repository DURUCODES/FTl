import React, { useState, useEffect } from "react";
import { useAuth } from "../../ContextAuth/ContextAuth";
import axios from "axios";
import { Pie } from "react-chartjs-2";
import { RingLoader } from "react-spinners";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useNavigate } from "react-router-dom"; // Import useNavigate

// Register the required chart.js elements
ChartJS.register(ArcElement, Tooltip, Legend);

const OrderHistory = () => {
  const [orderHistory, setOrderHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { token } = useAuth();
  const navigate = useNavigate(); // Initialize navigate hook

  useEffect(() => {
    if (token) {
      const fetchOrderHistory = async () => {
        try {
          const response = await axios.get(
            "https://ftl-server.onrender.com/api/orders/me",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          console.log("Fetched order history:", response.data);
          setOrderHistory(response.data);
          setLoading(false);
        } catch (err) {
          setError("You haven't placed any orders yet");
          setLoading(false);
        }
      };

      fetchOrderHistory();
    }
  }, [token]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  // Pie chart data
  const pieChartData = {
    labels: orderHistory.map((order, index) => `Order ${index + 1}`),
    datasets: [
      {
        label: "Order History",
        data: orderHistory.map(() => 1), // Just show each order as a single unit in the pie chart
        backgroundColor: orderHistory.map((_, index) => {
          const colors = [
            "#ff6b6b",
            "#f7b731",
            "#48dbfb",
            "#1dd1a1",
            "#dcdde1",
          ];
          return colors[index % colors.length];
        }),
        borderColor: "#000000", // Black border for each segment
        borderWidth: 2,
      },
    ],
  };

  // Determine text color based on order status
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "text-red-500"; // Red for Pending
      case "delivered":
        return "text-green-500"; // Green for Delivered
      case "processing":
        return "text-yellow-500"; // Yellow for Processing
      case "cancelled":
        return "text-red-500"; // Red for Cancelled
      default:
        return "text-gray-500"; // Default for other statuses
    }
  };

  // Handle "Go Home" button click
  const handleGoHome = () => {
    navigate("/"); // Redirect to home page
  };

  return (
    <div className="px-2 py-4">
      <h2 className="text-xl font-bold text-gray-900 "> History</h2>
      <div className=" mt-1 flex flex-col md:flex-row">
        {loading ? (
          <div className="flex justify-center items-center w-full">
            <RingLoader color="#000000" size={60} />
          </div>
        ) : error ? (
          <p className="text-black">{error}</p>
        ) : orderHistory.length === 0 ? (
          <div className="flex flex-col justify-center items-center w-full ">
            <p>No orders found.</p>
            {/* Display "No Orders Yet" message */}
            <div style={{ height: "200px", width: "100%" }}>
              <div>No Orders Yet</div>
            </div>
            {/* Add a "Go Home" button */}
            <button
              onClick={handleGoHome}
              className="mt-4 bg-blue-500 text-black py-2 px-4 rounded hover:bg-blue-600"
            >
              Go to Home Page
            </button>
          </div>
        ) : (
          <div className="flex flex-col md:flex-row justify-between w-full px-4">
            <div className="order-list mt-4 w-full md:w-1/2">
              {/* Render Pie chart if orders exist */}
              <div style={{ height: "300px", width: "100%" }}>
                <Pie data={pieChartData} />
              </div>
            </div>

            {/* Render Order Details */}
            <div className="mt-4 flex w-full">
              <div className="overflow-x-auto w-full">
                {/* New table layout with search and action buttons */}
                <div className="-m-1.5 overflow-x-auto">
                  <div className="p-1.5 min-w-full inline-block align-middle">
                    <div className="border rounded-lg divide-y divide-gray-200">
                      <div className="overflow-hidden">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-50">
                            <tr>
                              <th scope="col" className="py-3 px-4 pe-0">
                                <div className="flex items-center h-5">
                                  {/*   <input
                                    id="hs-table-pagination-checkbox-all"
                                    type="checkbox"
                                    className="border-gray-200 rounded  checked:border-black focus:ring-black"
                                  /> */}
                                  <label
                                    for="hs-table-pagination-checkbox-all"
                                    className="sr-only"
                                  >
                                    Checkbox
                                  </label>
                                </div>
                              </th>
                              <th
                                scope="col"
                                className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                              >
                                Order ID
                              </th>
                              <th
                                scope="col"
                                className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                              >
                                Price
                              </th>
                              <th
                                scope="col"
                                className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                              >
                                Status
                              </th>
                              <th
                                scope="col"
                                className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                              >
                                Date
                              </th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-200">
                            {/* Render dynamic rows based on the orders */}
                            {orderHistory.map((order) => (
                              <tr key={order._id}>
                                <td className="py-3 ps-4">
                                  <div className="flex items-center h-5">
                                    <input
                                      id={`order-checkbox-${order._id}`}
                                      type="checkbox"
                                      className="border-gray-200 rounded text-black focus:ring-black"
                                    />
                                    <label
                                      for={`order-checkbox-${order._id}`}
                                      className="sr-only"
                                    >
                                      Checkbox
                                    </label>
                                  </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                                  #{order.id}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                                  ${order.totalPrice}
                                </td>
                                <td
                                  className={`px-6 py-4 whitespace-nowrap text-sm ${getStatusColor(
                                    order.status
                                  )}`}
                                >
                                  {order.status}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                                  {formatDate(order.createdAt)}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderHistory;
