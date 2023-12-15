const moduleParser = require('../../app/module/utils/module_parser.js');

const test_var = '{"moduleName": "TestModule", "links": [{}]}';

test('Tests certain properties of parsed config file', () => {
	const content = JSON.parse(test_var);
	const [moduleName, authorName, menuIcon] = moduleParser.parse(content);
	expect(moduleName).toBe("TestModule");
	expect(authorName).toBe("");
	expect(menuIcon).toBe("");
	expect(authorName).not.toBe("string");
});