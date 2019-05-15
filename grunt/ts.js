module.exports = function (grunt) {
	grunt.loadNpmTasks('grunt-ts');

	return {
		build: {
			tsconfig: true,
			options: {
				fast: 'never'
			}
		}
	}
};