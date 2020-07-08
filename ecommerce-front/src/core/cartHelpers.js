export const  addItemTocart = (item, next) =>{
    let cart =  [];
    if(typeof window != 'undefined'){
        if(localStorage.getItem('cart')){
            cart =  JSON.parse(localStorage.getItem('cart'));
        }

        cart.push({
            ...item,
            count : 1
        })

        
        // remove duplicates
        // build an Array from new Set and turn it back into array using Array.from
        // so that later we can re-map it
        // new set will only allow unique values in it
        // so pass the ids of each object/product
        // If the loop tries to add the same value again, it'll get ignored
        // ...with the array of ids we got on when first map() was used
        // run map() on it again and return the actual product from the cart

        cart = Array.from(new Set(cart.map(p => p._id))).map(id => {
            return cart.find(p => p._id === id);
        });


        localStorage.setItem('cart', JSON.stringify(cart));
        next();


    }
}

export const cartSize = () =>{

    let size =  0;

    if(typeof window != 'undefined'){
        if(localStorage.getItem('cart')){
            size =  JSON.parse(localStorage.getItem('cart')).length;
            console.log('CART SIZE',size)
            return size;
        }
    }
    return size;

}

export const loadCartProducts = () =>{

    if(typeof window != 'undefined'){
        if(localStorage.getItem('cart')){
            return  JSON.parse(localStorage.getItem('cart'));
        }
    }
    return [];
}

export const  updateProductCount  = (id, count) =>{

    let cart =  [];

    if(typeof window != 'undefined'){
        if(localStorage.getItem('cart')){
            cart =  JSON.parse(localStorage.getItem('cart'));
        }

        if(cart && cart.length > 0){
            cart.map( (p, i) =>{
                if(p._id  === id ){
                   p.count = count
                }
            })
        }
        localStorage.setItem('cart', JSON.stringify(cart))
    }
    return cart;
}

export const  removeCartItem  = (id) =>{

    let cart =  [];

    if(typeof window != 'undefined'){
        if(localStorage.getItem('cart')){
            cart =  JSON.parse(localStorage.getItem('cart'));
        }

        if(cart && cart.length > 0){
            cart.map( (p, i) =>{
                if(p._id  === id ){
                   cart.splice(i, 1)
                }
            })
        }
        localStorage.setItem('cart', JSON.stringify(cart))
    }
    return cart;


}

export const clearCart =  next  =>{
    if(typeof window != 'undefined'){
        localStorage.removeItem('cart');
        next();
    }
}