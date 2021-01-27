export default {
  telemetry: true,
  // Target (https://go.nuxtjs.dev/config-target)
  target   : 'server',
  // Global page headers: https://go.nuxtjs.dev/config-head
  head     : {
    htmlAttrs: {
      lang: 'ja',
    },
    titleTemplate (title) {
      return (title) ? `${title} | Nilgiri Tea` : 'Nilgiri Tea';
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '同人サークル Nilgiri Tea' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/sass/_reset.scss',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '@/plugins/adobe-fonts',
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    '@nuxtjs/style-resources',
  ],
  styleResources: {
    scss: [
      '~/assets/sass/_mixin.scss',
    ],
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/content
    '@nuxt/content',
    '@nuxtjs/dotenv',
    '@nuxtjs/google-gtag',
  ],
  'google-gtag': {
    id: 'G-ZJ29G1H79M',
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    responseType: 'json',
  },

  // Content module configuration: https://go.nuxtjs.dev/config-content
  content: {},

  // Server Middleware
  serverMiddleware: {
    '/api': '~/api',
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    filenames: {
      app  : ({ isDev }) => isDev ? '[name].[hash].js' : '[chunkhash].js',
      chunk: ({ isDev }) => isDev ? '[name].[hash].js' : '[chunkhash].js',
    },
  },
};
