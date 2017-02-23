'use strict';

var loopback = require('loopback');
var log = require('../lib/logger');

module.exports = function(Person) {

/************** GetUSer Method ***********/
Person.remoteMethod('getPeronFromMiddle',{
    http: {
        path: '/:id',
        verb: 'get'
    },
    accepts:[
        {
            arg: 'id',
            type: 'number',
            required: true,
            description:"get user by id"
        }
    ],
    returns:{
        arg: 'body',
        type: 'person',
        root: true

    }
});

Person.getPeronFromMiddle = function(paramId,cb){
       
    var MiddleService = loopback.getModel('MiddleService');

    MiddleService.GetUserInfoUsingGET({},handleResponse);

    function handleResponse(err, res) {
        log.info('handling response');
      if (err) {
        log.error('Error: ', err);
        cb(err, 'Error Occured');
      } else {
        log.info('Success');
        log.info('Response Status Code From Middle: ', res.status);
        log.info('Response Data From Middle: ', res.data);
        //middle is sending a JSON response no need to parse
        cb(null, res.data);
      }
    }
};
    /************** Post  Method ***********/
Person.remoteMethod('postUserToMiddle',{
    http: {
        path: '/',
        verb: 'post'
    },
    accepts:[
        {
            arg: 'person',
            type: 'person',
            http: {source: 'body'},
            required: true,
            description: 'person'
         }
    ],
    returns:{
        arg: 'body',
        type: 'person',
        root: true
    } 
});

Person.postUserToMiddle = function(paramPerson, cb){
    //  var MiddleService = loopback.getModel('MiddleService');

    // log.debug('paramGreeting', paramGreeting);

    // MiddleService.createUsingPUT({greeting: paramGreeting,
    //   ACCEPT: '*/*'},
    //   {responseContentType: 'application/json',
    //     contentType: 'application/json',
    //     accept: 'application/json'},
    //   handleResponse
    // );

    // function handleResponse(err, res) {
    //   if (err) {
    //     log.error(err.status);
    //     log.error('Error: ', err);
    //     cb(err, 'Error Occurred');
    //   } else {
    //     log.info('Success');
    //     log.info('Response Status Code From Middle: ', res.status);
    //     //middle is not sending in data any more for PUT requests
    //     cb(null, 'Successfully added Greeting');
    //   }
    //   // Make adjustments to the middle payload before sending out as edge payload, as needed
    // }

    cb(null, 'Successfully added Person');
};

};





