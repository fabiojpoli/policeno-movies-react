import Raven from 'raven-js';

function init() {
  Raven.config('https://2ab7c7d9c802449487916ae5388b9843@sentry.io/5169977', {
    release: '1-0-0',
    environment: 'development-test'
  }).install();
}

function log(error) {
  Raven.captureException(error);
}

export default {
  init,
  log
};
