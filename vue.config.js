const path = require('path');

module.exports = {
    chainWebpack: config => {
        config.module.rules.delete('eslint');
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