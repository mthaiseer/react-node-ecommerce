import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { addItemTocart, loadCartProducts } from './cartHelpers'
import Layout from './Layout';
import { Card } from './Card';
import Checkout from './Checkout';


const Cart = () => {

    const [cartItems, setCartItems] = useState([]);
    const [run, setRun] = useState(false);


    useEffect(() => {
        setCartItems(loadCartProducts());
    }, [run]);


    const showCartItems = (items) => {
        return (
            <div>
                <h2>{`You have total ${items.length} items in cart`}</h2>
                {items.map((c, i) =>
                    <Card key={i}
                        product={c}
                        showUpdateCart={true}
                        showAddtoCartButton={false}
                        showRemoveButton={true}
                        setRun={setRun}
                        run={run} />
                )}
            </div>
        )
    }

    const noItemInCart = (items) => {
        return (
            items.length <= 0 && <div><span>Your cart is empty, <Link to='/shop'>continue shopping</Link></span>   </div>
        )
    }

    return (

        <Layout title="Cart Page" description="Manage your cart here" className='container-fluid'>
            <div className="row">
                <div className="col-6">
                    {showCartItems(cartItems)}
                    {noItemInCart(cartItems)}
                </div>
                <div className="col-6">
                    <Checkout products={cartItems} />
                </div>
            </div>
        </Layout>

    )
}

export default Cart;