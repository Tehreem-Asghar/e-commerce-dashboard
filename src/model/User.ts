import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  name: {
    type: Schema.Types.String,
    required: [true, "Name field is  required"],
  },
  email: {
    type: Schema.Types.String,
    required: [true, " Email is  required"],
    unique: true,
    trim: true,
  },
  password: {
    type: Schema.Types.String,
    required: [true, "Password field is  required"],
  },
  address: {
    type: Schema.Types.String,
    required: [true, "Address field is required"],
  },
  phone: {
    type: Schema.Types.Number,
    required: [true, "phone field is required"],
  },

  role: {
    type: String,
    enum: ["admin", "user"],
    required: [true, "Role is required"],
  },

});

export const user = mongoose.models.User || mongoose.model("User", userSchema);




