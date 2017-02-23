'use strict';

/** @module boot/swagger */

const swagger = require('platform.shared.swagger-resilient');
const resilientEureka = require('platform.shared.resilient-eureka');

/**
 * Function to create Swagger connector for MiddleService
 *
 * @param {Object} server
 */

module.exports = function(server) {
  console.log('Executing Swagger Connector from Environment:',
    process.env.helloWorldEdgeEnv || '');

  console.log('Property from File:', process.env.HW_Env || '');
  console.log('Greeting from File:', process.env.HW_Greeting || '');

  var swaggerClient;
  if (true) {
    console.log('Container Id:', process.env.HOSTNAME || '');

    const eurekaConfig = {
      'instance': {
        'app': process.env.appName || 'hello-world-lb',
        'vipAddress': process.env.vipName || 'hello-world-lb',
        'hostName': process.env.appHost || 'hello-world-lb',
        'ipAddr': process.env.appIp || '',
        'port': process.env.appPort || 3000,
        'instanceId': `${process.env.HOSTNAME || ''}:${process.env.vipName ||
          'hello-world-lb'}:${process.env.appPort || 3000}`,
        'homePageUrl': process.env.homepageURL || `http://${process.env.vipName ||
          'hello-world-lb'}:${process.env.appPort || 3000}/`,
        'statusPageUrl': process.env.statuspageURL || `http://${process.env.vipName ||
          'hello-world-lb'}:${process.env.appPort ||
          3000}/${process.env.appStatusPath || ''}`,
        'healthCheckUrl': process.env.healthpageURL || `http://${process.env.vipName ||
          'hello-world-lb'}:${process.env.appPort ||
          3000}/${process.env.appHealthPath || ''}`,
        //for local use have com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo
        'class': process.env.eurekaInstanceClass ||
          'com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo',
        // for local use MyOwn
        'name': process.env.eurekaInstanceName || 'MyOwn',
      },
      'eureka': {
        'host': process.env.eurekaHost ||
          'localhost',
        'port': process.env.eurekaPort || 8761,
        'servicePath': process.env.servicePath || '/eureka/apps/',
        // to-do fix for retries till success
        'maxRetries': process.env.eurekaMaxRetries || 10000,
      },
    };

    const resilientConfig = {
      'vipAddress': process.env.serviceToConnect || 'personalization-service',
      'basePath': process.env.serviceBasePath || '/pers',
      'servers': [`http://${eurekaConfig.eureka.host}:${eurekaConfig.eureka.port}`],
    };

    const eurekaClient = resilientEureka.register(eurekaConfig);
    swaggerClient = swagger.getSwaggerResilientClient(eurekaClient,
      resilientConfig);
    console.log('Eureka Enabled');
  }

  var ds = server.loopback.createDataSource('Swagger', {
    connector: 'loopback-connector-swagger',
    spec: './swagger.json',
    swaggerClient: swaggerClient || false,
  });

  ds.once('connected', function() {
    ds.createModel('MiddleService', {});
  });
};
