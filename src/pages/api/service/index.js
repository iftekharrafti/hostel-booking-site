import { EncodeToken } from "@/helper/tokenHelper";
import UserModel from "@/models/UserModel";
import dbConnect from "@/utils/mongo";
import axios from "axios";
import { format } from "date-fns";

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  console.log("req::::::::::::", req);
  let body = req.body;
  console.log("body::::::::::::", body);

  const toDate = format(new Date(), "yyyy-MM-dd");

  if (method === "POST") {
    try {
      const formData = new FormData();
      formData.append("customer", body?.customer);
      formData.append("warehouseID", "4");
      formData.append("saleDate", toDate);
      formData.append("invoiceDate", toDate);
      formData.append("subTotal", "6.0");
      formData.append("vat", "0");
      formData.append("vatPertan", "0");
      formData.append("discountType", "0");
      formData.append("discountPercent", "");
      formData.append("discount", "0");
      formData.append("totalAmount", "6.00");
      formData.append("r1", "3");
      formData.append("extra_sms", "0");
      formData.append("submitBtn", "");
      formData.append("priority", '["1"]');
      formData.append("qty", `[${body?.quantity}]`);
      formData.append("productID", `[${body?.productID}]`);
      formData.append("price", `[${body?.price}]`);

      const response = await axios.post(
        "https://www.dhakauniversityclub.com/api/salesStore",
        formData,
        {
          headers: {
            "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
          },
          withCredentials: true, // Add this line
        }
      );
      if (response.data.status === "success") {
        res.status(200).json({ status: "success", message: "Order Placed" });
      }
    } catch (err) {
      res
        .status(200)
        .json({ status: "error", message: "Something Went Wrong" });
    }
  }
}
