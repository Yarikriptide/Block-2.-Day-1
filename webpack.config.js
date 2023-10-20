const path = require('path'); 
const webpack = require('webpack'); 
 
 
module.exports = { 
   resolve: { 
       alias: { 
           vue: 'vue/dist/vue.esm-bundler' 
       } 
   }, 
 devServer: { 
   static: path.join(__dirname, 'src'), 
   compress: true, 
   port: 8080 
 }, 
 plugins: [ 
   new webpack.DefinePlugin({ 
     VUE_OPTIONS_API: true, 
     VUE_PROD_DEVTOOLS: false 
   }) 
 ] 
};