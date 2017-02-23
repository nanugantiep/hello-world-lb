'use strict';

module.exports = function(Person) {

Person.remoteMethod('getPeronFromMiddle',{
    http: {
        path: '/:id',
        verb: 'get'},
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
    var p = new Person();
    p.firstname= "Nara";
    p.lastname = "Anuga";
    p.Age = 25;
    p.id = 1;
    cb(null,p);
    /*
    var MiddleService = loopback.getModel('MiddleService');

    MiddleService.getByIdUsingGET(
      {id: paramId},
      handleResponse
    );

    function handleResponse(err, res) {
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
    } */
};



};
