require('dotenv').config();

const Task = require('../models/tasks.model');

const getTasks = async (req, res) => {
	try {
		const tasks = await Task.find({});
		res.status(200).send({
			status: true,
			message: 'this are all the tasks',
			data: tasks,
		});
	} catch (error) {
		res.status(501).json({
			status: false,
			message: error.message,
			// data: createTask,
		});
	}
};
const deleteTasks = async (req, res) => {
	const { id: taskID } = req.params;
	try {
		const deleteTasks = await Task.findOneAndDelete({ _id: taskID });
		console.log('deleteTasks=>', deleteTasks);
		if (deleteTasks === null) {
			return res.status(404).json({
				status: false,
				message: `No Task with the ${taskID} exist`,
				// data: deleteTasks,
			});
		}

		res.status(200).send({
			status: true,
			message: ` task with ${taskID} sucessfully deleted `,
			data: deleteTasks,
		});
	} catch (error) {
		res.status(501).json({
			status: false,
			message: error,
		});
	}
};
const createTasks = async (req, res) => {
	try {
		const createTask = await Task.create(req.body);

		res.status(200).json({
			status: true,
			message: 'task sucessfully added',
			data: createTask,
		});
	} catch (error) {
		res.status(401).json({
			status: false,
			message: error.message,
			// data: createTask,
		});
	}
};
const getSingleTasks = async (req, res) => {
	const { id: taskID } = req.params;

	try {
		// console.log('getSingleTask result54 =>');
		console.log('task', taskID);
		const getSingleTask = await Task.findOne({ _id: taskID });
		// console.log('getSingleTask result57 =>', getSingleTask);

		if (getSingleTask === null) {
			// console.log('getSingleTask result 60 =>', getSingleTask);
			// return `No Task with the ${taskID} exist'`;
			throw new Error(`No Task with the ${taskID} exist`);
		}

		res.status(200).send({
			status: true,
			message: ` your  task for ${taskID}`,
			data: getSingleTask,
		});
	} catch (error) {
		res.status(401).json({
			status: false,
			message: error,
			// data: createTask,
		});
	}
};
const updateTasks = async (req, res) => {
	const { id: taskID } = req.params;
	console.log('task', taskID);
	const updateData = req.body;
	try {
		const updateTask = await Task.findByIdAndUpdate(
			{ _id: taskID },
			updateData,
			{
				// this is use to return the updated data {new:true} and it used prevent empty name {runValidator true}
				new: true,
				runValidators: true,
			}
		);
		if (!updateTask) {
			return res.status(404).send({
				status: false,
				message: `No Task with the ${taskID} exist`,
			});
		}
		res.status(200).send({
			status: true,
			message: 'items edited',
			data: updateTask,
		});
	} catch (error) {
		res.status(501).json({
			status: false,
			message: error,
		});
	}
};
const abike = async (req, res) => {
	const { ami: taskID } = req.params;
	console.log('task', taskID);
	const updateData = req.body;
	try {
		const updateTaskPut = await Task.findByIdAndUpdate(
			{ _id: taskID },
			updateData,
			{
				// one thing about put request is that it edit the entire information (but mongoose tries to prevent it... but the key word overwrite:true makes it behave truly like a put request)
				// this is use to return the updated data {new:true} and it used prevent empty name {runValidator true}
				new: true,
				runValidators: true,
				overwrite: true,
			}
		);
		if (!updateTaskPut) {
			return res.status(404).send({
				status: false,
				message: `No Task with the ${taskID} exist`,
			});
		}
		res.status(200).send({
			status: true,
			message: 'items edited',
			data: updateTaskPut,
		});
	} catch (error) {
		res.status(501).json({
			status: false,
			message: error,
		});
	}
};
module.exports = {
	getTasks,
	updateTasks,
	deleteTasks,
	createTasks,
	getSingleTasks,
	abike,
};
