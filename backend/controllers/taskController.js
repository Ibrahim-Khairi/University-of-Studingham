import Task from "../models/Task.js";

export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.user.userId }).sort({
      createdAt: -1,
    });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Error fetching tasks" });
  }
};

export const createTask = async (req, res) => {
  try {
    const { title, category } = req.body;
    const task = await Task.create({
      title,
      category,
      userId: req.user.userId,
    });
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ message: "Error creating task" });
  }
};

export const toggleTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });

    task.completed = !task.completed;
    await task.save();
    res.json(task);
  } catch (error) {
    res.status(400).json({ message: "Toggle failed" });
  }
};

export const deleteTask = async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: "Task deleted" });
  } catch (error) {
    res.status(400).json({ message: "Delete failed" });
  }
};
