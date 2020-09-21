'use strict';

const nconf = require('nconf');

nconf.env().argv();

const environment = nconf.get('NODE_ENV') || 'development';

module.exports = require(`${__dirname}/env/${environment}`);