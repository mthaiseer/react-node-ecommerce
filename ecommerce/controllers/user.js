const User = require('../models/user');
const Product = require('../models/product')

exports.userById =  async (req, res, next, id) =>{
    User.findById(id).exec((err, user) =>{
        if(err){
            res.status(400).json({
                error : 'User not found'
            })
        }
        req.profile = user;
        next();
    })
}

exports.productById = (req, res, next, id) =>{
    Product.findById(id).exec( (err, product)=>{
        if(err){
            res.status(400).json({
                error : 'Product not found'
            })
        }
        req.product = product;
        next();
    })
}

exports.userProfile =  (req, res) =>{
    const user = req.profile;
    if(!user){
        return res.json({
            error: 'User profile not found'
        })
    }
    user.hashed_password = undefined;
    user.salt=undefined;
    res.json(user)
}

exports.updateProfile =  async (req, res) =>{
    try{

        const data  = await User.findByIdAndUpdate({_id: req.profile._id}, {$set: req.body}, {new: true});
        if(!data){
            return res.status(400).json({
                error : 'Oops! unable to update profile this time'
            })
        }

        data.hashed_password = undefined;
        data.salt = undefined;
        res.json(data);

    }catch(e){
        return res.status(400).json({
            error : 'Oops! unable to update profile this time'
        })
    }
    

}

exports.addOrderToUserHistory =  (req, res, next) =>{
    let history = [];

    req.body.order.products.forEach((item) =>{
        history.push({
            _id: item._id,
            name : item.name, 
            description: item.description,
            category: item.category,
            quantity: item.count,
            transactioon_id : req.body.order.transaction_Id,
            amount : req.body.order.amount
        })
    })

    User.findByIdAndUpdate(
        {
        _id: req.profile._id
        },
        {$push: {history: history}},
        {new: true},
        (error, data) =>{
            if(error){
                return res.status(400).json({
                    error: 'could not update user purchase history'
                })
            }
            next();
        }

    
    )
}
