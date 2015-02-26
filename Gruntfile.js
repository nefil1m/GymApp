'use strict';

module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    sass: {
      dist: {
        files: {
          'app/assets/css/styles.css': ['app/assets/scss/*.scss']
        }
      }
    },
    'sails-linker': {
      defaultOptions: {
        options: {
          startTag: '<!-- scripts -->',
          endTag: '<!-- scripts end -->',
          fileTmpl: '<script src="%s"></script>',
          appRoot: 'app/'
        }
      },
      files: {
        'app/index.html': ['app/src/**/*.js']
      }
    },
    watch: {
      sass: {
        files: ['app/assets/scss/*.scss'],
        tasks: ['sass'],
        options: {
          livereload: true
        }
      },
      js: {
        files: ['app/src/**/*.js'],
        tasks: ['sails-linker'],
        options: {
          livereload: true
        }
      }
    }
  });

  grunt.registerTask('default', ['watch']);
};