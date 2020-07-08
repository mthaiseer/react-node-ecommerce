const User = require('../models/user');
const { Order, CartItem } = require('../models/order')
const { errorHandler} = require('../helpers/dbErrorHelper')

exports.createOrder =  (req, res) =>{
    //console.log('CREATE ORDER', req.body)
    req.body.order.user =  req.profile;
    const order  = new Order(req.body.order);

    order.save((error, data) =>{
        if(error){
            return res.status(400).json({
                error: errorHandler(error)
            })
        }
        res.json(data);
    })

}

exports.listOrders  =  (req, res) =>{
    Order.find()
      .populate("user", "_id  name  address")
      .sort('-created')
      .exec((err, orders) =>{
          if(err){
              res.status(400).json({
                error: errorHandler(error) 
              })
          }
          res.json(orders);

      })
}

exports.listOrderStatus  = (req,res) =>{
    res.json(Order.schema.path("status").enumValues);
}

