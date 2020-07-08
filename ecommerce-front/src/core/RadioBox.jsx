import React from 'react';

const RadioBox = ({ prices, handleFilters }) => {

    const handleChange = (e) => {
        handleFilters(e.target.value)
    }

    return prices.map((p, i) => (
        <div key={i}>
            <input 
                type="radio" 
                onChange={handleChange} 
                name ={p}
                value={p._id} 
                className="mr-2 ml-4" 
            />
            <label className="form-check-label">{p.name}</label>
        </div>
    ))

}

export default RadioBox;

