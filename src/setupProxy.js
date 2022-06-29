/* eslint-disable */
const { createProxyMiddleware } = require('http-proxy-middleware');

const router = {
  // '/api': 'http://api.training.div3.pgtest.co/api/v1',
  '/api': 'https://api.gearfocus.div4.pgtest.co/api',
  '/apiAdmin': 'https://api.gearfocus.div4.pgtest.co/apiAdmin',
  '/apiVendor': 'https://api.gearfocus.div4.pgtest.co/apiVendor',
};

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://api.gearfocus.div4.pgtest.co/api',
      changeOrigin: true,
      secure: false,
      pathRewrite: {
        '^/api': '',
      },
      onProxyReq: function (proxyReq, req, res) {
        proxyReq.removeHeader('Origin');
      },
      router,
      logLevel: 'debug',
    }),
  );
};
