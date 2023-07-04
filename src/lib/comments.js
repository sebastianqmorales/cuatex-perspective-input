let commentsArray = [
	{
		type: 'doc',
		content: [
			{
				type: 'paragraph',
				content: [
					{
						type: 'text',
						text: 'Example '
					},
					{
						type: 'text',
						marks: [
							{
								type: 'bold'
							}
						],
						text: 'Text'
					}
				]
			}
		]
	}
];

function pushComments(obj) {
	commentsArray.push(obj);
	return console.log(commentsArray);
}

export { commentsArray, pushComments };
