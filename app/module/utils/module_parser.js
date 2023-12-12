function parse(content) {
	var moduleName = content.moduleName;
	var authorName = (content.authorName === undefined) ? "" : content.authorName;
	var links = (checkForKeys(content.links)) ? content.links : [];
	var dropLinks = (checkForKeys(content.dropLinks)) ? content.dropLinks : [];
	var menuIcon = (content.menuIcon === undefined) ? "" : content.menuIcon;

	return [moduleName, authorName, links, dropLinks, menuIcon];
}

function checkForKeys(objects) {
	if (objects === undefined) return false;

	for (let obj of objects) {
		if (Object.keys(obj).length > 0) {
			return true;
		}
	}

	return false;
}

exports.parse = parse;