import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, minLength: 6 },
    profilePic: { type: String, default: "https://icon-library.com/images/avatar-icon-images/avatar-icon-images-15.jpg" },
},
{
    timestamps: true
}
);

const User= mongoose.model("User", userSchema);

export default User;