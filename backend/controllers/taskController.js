const Task = require("../models/task");


// CREATE TASK
exports.createTask = async (req, res) => {
  try {

    const { title, description, status } = req.body;

    const task = await Task.create({
      title,
      description,
      status,
      createdBy: req.user.id
    });

    res.status(201).json(task);

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }
};



// GET ALL TASKS (FILTER + SEARCH + PAGINATION)
exports.getTasks = async (req, res) => {
  try {

    const filter = {};

    // FILTER BY STATUS
    if (req.query.status) {
      filter.status = req.query.status;
    }

    // SEARCH BY TITLE
    if (req.query.search) {
      filter.title = {
        $regex: req.query.search,
        $options: "i"
      };
    }

    // PAGINATION
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;

    const skip = (page - 1) * limit;

    const tasks = await Task.find(filter)
      .skip(skip)
      .limit(limit);

    res.status(200).json(tasks);

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }
};



// GET MY TASKS
exports.getMyTasks = async (req, res) => {
  try {

    const tasks = await Task.find({
      createdBy: req.user.id
    });

    res.status(200).json(tasks);

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }
};



// UPDATE TASK
exports.updateTask = async (req, res) => {
  try {

    const task = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json(task);

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }
};



// DELETE TASK (ADMIN ONLY)
exports.deleteTask = async (req, res) => {
  try {

    await Task.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Task deleted successfully"
    });

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }
};