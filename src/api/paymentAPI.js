import API from "../config/axios";

// Function to create razorpay payment

// const CreateRazorpay = async (data) => {
//    var options = {
//       key: process.env.RAZORPAY_KEY, // Enter the Key ID generated from the Dashboard
//       amount: "50000", // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
//       currency: "INR",
//       name: "RESTOAP", //your business name
//       description: "Test Transaction",
//       image: "https://example.com/your_logo",
//       order_id: data.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
//       callback_url: "http://localhost:3000/order-placed",
//       prefill: {
//          //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
//          name: "Gaurav Kumar", //your customer's name
//          email: "gaurav.kumar@example.com",
//          contact: "9000090000", //Provide the customer's phone number for better conversion rates
//       },
//       notes: {
//          address: "Razorpay Corporate Office",
//       },
//       theme: {
//          color: "#BB3138",
//       },
//    };
//    const rzp1 = new window.Razorpay(options);
//    rzp1.open();
// };

export const placeOrderWithPayNow = async (orderId) => {
   try {
      const response = await API.get(`/order/payment/${orderId}`);
      return response.data;
   } catch (err) {
      console.log(err);
      return err;
   }
};
