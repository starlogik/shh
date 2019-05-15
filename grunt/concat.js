const counters = {
	jobs: 0,
	anchors: 0,
	vars: 0,
	workflows: 0
};

const TAB = '  ';

let isInitialized = false;

function section(yml, name, header) {
	yml = `${ TAB }${ yml.replace(/\n/g, '\n' + TAB) }`;

	if (typeof(counters[name]) === 'undefined')
		counters[name] = 0;

	if (counters[name] === 0)
		yml = `${ header ? header : name + ':' }\n${ yml }`;

	counters[name]++;

	return yml;
}

module.exports = function (grunt) {
	grunt.loadNpmTasks('grunt-contrib-concat');

	return {
		circleci: {
			src: [
				'.circleci/src/vars.yml',
				'.circleci/src/anchors/**/*.yml',
				'.circleci/src/defaults.yml',
				'.circleci/src/os.yml',
				'.circleci/src/jobs/**/*.yml',
				'.circleci/src/workflows/**/*.yml'
			],
			dest: '.circleci/config.yml',
			options: {
				process: function(yml, filepath) {
					console.log('CircleCI Including:', filepath);

					yml = yml.trim();

					if (filepath.indexOf('vars.yml') > -1) {
						yml = section(yml, 'vars');
					}
					else if (filepath.indexOf('src/anchors') > -1) {
						yml = section(yml, 'anchors');
					}
					else if (filepath.indexOf('os.yml') > -1) {
						yml = section(yml, 'os');
					}
					else if (filepath.indexOf('src/jobs') > -1) {
						yml = section(yml, 'jobs');
					}
					else if (filepath.indexOf('src/workflows') > -1) {
						yml = section(yml, 'workflows', `workflows:\n${ TAB }version: 2.1`);
					}

					if (!isInitialized) {
						yml = `version: 2.1\n\n${ yml }`;

						isInitialized = true;
					}

					yml += '\n';

					return yml;
				}
			}
		}
	}
};