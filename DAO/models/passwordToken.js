import mongoose from "mongoose";


const PasswordResetTokenSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    token: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 3600, // expire after 1 hour
    },
});

const PasswordResetToken = mongoose.model(
    "PasswordResetToken",
    PasswordResetTokenSchema
);
