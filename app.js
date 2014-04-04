
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// TODO: реализовать все роуты, которые нужны для прохождения тестов из test.js
// Тест можно запустить командой `./node_modules/.bin/nodeunit test.js`

// TODO: хранение пользователей организовать в памяти, без внешней базы данных

// TODO: структурировать и изолировать код обрабатывающий запросы к /users

app.get('/', routes.index);
app.get('/users', user.list);
app.post('/users', user.create);
app.put('/users/:id', user.update);
app.del('/users', user.destroyList);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
