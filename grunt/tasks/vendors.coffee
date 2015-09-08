module.exports = (grunt) ->

  grunt.config.merge
    copy:
      vendor_browser_request:
        expand: true
        cwd: 'node_modules/browser-request'
        src: [
          'index.js'
        ]
        dest: 'public/vendor/browser-request'

      vendor_underscore:
        expand: true
        cwd: 'node_modules/underscore'
        src: [
          'underscore.js'
        ]
        dest: 'public/vendor/underscore'

      vendor_validator:
        src: 'node_modules/validator/validator.js'
        dest: 'public/vendor/validator/validator.js'

    clean:
      vendor_browser_request: ['public/vendor/browser-request']
      vendor_underscore: ['public/vendor/underscore']
      vendor_validator: ['public/vendor/validator']

  grunt.loadNpmTasks('grunt-contrib-clean')
  grunt.loadNpmTasks('grunt-contrib-copy')

  grunt.registerTask 'publish-vendors', 'Copy vendors to public dir', ->
    grunt.task.run [
      'clean:vendor_browser_request'
      'copy:vendor_browser_request'

      'clean:vendor_underscore'
      'copy:vendor_underscore'

      'clean:vendor_validator'
      'copy:vendor_validator'
    ]
