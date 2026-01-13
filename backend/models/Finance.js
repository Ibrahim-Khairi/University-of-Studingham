import mongoose from "mongoose";

const financeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    monthlyBudget: { type: Number, default: 0 },
    savings: { type: Number, default: 0 },
    expenses: [
      {
        category: {
          type: String,
          enum: [
            "Rent",
            "Utilities",
            "Groceries",
            "Subscriptions",
            "Eating Out",
            "Other",
          ],
          required: true,
        },
        amount: { type: Number, required: true },
        date: { type: Date, default: Date.now },
        description: { type: String },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Finance", financeSchema);
