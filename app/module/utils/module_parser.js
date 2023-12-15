function parse(content) {
	var moduleName = content.moduleName;
	var authorName = (content.authorName === undefined) ? "" : content.authorName;
	var menuIcon = (content.menuIcon === undefined) ? "" : content.menuIcon;

	return [moduleName, authorName, menuIcon];
}

exports.parse = parse;