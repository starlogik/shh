module.exports = function (grunt) {
	grunt.loadNpmTasks('grunt-mocha-test');

	return {
		'shh tests': {
			options: {
				reporter: 'spec'
			},
			src: ['tests/**/*.js']
		}
	}
};