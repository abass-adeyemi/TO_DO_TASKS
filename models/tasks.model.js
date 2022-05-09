const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [
			true,
			'this field is required',
		] /* this is use to prevent empty entty into the Db */,
		trim: true, // this is use to remove unwanted space from the front end
		maxlength: [25, 'field cannot be greater than 20 character'],
		minlength: [5, 'flied cannot be less than 5 character'],
	},
	isCompleted: {
		type: Boolean,
		default: false,
	},
});
module.exports = mongoose.model('Task', taskSchema);
