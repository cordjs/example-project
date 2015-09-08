module.exports  = {

  common: {
    strictWidgetParams: true,

    // Special flag to support working in SPA-mode loading index.html from the local file-system
    // useful for phonegap applications
    localFsMode: false,
    injectCordova: false,

    product: {
      type: 'saas' // saas or box
    },

    server: {
      protocol: 'http',
      host: process.env.NODE ? process.env.NODE : '127.0.0.1',
      port: process.env.NODE_PORT ? process.env.NODE_PORT : '18180'
    },

    static: {
      release: ""
    },

    api: {
      storeHostInCookie: false,
      defaultAuthModule: 'OAuth2',
      backend: {
        protocol: 'https',
        host: "{ACCOUNT}-backend{DOMAIN}" // Config for {BACKEND} variable
      }
    },

    debug: {
      livereload: false,
      core: false,
      oauth: false,
      widget: false,
      widgetName: false,
      model: false,
      require: false,
      request: false,
      monologue: false,
      ecomet: false,
      showMobileErrors: false,
      deferred: {
        timeout: 10000,
        /** Interval for infinite loop that performs deferred timeout checking (ms) */
        checkInterval: 5000
      },
      future: {
        timeout: 10000,
        reportNoTimeout: false, // Report timeout even for withoutTimeout() promises
        trackInternalTimeouts: false,
        longStackTrace: {
          /**
           * Enable collecting and reporting long (async) and filtered stack traces for unhandled failures and timeouts.
           * Very useful during development.
           * Don't enable on production due to high performance cost.
           */
          enable: false,
          /**
           * Append corresponding promise name to the long stack trace line
           */
          appendPromiseName: false,
          /**
           * Log origin stack of future
           */
          logOriginStack: false
        },
        trackUnhandled: {
          enable: false,
          soft: true,     // don't report resolved promises without fail handlers
          interval: 5000, // unhandled rejections checking interval (ms)
          timeout: 5000   // timeout (ms) after which unhandled rejection is reported
        }
      },
      profiler: {
        enable: false
      },
      assertions: false
    },

    console: {
      clear: true,
      log: true,
      warn: true,
      error: true,
      notice: false,
      internal: false,
      /**
       * If _console.error or _console.warn call has exception (Error) in arguments, output its stack-trace
       */
      errorTrace: true,
      /**
       * Appends real _console.(log|warn|error) call stack-trace line to the output.
       * Not recommended for production as it uses expensive (new Error).stack
       */
      appendConsoleCallTrace: false
    },

    logger: {
      type: "local",
      live: false
    }

    /**
     * `secrets` can be defined with actual values is the `common` or `browser` section if it's not possible
     * to use XDRS proxy (e.g. from mobile application)
     */
    // secrets: {
    //   clientId: '123',
    //   clientSecret: 'abcdefg'
    // }
  },

  node: {

    /**
     * Path to special config file with OAuth client-id and client-secret. Path should be absolute (starting with /)
     *  or relative to the 'conf' directory in the project root.
     * This is need to support hiding secret key of the OAuth client application from browser-side via using XDRS.
     * node.secrets is replaced with the contents of the sercrets config file.
     *
     * For development purposes this param can be filled with the object with actual client-id and secret.
     */
    // secrets: '/path/to/secrets.js',
    secrets: {
      clientId: '123',
      clientSecret: 'abcdefg'
    },

    api: {
      protocol: '{BACKEND_PROTO}',
      host: '{BACKEND}',
      urlPrefix: 'api/v2/',
      oauth2: {
        endpoints: {
          accessToken: '{BACKEND_PROTO}://{BACKEND}/oauth/access_token'
        }
      }
    }
  },

  browser: {

    xdr: '',
    xdrs: '',

    api: {
      protocol: '{NODE_PROTO}',
      host: '{NODE}',
      urlPrefix: 'XDR/{BACKEND_PROTO}://{BACKEND}/api/v2/',
      oauth2: {
        endpoints: {
          accessToken: '{XDRS}{BACKEND_PROTO}://{BACKEND}/oauth/access_token'
        }
      }
    }
  }
};
