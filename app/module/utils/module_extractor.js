/* Module Extractor - Extracts contents of module zip file to the right places */
const AdmZip = require('adm-zip');
const fs = require('fs');
const path = require('path');

function extractContents(zipFile) {
	var success = false;
	var errors = [];

	const [zip, moduleName, valid] = validateContents(zipFile);

	if (!valid) {
		errors.push('The archive does not contain a config file!');
		return [success, errors];
	}

	const dirKeys = ['controllers/', 'models/', 'views/', 'middleware/', 'public/', 'routes/', 'utils/'];

	const entries = zip.getEntries();
	const filtered = entries.filter(entry => dirKeys.includes(entry.entryName));
	filtered.forEach(entry => {
		const key = entry.entryName;
		const dir = `../../${key}/${moduleName}/`;

		try {
			zip.extractEntryTo(entry, path.join(__dirname, dir), true, false);
		} catch (e) {
			console.error(`Something went wrong when extracting zip archive: ${e}`);
		}
	});

	success = true;

	return [success, errors];
}

function getEntryChildren(entry, entries) {

	if (entry && entry.isDirectory) {
		const list = [];
		const name = entry.entryName;
		const len = name.length;

		entries.forEach(zipEntry => {
			if (zipEntry.entryName.substr(0, len) === name) {
				list.push(zipEntry);
			}
		});

		return list;
	}

	return [];
}

/* Every module archive needs a config file: config.json */
function validateContents(zip) {
	try {
		for (const entry of zip.getEntries()) {
			if (entry.entryName.endsWith('config.json')) {
				content = JSON.parse(entry.getData().toString('utf8'));
				moduleName = content.moduleName;
				return [zip, moduleName, true];
			}
		}
	} catch (e) {
		console.error(`There was an issue with validating the contents of the zip archive: ${e}`);
	}

	return [zip, "", false];
}

exports.extractContents = extractContents;