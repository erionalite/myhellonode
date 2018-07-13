var tedious = require('tedious');

var Connection = tedious.Connection;
var Request = tedious.Request;

 var config = {  
        userName: 'myhellonode',  
        password: 'Luljeta79Gj',  
        server: 'myhellonodesql.database.windows.net',  
        // If you are on Microsoft Azure, you need this:  
        options: {encrypt: true, database: 'myhellonodedb',rowCollectionOnRequestCompletion : true}  
    };  
var createUsers = function(callback){
    var connection = new Connection(config);
   connection.on('connect',function(err){
       if(err){
           callback(err);
       }else{
           var request = new Request(
               `
                    Insert into users (name,email) values ('scott','scott@gmail.com')
                    Insert into users (name,email) values ('Allen','allen@gmail.com')
               `,function(err,rowCount){
                   callback(err,rowCount);
                }
               );
            connection.execSql(request); 
       }
   });
   
};
var queryUsers = function(callback){
  var connection = new Connection(config);
  connection.on('connect',function(err){
      if(err) callback(err);
      else{
        var request = new Request("select * from users", function(err,rowCount,rows){
          callback(err,rowCount,rows)
        });
        connection.execSql(request)
      }
     
  });
  
};
module.exports = {
    createUsers:createUsers,
    queryUsers:queryUsers
}