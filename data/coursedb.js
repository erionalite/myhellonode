var sampleData = require('./sampleCourses')
var docdb = require('documentdb');
var async = require('async')
var config = {
    host:'https://myhellonodeazuredb.documents.azure.com:443/',
    auth:{
        masterKey:'qTzCQGpK86g0CNZwEpHPojQZh9CnsRjj7jLntP0hzfBKKYg0RpEUqnWqtoanP2peGiOh0a06Pzhk4fUdK5vX3A=='
    }
};
var client = new docdb.DocumentClient(config.host,config.auth);
var coursesLink = docdb.UriFactory.createDocumentCollectionUri("myhellonode","courses");

var createCourses = function(callback){
    var documents = [];
    async.forEachOf(sampleData,(course,key,next)=>{
        client.createDocument(coursesLink,course,(err,document) => {
            if(err) return next(err);
            documents.push(document);
            next();
        })
    },err => callback(err,documents));
};
var queryCourses = function(callback){
    var querySpec = {
        query:"select * from c",
        parameters:[]
    }
    client.queryDocuments(coursesLink,querySpec).toArray((err,results) => {
        callback(err,results);
    })
};
module.exports = {
    createCourses:createCourses,
    queryCourses:queryCourses
};