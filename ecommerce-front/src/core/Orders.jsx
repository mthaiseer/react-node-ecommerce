import React, { useState, useEffect } from 'react';
import Layout from './Layout'
import { isAuthenticated } from '../api/auth';
import { listAllOrders, listAllOrderStatus } from '../api/order/orderApi';
import moment from "moment";

const Orders = () => {

    const [orders, setOrders] = useState([]);
    const [error, setError] = useState(false);
    const [status, setStatus] = useState([]);

    const { user, token } = isAuthenticated();

    const getAllOrders = (token, id) => {

        listAllOrders(token, id)
            .then(res => {
                if (res.error) {
                    setError(res.error);
                    return;
                }

                setOrders(res);
            })

    }

    const handleChange  =  (e, id) =>{
        console.log('handle change of status '+ id)
    }

    const showStatus =  (o)  =>(
        <div className="form-group">
            <h3 className="mark mb-4">{o.status}</h3>
            <select className="form-control" onChange={ (e) => handleChange(e, o._id)}>
                <option>---Update status---</option>
                {status.map((s, i) =>(
                    <option key={i} value={s}>{s}</option>
                ))}

            </select>
        </div>
    )

    const getAllOrderStatusApi =  (token, id) =>{
        listAllOrderStatus(token, id)
        .then(res =>{
            if(res.error){
                return setError(res.error);
            }
            console.log(res);
            setStatus(res);
        }).catch(ex =>{
            console.log(ex)
        })


    }


    const showOrdersLength = () => {
        if (orders.length > 0) {
            return (
                <h1 className="text-danger display-2">
                    Total orders: {orders.length}
                </h1>
            );
        } else {
            return <h1 className="text-danger">No orders</h1>;
        }
    };

    useEffect(() => {
        getAllOrders(token, user._id)
        getAllOrderStatusApi(token, user._id)
    }, []);

    const showInput = (key, value) => (
        <div className="input-group mb-2 mr-sm-2">
            <div className="input-group-prepend">
                <div className="input-group-text">{key}</div>
            </div>
            <input
                type="text"
                value={value}
                className="form-control"
                readOnly
            />
        </div>
    );

    return (
        <Layout title="Order details" description="Please find order details here" className='container'>

            <div className="row">
                <div className="col-md-8 offset-md-2">
                    {showOrdersLength()}

                    {orders.map((o, oIndex) => {
                        return (
                            <div
                                className="mt-5"
                                key={oIndex}
                                style={{ borderBottom: "5px solid indigo" }}
                            >
                                <h2 className="mb-5">
                                    <span className="bg-primary">
                                        Order ID: {o.user._id}
                                    </span>
                                </h2>

                                <ul className="list-group mb-2">

                                    <li className="list-group-item">
                                        status: {showStatus(o)}
                                    </li>

                                    <li className="list-group-item">
                                        Transaction ID: {o.transaction_id}
                                    </li>
                                    <li className="list-group-item">
                                        Amount: ${o.amount}
                                    </li>
                                    <li className="list-group-item">
                                        Ordered by: {o.user.name}
                                    </li>
                                    <li className="list-group-item">
                                        Ordered on:{" "}
                                        {moment(o.createdAt).fromNow()}
                                    </li>
                                    <li className="list-group-item">
                                        Delivery address: {o.address}
                                    </li>
                                </ul>

                                <h3 className="mt-4 mb-4 font-italic">
                                    Total products in the order:{" "}
                                    {o.products.length}
                                </h3>

                                {o.products.map((p, pIndex) => (
                                    <div
                                        className="mb-4"
                                        key={pIndex}
                                        style={{
                                            padding: "20px",
                                            border: "1px solid indigo"
                                        }}
                                    >
                                        {showInput("Product name", p.name)}
                                        {showInput("Product price", p.price)}
                                        {showInput("Product total", p.count)}
                                        {showInput("Product Id", p._id)}
                                    </div>
                                ))}


                            </div>
                        );
                    })}
                </div>
            </div>

        </Layout>
    )

}

export default Orders;