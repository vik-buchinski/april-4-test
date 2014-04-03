var request = require('request');
var usersUri = 'http://localhost:3000/users';

exports.testInitialDeleteUsers = function (test) {
  test.expect(1);

  var options = {
    method: 'DELETE',
    url: usersUri,
    json: true
  };

  request(options, function (error, response, body) {
    test.deepEqual(body, [], 'DELETE /users должен возвращать пустой массив');
    test.done();
  });
};

exports.testGetUsersAfterDelete = function (test) {
  test.expect(2);

  request({ url: usersUri, json: true }, function (error, response, body) {
    test.ok(Array.isArray(body),
      'Ответ должен быть массивом сериализованным в JSON');
    test.deepEqual(body, [],
      'GET /users после запроса DELETE должен возвращать пустой массив');
    test.done();
  });
};

exports.testIdOnPostUsers = function (test) {
  test.expect(2);

  var options = {
    url: usersUri,
    json: {
      name: 'First'
    }
  };

  request.post(options, function (error, response, body) {
    test.equal(body.id, 1,
      'При создании первого пользователя ему должен присваиваться id = 1');

    options.json.name = 'Second';

    request.post(options, function (error, response, body) {
      test.equal(body.id, 2,
        'При создании второго пользователя ему должен присваиваться id = 2');

      test.done();
    });
  });
};

exports.testResponseOnPostUsers = function (test) {
  var options = {
    url: usersUri,
    json: {
      name: 'John'
    }
  };

  request.post(options, function (error, response, body) {
    test.ok(typeof body === 'object', 'Ответ должен быть объектом сериализованным в JSON');
    test.ok(typeof body.id === 'number', 'Объект должен иметь свойство id типа Number');
    test.ok(typeof body.name === 'string', 'Объект должен иметь свойство name типа String');

    test.done();
  });
};

exports.testSequenceOnGetUsers = function (test) {
  test.expect(4);

  request.get({ url: usersUri, json: true }, function (error, response, body) {
    test.equal(body.length, 3,
      'Ответ должен содержать всех трёх пользователей добавленных до сих пор');

    test.equal(body[0].name, 'First', 'Сперва должен быть First');
    test.equal(body[1].name, 'Second', 'Вторым должен быть Second');
    test.equal(body[2].name, 'John', 'Третьим идёт John');

    test.done();
  });
};

exports.testDeleteUsers = function (test) {
  test.expect(1);

  request({ method: 'DELETE', url: usersUri }, function () {
    request.get({ url: usersUri, json: true }, function (error, response, body) {
      test.equal(body.length, 0, 'После удаления, GET /users должен отвечать пустым массивом');
      test.done();
    });
  });
};
