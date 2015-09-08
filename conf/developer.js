module.exports = {

  common: {

    api: {
      backend: {
        protocol: process.env['BACKEND_PROTO'] ? process.env['BACKEND_PROTO'] : 'https', // Config for {BACKEND_PROTO} variable
        host: process.env['BACKEND_HOST'] ? process.env['BACKEND_HOST'] : 'localhost' // Config for {BACKEND} variable
      }
    },

    static: {
      release: 'r1' // Для форсированной перезагрузки скриптов с сервера включите в настройках DevTools браузера Chrome
                    // флаг "Disable cache (while DevTools is open)"
    },

    debug: {
      livereload: true,
      core: false,
      oauth: true,
      widget: false,
      model: true,
      require: true,
      request: 'simple',
      widgetName: false,
      monologue: true,
      deferred: {
        timeout: 10000
      },
      future: {
        timeout: 10000,
        longStackTrace: {
          enable: true,
          appendPromiseName: true
        },
        trackUnhandled: {
          enable: true,
          soft: true,     // don't report resolved promises without fail handlers
          interval: 5000, // unhandled rejections checking interval (ms)
          timeout: 5000   // timeout (ms) after which unhandled rejection is reported
        }
      },
      profiler: {
        enable: false
      }
    },

    console: {
      clear: true,
      log: true,
      warn: true,
      error: true,
      notice: true,
      internal: false,
      errorTrace: true,
      appendConsoleCallTrace: true
    }
  },

  node: {
    secrets: 'secrets-developer-example.js'
  }
};
