'use strict';

const swagger = require('platform.shared.swagger-resilient');


module.exports = function(server) {

    var ds = server.loopback.createDataSource('Swagger', {
    connector: 'loopback-connector-swagger',
    spec: './swagger.json',
    swaggerClient: false});

  ds.once('connected', function() {
    ds.createModel('MiddleService', {});
  });

};