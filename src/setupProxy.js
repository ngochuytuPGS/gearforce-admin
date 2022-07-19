/* eslint-disable */
const { createProxyMiddleware } = require('http-proxy-middleware');

const router = {
  '/apiExport': 'https://api.gearfocus.div4.pgtest.co/apiExport',
  '/apiAdmin': 'https://api.gearfocus.div4.pgtest.co/apiAdmin',
  '/apiVendor': 'https://api.gearfocus.div4.pgtest.co/apiVendor',
  '/api': 'https://api.gearfocus.div4.pgtest.co/api',
};

module.exports = function (app) {
  app.use(
    ['/apiExport', '/apiAdmin', '/apiVendor', '/api'],
    createProxyMiddleware({
      target: 'https://api.gearfocus.div4.pgtest.co/api',
      changeOrigin: true,
      secure: true,
      pathRewrite: {
        '^/apiExport': '',
        '^/apiVendor': '',
        '^/apiAdmin': '',
        '^/api': '',
      },
      onProxyReq: function (proxyReq, req, res) {
        // proxyReq.removeHeader('Origin');
      },
      router,
      logLevel: 'debug',
    }),
  );
};
