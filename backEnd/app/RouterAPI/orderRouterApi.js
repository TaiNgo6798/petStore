var express = require("express");
var Order = require("./../model/order");
var nodemailer = require("nodemailer");
var Pet = require("./../model/pet");
var Account = require("./../model/account");
const Nexmo = require("nexmo");
const apiRouterOrder = express.Router();

const nexmo = new Nexmo({
  apiKey: "d30d8204",
  apiSecret: "SEm7ChamyASe8YBr"
});

apiRouterOrder
  .route("/orders")
  .post((req, res) => {
    var order = new Order({
      id_user: req.body.id_user,
      userImage: req.body.userImage,
      name: req.body.name,
      listProduct: req.body.listProduct,
      handle: false,
      message: "Order is being processed"
    });
    Order.collection.insertOne(order, err => {
      if (err) {
        if (err.code === 11000) {
          return res.json({
            success: false,
            message: "A order with that name has already existed!"
          });
        } else {
          res.send(err);
        }
      }
      res.json({
        message: "order created!"
      });
    });
  })
  .get((req, res) => {
    Order.find((err, orders) => {
      return res.json(orders);
    });
  });

apiRouterOrder.route("/orders/own/:id_user").get((req, res) => {
  Order.find({ id_user: req.params.id_user }, (err, orders) => {
    return res.json(orders);
  });
});

apiRouterOrder
  .route("/orders/:id_order")
  .get((req, res) => {
    Order.findById(req.params.id_order).exec((err, order) => {
      if (err) {
        res.send(err);
      } else {
        res.json(order);
      }
    });
  })
  .put((req, res) => {
    Order.findById(req.params.id_order).exec((err, order) => {
      if (err) {
        res.send(err);
      } else {
        if (req.body.handle != null) {
          order.handle = req.body.handle;
        }
        if (req.body.message != null) {
          order.message = req.body.message;
        }
        Order.updateOne({ _id: req.params.id_order }, order, err => {
          if (err) {
            res.send(err);
          } else {
            if (order.handle === true) {
              // tat mua nhung pet trong gio hang
              order.listProduct.forEach(product => {
                Pet.findById(product._id).exec((err, pet) => {
                  pet.exist = false;
                  Pet.updateOne({ _id: product._id }, pet, err => {
                    if (err) {
                      res.send(err);
                    } else {
                      res.json({
                        message: "order updated!" 
                      });
                    }
                  });
                });
              });
              //gui thong bao
              Account.findById(order.id_user).exec((err, account) => {
                //gui mail
                if (account.email) {
                  sendMail(account.email, order.message);
                }
                //gui SMS
                if (account.phone) {
                  sendSMS(account.phone, order.message);
                }
              })
            } else {
              res.send('Approved !')
            }
          }
        });
      }
    });
  })
  .delete((req, res) => {
    order.remove({ _id: req.params.id_order }).exec((err, order) => {
      if (err) {
        res.send(err);
      } else {
        res.json({
          message: "Delete successfully!"
        });
      }
    });
  });

var sendMail = (email, message) => {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "petshop16110052@gmail.com",
      pass: "datvu123"
    }
  });

  var mailOptions = {
    from: "petshop16110052@gmail.com",
    to: email,
    subject: "Confirm Pet Purchase",
    text: message
  };

  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

var sendSMS = (phone, message) => {
  const from = "PetShop";
  const to = phone;
  const text = message;

  nexmo.message.sendSms(from, to, text, (err, responseData) => {
    if (err) {
      console.log(err);
    } else {
      if (responseData.messages[0]["status"] === "0") {
        console.log("Message sent successfully.");
      } else {
        console.log(
          `Message failed with error: ${responseData.messages[0]["error-text"]}`
        );
      }
    }
  });
};

module.exports = apiRouterOrder;
