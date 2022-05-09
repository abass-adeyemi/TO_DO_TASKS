const not_found = async (req, res) => {
	res.status(404).send({
		status: true,
		message: 'web page not found.... it seems you are lost',
	});
};
module.exports = not_found;
