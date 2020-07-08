const User = require('../models/user');
const braintree = require('braintree')
require('dotenv').config();

const gateway  =  braintree.connect({
    environment : braintree.Environment.Sandbox,
    merchantId : process.env.BRAIN_TREE_CLIENT_ID,
    publicKey: process.env.BRAIN_TREE_PUBLIC_KEY,
    privateKey : process.env.BRAIN_TREE__PRIVATE_KEY
})

exports.generateToken = ((req, res) =>{
    gateway.clientToken.generate({}, function(err, response){
        if(err){
            res.status(500).send(err);
            return;
        }
        res.send(response);
    })
})

exports.processPayment  = (req, res)=>{

    let nonceFromClient  =  req.body.paymentMethodNonce;
    let amountFromClient  =  req.body.amount;

    let newTransaction =  gateway.transaction.sale({
        amount : amountFromClient,
        paymentMethodNonce: nonceFromClient,
        options: {
            submitForSettlement: true
        }
    }, (error, result)=>{

        if(error){
            res.status(500).json(error);
            return
        }

        res.json(result);
        res.end();

    })

}
