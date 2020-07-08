const formidable = require('formidable');
const _ = require('lodash');
const fs = require('fs');
const Product = require('../models/product');
const {
    errorHandler
} = require('../helpers/dbErrorHelper');

exports.updateProduct = (req, res) => {

    /* formidable used to handle form data  */
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: 'Image could not be uploaded'
            })
        }

        const {
            name,
            description,
            price,
            category,
            quantity,
            shipping
        } = fields;

        if (!name || !description || !price || !category || !quantity || !shipping) {
            return res.status(400).json({
                error: 'All mandatory fields are required'
            });
        }

        let product = req.product;
        product = _.extend(product, fields)


        if (files.photo) {
            if (product.photo.size > 1000000) {
                res.json({
                    error: 'Image size should be less that 1 MB'
                })
            }

            product.photo.data = fs.readFileSync(files.photo.path);
            product.photo.contentType = files.photo.type
        }


        product.save((err, data) => {
            if (err) {
                return res.json({
                    error: errorHandler(err)
                })
            }
            res.json(data);
        })

    })

}
exports.deleteProduct = (req, res) => {
    const product = req.product;
    product.remove((err, data) => {
        if (err) {
            return res.json({
                error: errorHandler(err)
            })
        }

        res.json({
            message: 'Product removed successfully!!!'
        })
    })
}

exports.findProductById = (req, res) => {

    let product = req.product;
    //makes photo not to load 
    product.photo = undefined;
    res.json({
        product
    })
};

exports.createProduct = (req, res) => {

    /* formidable used to handle form data  */
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: 'Image could not be uploaded'
            })
        }

        const {
            name,
            description,
            price,
            category,
            quantity,
            shipping
        } = fields;

        if (!name || !description || !price || !category || !quantity || !shipping) {
            return res.status(400).json({
                error: 'All mandatory fields are required'
            });
        }

        let product = new Product(fields);

        //1 MB  = 1000000 
        if (files.photo) {
            if (product.photo.size > 1000000) {
                res.json({
                    error: 'Image size should be less that 1 MB'
                })
            }

            product.photo.data = fs.readFileSync(files.photo.path);
            product.photo.contentType = files.photo.type
        }


        product.save((err, data) => {
            if (err) {
                return res.json({
                    error: errorHandler(err)
                })
            }
            res.json(data);
        })

    })
}

/**
 * sell / arrival
 * by sell = /products?sortBy=sold&order=desc&limit=4
 * by arrival = /products?sortBy=createdAt&order=desc&limit=4
 * if no params are sent, then all products are returned
 */
exports.listProduct = async (req, res) => {
    const sortBy = req.query.sortBy ? req.query.sortBy : '_id'
    const order = req.query.order ? req.query.order : 'asc'
    const limit = req.query.limit ? parseInt(req.query.limit) : 6;

    try {

        const data = await Product.find()
            .select('-photo')
            .populate('category')
            .sort([
                [sortBy, order]
            ])
            .limit(limit);

        if (!data) {
            return res.status(404).json({
                error: 'No product found'
            });
        }
        return res.json(data)


    } catch (e) {
        console.log('Error', e)
        res.json({
            error: errorHandler(e)
        });
    }
}

exports.relatedProducts =  async (req,res)=>{
     const limit  = req.query.limit? parseInt(req.query.limit): 6;
     try{
        const data  = await Product.find({_id: {$ne : req.product}, category: req.product.category})
                                    .populate('category', '_id name')
                                    .select('-photo')
                                    .limit(limit);
        if(!data){
            return res.status(404).json({
                error : 'No product found under this selection critiria'
            })
         }
         return res.json(data)
     }catch(e){
        console.log('Error', e)
        res.json({
            error: errorHandler(e)
        }); 
     }
}

exports.productCategories = async (req, res) =>{
    try{

        const data  = await Product.distinct('category');
        if(!data){
            return res.status(404).json({
                error : 'No product categories found'
            })
        }
        return res.json(data)


    }catch(e){
        console.log('Error', e)
        res.json({
            error: errorHandler(e)
        }); 
    }
}

exports.productSearchByFilter  = async (req, res) =>{
    let order = req.body.order ? req.body.order : "desc";
    let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
    let limit = req.body.limit ? parseInt(req.body.limit) : 100;
    let skip = parseInt(req.body.skip);
    let findArgs = {};
 
    // console.log(order, sortBy, limit, skip, req.body.filters);
    // console.log("findArgs", findArgs);
 
    for (let key in req.body.filters) {
        if (req.body.filters[key].length > 0) {
            if (key === "price") {
                // gte -  greater than price [0-10]
                // lte - less than
                findArgs[key] = {
                    $gte: req.body.filters[key][0],
                    $lte: req.body.filters[key][1]
                };
            } else {
                findArgs[key] = req.body.filters[key];
            }
        }
    }

    console.log('filters : ',findArgs)
 
    await Product.find(findArgs)
        .select("-photo")
        .populate("category")
        .sort([[sortBy, order]])
        .skip(skip)
        .limit(limit)
        .exec((err, data) => {
            if (err) {
                return res.status(400).json({
                    error: "Products not found"
                });
            }
            res.json({
                size: data.length,
                data
            });

           //res.json(data);
        });
}

exports.photo = (req, res, next) =>{
    if(req.product.photo.data){
        res.set('Content-type', req.product.photo.contentType);
        return res.send(req.product.photo.data)
    }
    next();
}

exports.listSearch =   (req, res) => {
    console.log('calliing list search')
    // create query object to hold search value and category value
    const query = {};
    // assign search value to query.name
    if (req.query.search) {
        query.name = { $regex: req.query.search, $options: 'i' };
        // assigne category value to query.category
        if (req.query.category && req.query.category != 'All') {
            query.category = req.query.category;
        }
        // find the product based on query object with 2 properties
        // search and category

        console.log(query)
          Product.find(query, (err, products) => {
            if (err) {
                return res.status(400).json({
                    error: errorHandler(err)
                });
            }
            console.log('PRODUCTS ',products)
            res.json(products);
        }).select('-photo');
    }
};

exports.decreaseOrderQuantity  = (req, res, next)=>{
    let bulkOps =  req.body.order.products.map((item) =>{
        return{
            updateOne :{
                filter: {_id: item._id},
                update : {$inc:{quantity: -item.count, sold: +item.count}}
            }
        };
    });

    Product.bulkWrite(bulkOps, {}, (error, data) =>{
        if(error){
            res.status(400).json({
                error: 'Could not update product'
            })
            next();
        }
    })
}