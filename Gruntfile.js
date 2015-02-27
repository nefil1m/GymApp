'use strict';

module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      dist: {
        files: {
          'dist/assets/css/main.css': '.tmp/assets/css/*.css',
          'dist/js/scripts.js': ['.tmp/min/**/*.min.js']
        }
      }
    },
    copy: {
      tmp: {
        files: [
          {
            expand: true,
            cwd: 'app/',
            src: ['**/*.*'],
            dest: '.tmp/',
            filter: 'isFile'
          }
        ]
      },
      dist: {
        files: [
          {
            expand: true,
            cwd: '.tmp/',
            src: ['**/*.html', 'assets/bower_components/**/*.*'],
            dest: 'dist/',
            filter: 'isFile'
          }
        ]
      }
    },
    express: {
      options: {
        port: 7000
      },
      default: {
        options: {
          script: 'index.js'
        }
      }
    },
    ngAnnotate: {
      dist: {
        files: [{
          expand: true,
          src: '.tmp/**/*.js'
        }]
      }
    },
    'sails-linker': {
      defaultOptions: {
        options: {
          startTag: '<!-- scripts -->',
          endTag: '<!-- scripts end -->',
          fileTmpl: '<script src="%s"></script>',
          appRoot: ''
        },
        files: {
          'app/index.html': ['app/src/**/*.js']
        }
      }
    },
    sass: {
      dist: {
        files: {
          'app/assets/css/styles.css': ['app/assets/scss/*.scss']
        }
      }
    },
    uglify: {
        files: {
          expand: true,
          cwd: '.tmp/',
          src: ['**/*.js', '!**/*.min.js', '!**/assets/bower_components/**/*.*'],
          dest: '.tmp/min/',
          rename: function(dest, src) {
            var folder = src.substring(0, src.lastIndexOf('/'));
            var filename = src.substring(src.lastIndexOf('/'), src.length);
            filename = filename.substring(0, filename.lastIndexOf('.'));
            return dest + folder + filename + '.min.js';
          }
        }
    },
    watch: {
      // sass: {
      //   files: ['app/assets/scss/*.scss'],
      //   tasks: ['sass'],
      //   options: {
      //     livereload: true
      //   }
      // },
      // js: {
      //   files: ['app/src/**/*.js'],
      //   tasks: ['sails-linker'],
      //   options: {
      //     livereload: true
      //   }
      // },
      // copy: {
      //   files: ['app/**'],
      //   tasks: ['copy:tmp'],
      //   options: {
      //     livereload: true
      //   }
      // },
      // dist: {
      //   files: ['.tmp/**'],
      //   tasks: ['ngAnnotate', 'uglify', 'copy:dist'],
      //   options: {
      //     livereload: true
      //   }
      // }
    }
  });

  grunt.registerTask('default', ['express:default', 'sass', 'copy:tmp', 'ngAnnotate:dist', 'uglify', 'concat', 'copy:dist']);
};