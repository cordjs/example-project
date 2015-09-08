module.exports = (grunt) ->

  grunt.loadTasks('grunt/tasks')


  grunt.registerTask 'default', ['test']

  ###
    Unit testing
  ###
  grunt.config.merge
    mochacli:
      all: [
        'public/bundles/cord/core/test'
      ]
  grunt.loadNpmTasks('grunt-mocha-cli')

  grunt.registerTask('unit', ['mochacli:all'])
