import React from 'react';

const Sort=({options, defaultoption, value, onChange})=>{
    return(
        <div className="panel">
            <option disabled value="">{defaultoption}</option>

            <select 
                value={value}
                onChange={event=>onChange(event.target.value)}
            >
                {options.map((option)=>
                    <option key={option.value} value={option.value}>
                        {option.name}
                    </option>
                )}
            </select>
        </div>
    )
}

export default Sort;