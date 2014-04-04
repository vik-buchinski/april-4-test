var users = [];

/*
 * GET users listing.
 */

exports.list = function (req, res) {
  res.json(users);
};

exports.create = function (req, res) {
  users.push({ id: users.length + 1, name: req.body.name });
  res.json(users[users.length - 1]);
};

exports.destroyList = function (req, res) {
  users = [];
  res.json(users);
};

exports.update = function (req, res) {
  var id = req.params.id;
  var user = users[id - 1];

  user.name = req.body.name;

  res.json(user);
};
