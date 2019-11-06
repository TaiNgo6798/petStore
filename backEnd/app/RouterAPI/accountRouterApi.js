var express = require("express");
var Account = require("./../model/account");
const apiRouterAccount = express.Router();


apiRouterAccount
.route("/accounts")
  .get((req, res) => {
    Account.find((err, accounts) => {
      console.log(req.decoded);
      
      return res.json(accounts);
    });
  });

apiRouterAccount
  .route("/accounts/:account_id")
  .get((req, res) => {
    Account.findById(req.params.account_id).exec((err, account) => {
      if (err) {
        res.send(err);
      } else {
        res.json(account);
      }
    });
  })
  .put((req, res) => {
    Account.findById(req.params.account_id).exec((err, account) => {
      if (err) {
        res.send(err);
      } else {
        if (req.body.name) {
          account.name = req.body.name;
        }
        if (req.body.image) {
          account.image = req.body.image;
        }
        if (req.body.password) {
          account.password = req.body.password;
        }

        account.save(err=>{         
        // Account.updateOne({_id: req.params.account_id },account, err => {
          if (err) {
            res.send(err);
          } else {
            res.json({
              message: "Account updated!"
            });
          }
        });
      }
    });
  })
  .delete((req, res) => {
    Account.remove({ _id: req.params.account_id }).exec((err, account) => {
      if (err) {
        res.send(err);
      } else {
        res.json({
          message: "Delete successfully!"
        });
      }
    });
  });

module.exports = apiRouterAccount;