import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import ShowImage from './ShowImage';
import { addItemTocart, updateProductCount, removeCartItem } from './cartHelpers'

export const Card = ({ product, 
    isViewButtonEnabled = true, 
    showAddtoCartButton = true,
     showUpdateCart = false, 
     showRemoveButton = false,  
     setRun = f => f,
    run = undefined // default value of undefined 

    }) => {

    const [redirect, setRedirect] = useState(false);
    const [count, setCount] = useState(1);

    const showViewProductButton = isViewButtonEnabled => {
        return (
            isViewButtonEnabled && <Link to={`/product/${product._id}`}>
                <button className="btn btn-outline-primary mt-2  mr-2 mb-2">
                    View Product
             </button>
            </Link>
        )
    }

  
    const redirectToCart = (redirect) => {
        if (redirect) {
            return (<Redirect to='/cart' />)
        }
    }

    const addToCart = () => {
        console.log('Add to cart')
        addItemTocart(product, () => { setRedirect(true) })

    }

    const handleChange = id => event => {
        console.log(id)
        setRun(!run); // run useEffect in parent Cart
        setCount(event.target.value < 1 ? 1 : event.target.value);
        if (count >= 1) {
            updateProductCount(id, event.target.value)
        }

    }

    const handleRemove = (id) => {
        setRun(!run); // run useEffect in parent Cart
        console.log('REMOVE ', product._id)
       removeCartItem(id);
    }

    const showRemoveButtonComponent = show => {

        return (
            show && <button onClick={()=>{handleRemove(product._id);  setRun(!run); }} className="btn btn-outline-warning mt-2 mr-2 mb-2">
                Remove
             </button>
        )

    }

    const showCartButton = showAddtoCartButton => {
        return (
            showAddtoCartButton && <button onClick={addToCart} className="btn btn-outline-warning mt-2 mr-2 mb-2">
                Add to cart
             </button>
        )
    }


    const showUpdateCartComponent = show => {
        if (show) {
            return (
                <div>
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text">Adjust Quantity</span>
                        </div>
                        <input type="number" className="form-control" value={count} onChange={handleChange(product._id)} />
                    </div>
                </div>
            )
        }
    }
    return (



        <div className="card  mb-2 mr-4">
            {redirectToCart(redirect)}
            <div className="card-header">
                {product.name}
            </div>
            <div className="card-body">
                <ShowImage product={product} url={'product'} />
                <p>{product.description}</p>
                <p>${product.price}</p>
                {showViewProductButton(isViewButtonEnabled)}

                {showCartButton(showAddtoCartButton)}
                {showRemoveButtonComponent(showRemoveButton)}
                {showUpdateCartComponent(showUpdateCart)}
   
            </div>
        </div>

    )
}