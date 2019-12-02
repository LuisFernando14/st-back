'use strict';
// var app = require('../../server/server');
// import Department from 'common/models/department.js'

module.exports = function(Employee) {
  var app = require('../../server/server');
  Employee.GetEmployees = function(cb) {
    let dataSource = Employee.dataSource;
    let cmd = `SELECT
    CONCAT(e.Nombre, ' ', e.ApPaterno, ' ', e.ApMaterno) AS 'fullName',
    FORMAT(e.FecNac, 'dd/MM/yyyy ') AS 'dob', d.Descripcion, e.Sueldo
    FROM Employee e INNER JOIN Department d ON e.Departamento = d.Puesto`;
    dataSource.connector.query(cmd, null, function(err, response) {
      console.log('en el response dentro');
      if (err)
        console.log(err);
      console.log(response);
      return cb(null, response);
    });
  };


  Employee.remoteMethod(
    'GetEmployees',
    {
      http: {path: '/pruebaTodos', verb: 'get'},
      description: 'Get list of employees',
      accepts: {},
      returns: {arg: 'data', type: []},
    }
  );
};
