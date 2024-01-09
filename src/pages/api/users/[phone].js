import { EncodeToken } from "@/helper/tokenHelper";
import UserModel from "@/models/UserModel";
import dbConnect from "@/utils/mongo";
import axios from "axios";

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  let phone = req.query.phone;

  if (method === "GET") {
    try {
      const response = await axios.get(
        `https://dhakauniversityclub.com/api/getMember?mobile=${phone}`
      );
      let code = Math.floor(Math.random() * 1000) + 9000;

      if (response.data.status === "success") {
        await UserModel.updateOne(
          { phone: phone },
          {
            $set: {
              otp: code,
            },
          },
          {
            upsert: true,
          }
        );
        res
          .status(200)
          .json({ status: "success", message: "PIN Send Your Phone Number" });
      } else if (response.data.status === "error") {
        res
          .status(200)
          .json({ status: "error", message: "Not Registered Phone Number" });
      } else {
        res
          .status(200)
          .json({ status: "error", message: "Something went wrong" });
      }
    } catch (err) {
      res
        .status(200)
        .json({ status: "error", message: "Something Went Wrong" });
    }
  }
}
