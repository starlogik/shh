module.exports = function(grunt) {
  const options = { config: { src: "grunt/*.js" } };
  const configs = require('load-grunt-configs')(grunt, options);
  grunt.initConfig(configs);
  grunt.registerTask('build', ['clean', 'copy', 'ts', 'concat']);
  grunt.registerTask('circle', ['concat']);
  grunt.registerTask('test', ['mochaTest']);
};
