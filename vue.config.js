const StyleLintPlugin = require('stylelint-webpack-plugin')

module.exports = {
  runtimeCompiler: true,

  chainWebpack: config => {
    config.resolve.symlinks(false)

    config.module
      .rule('eslint')
      .use('eslint-loader')
      .options({
        fix: true
      })
  },

  css: {
    loaderOptions: {
      sass: {
        prependData: `
          @import "@/scss/shared/_variables.scss";
          @import "@/scss/shared/_mixins.scss";
        `,
        sassOptions: {
          scoped: false
        }
      }
    }
  },

  configureWebpack: {
    plugins: [
      new StyleLintPlugin({
        configFile: './.stylelintrc',
        files: ['**/*.{vue,html,css,scss}'],
        fix: true
      })
    ]
  },

  pluginOptions: {
    prerenderSpa: {
      registry: undefined,
      renderRoutes: [
        '/',
        '/send-a-mask',
        '/make-a-mask',
        '/mask/accordion-mask-1',
        '/mask/accordion-mask-2',
        '/mask/filtered-mask-1',
        '/mask/filtered-mask-2'
      ],
      useRenderEvent: true,
      headless: true,
      onlyProduction: true
    }
  }
}
