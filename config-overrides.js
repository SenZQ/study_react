const {

    override,
 
    addDecoratorsLegacy,
 
    disableEsLint,

    addLessLoader,

    addWebpackAlias,
 
  } = require("customize-cra");
 
const path = require('path');
  
 module.exports = {
 
    webpack: override(
 
      addDecoratorsLegacy(),
 
      disableEsLint(),

      addLessLoader({
        lessOptions: {
          javascriptEnabled: true,
          modifyVars: { '@brand-primary': '#1DA57A' },
        },
      }),

      addWebpackAlias({
        '@': path.resolve(__dirname, 'src')
      })
    
    )
 
 };

