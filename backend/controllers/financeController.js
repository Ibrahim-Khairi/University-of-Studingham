import Finance from "../models/Finance.js";

export const getFinanceData = async (req, res) => {
  try {
    let finance = await Finance.findOne({ userId: req.user.userId });

    // If no finance record exists yet for this student, create an empty one
    if (!finance) {
      finance = await Finance.create({
        userId: req.user.userId,
        monthlyBudget: 0,
        expenses: [],
      });
    }

    res.json(finance);
  } catch (error) {
    res.status(500).json({ message: "Server error fetching finance data" });
  }
};

export const updateBudget = async (req, res) => {
  try {
    const { amount } = req.body;
    const finance = await Finance.findOneAndUpdate(
      { userId: req.user.userId },
      { monthlyBudget: amount },
      { new: true, upsert: true }
    );
    res.json(finance);
  } catch (error) {
    res.status(500).json({ message: "Failed to update budget" });
  }
};

export const addExpense = async (req, res) => {
  try {
    const { category, amount, date } = req.body;

    const finance = await Finance.findOne({ userId: req.user.userId });
    if (!finance) return res.status(404).json({ message: "Profile not found" });

    finance.expenses.push({ category, amount, date });
    await finance.save();

    res.status(201).json(finance);
  } catch (error) {
    res.status(500).json({ message: "Failed to add expense" });
  }
};
export const updateBudgetAndSavings = async (req, res) => {
  try {
    // These names must match what your Frontend "handleSave" sends
    const { budget, savings } = req.body;

    const updated = await Finance.findOneAndUpdate(
      { userId: req.user.userId },
      {
        monthlyBudget: Number(budget),
        savings: Number(savings),
      },
      { new: true, upsert: true } // new: true returns the updated data to the frontend
    );

    res.json(updated);
  } catch (error) {
    console.error("Update Budget Error:", error);
    res.status(500).json({ message: "Failed to update setup" });
  }
};
