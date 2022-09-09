import colors from 'vuetify/es5/util/colors'
// 本番環境と開発環境の分岐用のフラグ
const isProd = process.env.NODE_ENV === 'production'

export default {

  publicRuntimeConfig: {
    baseUrl: isProd ? process.env.BASE_URL : 'http://localhost:8000',
    backendBaseUrl:
      isProd ? process.env.BACKEND_BASE_URL : 'http://localhost:3000/api/v1',
  },
  head: {
    title: 'とうきょう図書館Map',
    htmlAttrs: {
      lang: 'ja'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // ポート番号を指定
  server: {
    port: 8000,
  },

  css: [
  ],

  plugins: [
    { src: '~/plugins/vue2-google-maps.js' },
    { src: '~/plugins/vue-apex-charts.js', mode: 'client' },
  ],

  components: true,

  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
    // 環境変数
    '@nuxtjs/dotenv',
  ],

  modules: [
    '@nuxtjs/axios',
  ],

  analytics: {
    collectionEnabled: true,
  },

  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      white: true,
      themes: {
        white: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },

  build: {
    extend(config, ctx) {},
    vendor: ['vue2-google-maps'],
    transpile: [/^vue2-google-maps($|\/)/]
  },
}
