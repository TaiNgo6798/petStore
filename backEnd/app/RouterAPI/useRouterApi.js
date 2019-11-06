var express = require("express");
var User = require("./../model/user");
const apiRouterUser = express.Router();

apiRouterUser
  .route("/users")
  .get((req, res) => {
    User.find((err, users) => {
      return res.json(users);
    });
  });

apiRouterUser
  .route("/users/:user_id")
  .get((req, res) => {
    User.findById(req.params.user_id).exec((err, user) => {
      if (err) {
        res.send(err);
      } else {
        res.json(user);
      }
    });
  })
  .put((req, res) => {
    User.findById(req.params.user_id).exec((err, user) => {
      if (err) {
        res.send(err);
      } else {
        if (req.body.name) {
          user.name = req.body.name;
        }
        if (req.body.provider) {
          user.provider = req.body.provider;
        }
        if (req.body.username) {
          user.username = req.body.username;
        }
        if (req.body.password) {
          user.password = req.body.password;
        }
        console.log(user);
        
        user.save(err=>{         
        // User.updateOne({_id: req.params.user_id },user, err => {
          if (err) {
            res.send(err);
          } else {
            res.json({
              message: "User updated!"
            });
          }
        });
      }
    });
  })
  .delete((req, res) => {
    User.remove({ _id: req.params.user_id }).exec((err, user) => {
      if (err) {
        res.send(err);
      } else {
        res.json({
          message: "Delete successfully!"
        });
      }
    });
  });

module.exports = apiRouterUser;