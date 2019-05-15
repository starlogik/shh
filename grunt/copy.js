module.exports = function (grunt) {
	grunt.loadNpmTasks('grunt-contrib-copy');

	return {
		assets: {
			files: [
				{
					expand: true,
					cwd: 'src',
					src: ['**', '!**/*.{ts,tsx}'],
					dest: 'lib'
				}
			]
		}
	}
};