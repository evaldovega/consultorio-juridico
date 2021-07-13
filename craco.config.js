const CracoLessPlugin = require('craco-less');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: { '@primary-color': '#D07400','@info-color':'#00378b' },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};