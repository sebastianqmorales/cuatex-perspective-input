let commentsArray = [];

function pushComments(obj) {
	commentsArray.push(obj);
	return console.log(commentsArray);
}

export { commentsArray, pushComments };
