exports.capitalize = string => string.charAt(0).toUpperCase() + string.slice(1);

exports.camelCase = string =>
	string
		.trim()
		.split(' ')
		.map(
			(word, index) =>
				word.charAt(0)[index === 0 ? 'toLowerCase' : 'toUpperCase']() +
				word.toLowerCase().slice(1),
		)
		.join('');

exports.stringToArray = string => {
	const src = string.split(',');
	let dest = [];
	src.forEach(item => dest.push(item.trim()));
	return dest;
};
