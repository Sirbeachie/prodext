const moduleExtractor = require('../../app/module/utils/module_extractor.js');
const fs = require('fs');
const AdmZip = require('adm-zip');
const path = require('path');

function createTestZipArchives() {
	const config = '{"moduleName": "TestModule", "links": [{}]}';
	dirKeys = ['controllers/', 'models/', 'views/', 'middleware/', 'public/', 'routes/', 'utils/'];

	var zipWithoutConfig = new AdmZip();

	for (key of dirKeys) {
		zipWithoutConfig.addFile(key, Buffer.alloc(0));
	}

	var zipWithSubDirectories = new AdmZip();
	var subDir = 'Test';
	var dummyText = 'Random txt file!';

	for (key of dirKeys) {
		zipWithSubDirectories.addFile(key, Buffer.alloc(0));
		zipWithSubDirectories.addFile(`${key}/${subDir}/`, Buffer.alloc(0));
		zipWithSubDirectories.addFile(`${key}/${subDir}/dummyText.txt`, Buffer.from(dummyText));
	}

	zipWithSubDirectories.addFile('config.json', Buffer.from(config));

	return [zipWithoutConfig, zipWithSubDirectories];
}

function checkIfDirContainsFiles(dir, fileDirs) {
	const contents = fs.readdirSync(dir);
	const valid = fileDirs.every(r => contents.includes(r));

	return valid;
}

function cleanUp() {
	dirKeys = ['controllers', 'models', 'views', 'middleware', 'public', 'routes', 'utils'];
	dirKeys.forEach(key => fs.rmSync(path.join(__dirname, `../../app/${key}/TestModule`), { recursive: true }));
}

const [zipWithoutConfig, zipWithSubDirectories] = createTestZipArchives();

test('Module archives with no config file should produce an error', () => {
	const [success, errors] = moduleExtractor.extractContents(zipWithoutConfig);
	expect(success).toEqual(false);
	expect(errors).toHaveLength(1);
	expect(errors[0]).toEqual('The archive does not contain a config file!');
});

// TODO: Mock this...
test('Should be extracted to the correct directories', () => {
	const [success, errors] = moduleExtractor.extractContents(zipWithSubDirectories);
	expect(success).toEqual(true);

	fileDirs = ['TestModule'];
	falseFileDirs = ['RandomTest/', 'Something/'];

	valid = checkIfDirContainsFiles(path.join(__dirname, '../../app/public/'), fileDirs);
	expect(valid).toEqual(true);

	valid = checkIfDirContainsFiles(path.join(__dirname, '../../app/public/'), falseFileDirs);
	expect(valid).toEqual(false);


	// MOCK please
	cleanUp();
});