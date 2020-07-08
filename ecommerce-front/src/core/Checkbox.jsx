import React, { useState } from 'react';

const Checkbox = ({ categories, handleFilters }) => {
 
    const[categoryList, setCategoryList] = useState([]);


    const handleChange = id=> ()=>{
       const newCategoryList = [...categoryList]
       const index = newCategoryList.indexOf(id);

       if(index  === -1){
          //add to list if id not found
          newCategoryList.push(id);
       }else{
        //remove from list if user deselect
        newCategoryList.splice(id, 1) 
       }
 
       //console.log(newCategoryList)
       setCategoryList(newCategoryList)
       //pass array to parent SHOP component 
       handleFilters(newCategoryList);

    }
    return categories.map((c, i) => (
        <li key={i} className="list-styled">
            <input type="checkbox"  value ={categoryList.indexOf(c._id)=== -1 } onChange={handleChange(c._id)} className="form-check-input" />
            <label className="form-check-label">{c.name}</label>
        </li>
  ))
}

export default Checkbox;