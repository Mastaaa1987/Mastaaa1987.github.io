path = require 'path'

module.exports = (grunt) ->

  grunt.initConfig
    pkg: grunt.file.readJSON 'package.json'

    app:
      dest: 'dist'
      bower: 'bower_components'
      css: 'css'
      js: 'js'
      partials: 'partials'

    clean:
      before: ['<%= app.dest %>/*']


    copy:
      css:
        flatten: true
        expand: true
        cwd: ''
        src: '<%= app.css %>/*.css'
        dest: '<%= app.dest %>/css/'
      js:
        flatten: true
        expand: true
        cwd: ''
        src: '<%= app.js %>/**/*.js'
        dest: '<%= app.dest %>/js/'
      fonts:
        flatten: true
        expand: true
        cwd: ''
        src: 'fonts/*'
        dest: '<%= app.dest %>/fonts/'
      html:
        flatten: true
        expand: true
        cwd: ''
        src: 'index.html'
        dest: '<%= app.dest %>/'

    ngtemplates:
      'mbApp.services':
        cwd: ''
        src: 'partials/*.html'
        dest: 'js/partials.js'
        options:
          prefix: '/'

  grunt.loadNpmTasks 'grunt-contrib-copy'
  grunt.loadNpmTasks 'grunt-contrib-clean'
  grunt.loadNpmTasks 'grunt-contrib-concat'
  grunt.loadNpmTasks 'grunt-angular-templates'

  # Default task for development
  grunt.registerTask 'default', [
    'auto_install'
    'concat'
    'watch'
  ]

  # Local run task
  grunt.registerTask 'release', [
    'ngtemplates'
    'clean'
    'copy'
  ]

  # Release build task
  grunt.registerTask 'release', [
    'auto_install'
    'ngtemplates'
    'concat'
    'clean:before'
    'copy'
    'useminPrepare'
    'cssmin'
    'uglify'
    'filerev'
    'clean:after'
    'usemin'
  ]