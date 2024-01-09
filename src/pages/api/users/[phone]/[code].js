import { EncodeToken } from "@/helper/tokenHelper";
import UserModel from "@/models/UserModel";
import dbConnect from "@/utils/mongo";
import axios from "axios";

export default async function handler(req, res) {
  const { method } = req;

  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + 2);

  await dbConnect();

  // Verify User
  if (method === "GET") {
    try {
      const { phone, code } = req.query;
      if (code === "0") {
        return res.status(200).json({
          status: "error",
          message: "Invalid OTP",
          err: "Invalid OTP",
        });
      } else {
        let count = await UserModel.find({ phone: phone, otp: code }).count(
          "total"
        );
        if (count === 1) {
          const response = await axios.get(
            `https://dhakauniversityclub.com/api/getMember?mobile=${phone}`
          );
          const userObj = {
            id: response.data.data.id,
            name: response.data.data.name,
            email: response.data.data.email,
            designation: response.data.data.designation,
            phone: response.data.data.mobile,
            member_code: response.data.data.member_code,
          };
          const user_id = await UserModel.findOne({ phone: phone }).select(
            "_id"
          );
          let token = EncodeToken(phone, user_id._id);
          await UserModel.updateOne(
            { phone: phone },
            {
              $set: {
                otp: 0,
              },
            },
            {
              upsert: true,
            }
          );

          // Set cookie manually using setHeader
          // res.setHeader(
          //   "Set-Cookie",
          //   `loginCookie=${encodeURIComponent(
          //     JSON.stringify(userObj)
          //   )}; HttpOnly; Secure; SameSite=Strict; Expires=${expirationDate.toUTCString()}`
          // );

          return res.status(200).json({
            status: "success",
            message: "Verify Successful",
            id: response.data.data.id,
            name: response.data.data.name,
            tokenLogin: token,
          });
        } else if (count === 0) {
          return res.status(200).json({
            status: "error",
            message: "Invalid OTP",
            err: "Invalid OTP",
          });
        }
      }
    } catch (err) {
      return res.status(500).json({
        status: "error",
        message: "Something Went Wrong",
      });
    }
  }

  if (method === "POST") {
    return res.status(200).json({
      status: "error",
      message: "Invalid method",
    });
  }
}
