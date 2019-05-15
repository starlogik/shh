module.exports = function (grunt) {
	grunt.loadNpmTasks('grunt-contrib-clean');

	return {
		default: {
			src: ['lib', './tscommand*.tmp.txt']
		}
	}
};