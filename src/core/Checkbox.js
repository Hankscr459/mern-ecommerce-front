import React, { useState } from 'react'

const Checkbox = ({ categories, handleFilters }) => {
    const [checked, setCheked] = useState([])
    const handleToggle = c => () => {
        // return the first index or -1
        const currentCategoryId = checked.indexOf(c);
        const newCheckedCategoryId = [...checked];
        // if currently checked was not already in checked state > push
        // else pull/take off
        if (currentCategoryId === -1) {
            newCheckedCategoryId.push(c);
        } else {
            newCheckedCategoryId.splice(currentCategoryId, 1);
        }
        // console.log(checked.indexOf(c));
        //console.log(newCheckedCategoryId);
        setCheked(newCheckedCategoryId);
        // console.log(checked);
        handleFilters(newCheckedCategoryId)
    };

    return categories.map((c, i) => (
        <li key={i} className='list-unstyled'>
            <label className='form-check-label'>
                <input
                    onChange={handleToggle(c._id)}
                    // This code means that if category id is not found (=== -1) in checked[]
                    // value={checked.indexOf(c._id === -1 )} 
                    type='checkbox' 
                    className='form-check-input' 
                />
                {c.name}
            </label>
        </li>
    ))
}

export default Checkbox;