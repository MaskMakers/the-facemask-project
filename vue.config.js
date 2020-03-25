const path = require('path');

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
                prependData: `@import "@/scss/shared/_variables.scss";`,
                sassOptions: {
                    scoped: false
                }
            }
        }
    }
}
