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
  }
}
