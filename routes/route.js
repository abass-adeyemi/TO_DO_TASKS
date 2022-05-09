const express = require('express');
const router = express.Router();
const {
	getTasks,
	updateTasks,
	deleteTasks,
	createTasks,
	getSingleTasks,
	abike,
} = require('../controller/tasks');

router.get('/', getTasks);
router.put('/:ami', abike);
router.post('/', createTasks);
router.patch('/:id', updateTasks);
router.delete('/:id', deleteTasks);
router.get('/:id', getSingleTasks);

module.exports = router;
