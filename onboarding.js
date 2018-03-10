const PrismicConfig = require('./prismic-configuration');
const request = require('request');

// https://dota.cdn.prismic.io/api
// regex to match the cdn /^(https?:\/\/([-\w]+)\.([-\w]+)\.[a-z]+\.(io|dev))\/api(\/v2)?$/

function trigger() {
  const repoRegexp = /^(https?:\/\/([-\w]+)\.[a-z]+\.(io|dev))\/api(\/v2)?$/;
  const [_, endpoint] = PrismicConfig.apiEndpoint.match(repoRegexp);
  request.post(`${endpoint}/app/settings/onboarding/run`, { form: { language: 'node', framework: 'express', 'mode': 'no-cors' } });
}

module.exports = {
  trigger,
};
