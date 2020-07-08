const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose')
const authRouter = require('./routes/auth');
const userRouter = require('./routes/user');
const morgan  = require('morgan');
const bodyParser = require('body-parser');
const cookieParser  = require('cookie-parser');
const expressValidators  = require('express-validator');
const categoryRoutes  = require('./routes/category');
const productRoutes  = require('./routes/product');
const brainTreeRoutes  = require('./routes/braintree');
const orderRoutes  = require('./routes/order');
const cors = require('cors');

const app = express();

//connection logic to mongo atlas cloud DB 
mongoose.connect(process.env.DATABASE, {
        useNewUrlParser: true,
        useCreateIndex: true
    })
    .then(() => console.log('Database connection was successful'))
    .catch((e) => console.log('Error', e));

//middleware 
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidators());
app.use(cors());

//router middleware 
app.use('/api', authRouter);
app.use('/api', userRouter);
app.use('/api', categoryRoutes);
app.use('/api', productRoutes);
app.use('/api', brainTreeRoutes);
app.use('/api', orderRoutes);


//SERVER 
const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`server has been start on port ${port}`);
})