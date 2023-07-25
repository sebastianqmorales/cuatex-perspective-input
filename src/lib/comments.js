function pushComments(str) {
	commentsArray.push(str);
	return console.log(commentsArray);
}
let commentsArray = ['<p>tests <strong>does this still work? </strong></p>'];

export { commentsArray, pushComments };
