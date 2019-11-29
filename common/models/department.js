'use strict';

module.exports = function(Department) {

  Department.GetDepartments = function(cb) {
    let dataSource = Department.dataSource;
    let cmd = 'select * from Department';
    dataSource.connector.query(cmd, null, function(err, response) {
      if (err)
        console.log(err);
      console.log(response);
      return cb(null, response);
    });
  };

  Department.remoteMethod(
    'GetDepartments',
    {
      http: {path: '/departamentos', verb: 'get'},
      description: 'Obtiene lista de departamentos',
      accepts: {},
      returns: {arg: 'data', type: '[Department]'},
    }
  );
};
