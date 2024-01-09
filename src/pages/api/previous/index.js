import { EncodeToken } from "@/helper/tokenHelper";
import UserModel from "@/models/UserModel";
import dbConnect from "@/utils/mongo";
import axios from "axios";
import middleware from "../middleware";

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  middleware(req, res, async () => {
    // Verify User
    if (method === "GET") {
      try {
        const id = req.headers.id;
        console.log(id);
        res.send("This is previous");
      } catch (err) {
        return res.status(500).json({
          status: "error",
          message: "Something Went Wrong",
        });
      }
    }
  });

  if (method === "POST") {
    return res.status(200).json({
      status: "error",
      message: "Invalid method",
    });
  }
}
