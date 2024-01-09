import mongoose from "mongoose";
const { Schema } = mongoose;

const usersSchema = Schema(
  {
    phone: { type: String, required: true, unique: true },
    otp: { type: String, required: true },
  },
  { timestamps: true, versionKey: false }
);

export default mongoose.models.users || mongoose.model("users", usersSchema);
