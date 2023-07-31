import {
    TaskModel
} from "../models/Task.js";

export const getTask = async (req, res) => {
    try {
        const task = await TaskModel.findById({
            _id: req.params._id
        });

        if (!task) {
            return res.status(400).json({
                message: "No not found"
            });
        }
        res.json(task);
    } catch (err) {
        res.status(500).send(err);
    }
};

export const getAllTasks = async (_, res) => {
    try {
        const tasks = await TaskModel.find({});
        res.json(tasks);
    } catch (err) {
        res.status(500).send(err);
    }
};

export const createNewTasks = async (req, res) => {
    try {
        const task = await TaskModel.create(req.body);
        res.json(task);
    } catch (err) {
        res.status(500).send(err);
    }
};

export const updateTask = async (req, res) => {
    try {
        const task = await TaskModel.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        res.json(task);
    } catch (err) {
        res.status(500).send(err);
    }
};

export const deleteTask = async (req, res) => {
    try {
        const task = await TaskModel.findByIdAndRemove(req.params.id);
        res.json(task);
    } catch (err) {
        res.status(500).send(err);
    }
};