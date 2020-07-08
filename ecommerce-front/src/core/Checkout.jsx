import React, { useState, useEffect } from 'react';
import { isAuthenticated } from '../api/auth/index'
import { Link } from 'react-router-dom';
import { getBrainTreeClientToken, processPayment } from '../api/braintree/brainTreeApi'
import DropIn from 'braintree-web-drop-in-react'
import { clearCart } from './cartHelpers';
import { makeOrder } from '../api/order/orderApi';


const Checkout = ({ products }) => {

    const [data, setData] = useState({
        success: false,
        error: '',
        clientToken: null,
        instance: {},
        address: ''
    })

    const getBrainTreeToken = (token, userId) => {
        getBrainTreeClientToken(token, userId)
            .then(res => {

                if (res.error) {
                    setData({ ...data, error: res.error });
                    return;
                }
                setData({ ...data, clientToken: res.clientToken });

            }).catch(e => console.log(e))
    }

    let userId = isAuthenticated() && isAuthenticated().user._id;
    let token = isAuthenticated() && isAuthenticated().token;

    useEffect(() => {
        console.log('checkout use effect called')
        getBrainTreeToken(token, userId)
    }, [])

    const buy = () => {
        let nonce;
        let amount;
       
        data.instance.requestPaymentMethod()
            .then(data => {
                // console.log(data)
                 nonce = data.nonce
                amount  =  getTotal(products)
                // console.log('Nonce and total to sent ', nonce, getTotal(products))
                const paymentPayload =  {
                    paymentMethodNonce:nonce, 
                    amount : amount
                }

                processPayment(token, userId, paymentPayload)
                 .then( res =>{

                   const  orderPayload  ={
                        products: products,
                        transaction_Id: res.transaction.id,
                        amount: res.transaction.amount,
                        address: ''
                    }

                    makeOrder(token, userId, orderPayload)
                      .then(response  =>{

                        // if(response.error){
                        //     setData({...data, error : response.error})
                        //     return;
                        // }
                        console.log(response)

                      }).catch( e => console.log(e))
   
                    setData({...data, success: res.success})
                    clearCart(()=>{
                        console.log('Payment done and cleared cart ');
                      
                    })
                }).catch( e => {
                    console.log(e);
                  
                })

            }).catch(e => {
                console.log('Error from nonce ' + e.message)
                setData({ ...data, error: e.message })
            })
    }

    const getTotal = items => {
        const total = items.reduce((accumalator, current) => {
            return accumalator + current.count * current.price
        }, 0);
        return total;
    }

    const showError = () => (
        <div className="alert alert-danger" style={{display: data.error? "" : "none"}}>
            {data.error}
        </div>

    )

    
    const showPaySuccess = (success) => (
        <div className="alert alert-danger" style={{display: data.success? "" : "none"}}>
            Thanks!!! You payment was successful
        </div>

    )

    const clearErrors  =  ()=>{
        setData({...data, error:""})
    }

    const showPaymentDropIn = () => (
        <div onBlur={()=> clearErrors()}>
            {data.clientToken !== null && products.length > 0 ? (
                <div>
                    <DropIn options={{
                        authorization: data.clientToken

                    }} onInstance={instance => data.instance = instance} />
                   { !data.success && <button onClick={buy} className="btn btn-success">Pay now</button>}

                </div>
            ) : null}
        </div>
    )

    const showCheckoutButton = () => {

        if (isAuthenticated()) {
            return (
                <div>
                    {showPaymentDropIn()}
                </div>
            )
        } else {
            return (<Link to="/login" className="btn btn-outline-warning mt-2 mr-2 mb-2">Login</Link>)
        }
    }

    return (
        <>
            <div className="row">
                {showError()}
                {showPaySuccess()}
 
            </div>
            <div className="row">
                <h2>Your Cart Summary</h2>
                 <hr />
              
            </div>
            <div className="row">
            <h4>Total Amount : ${getTotal(products)}</h4>
            </div>
            <div className="row">
                {showCheckoutButton()}
            </div>

        </>
    )
}

export default Checkout;

