import React from 'react'

export default ({index2,index,text,checked}) => {
    const onchange = () => {}
    return (
        <div>
            <input 
                onChange={onchange} 
                checked={checked||false} 
                value={checked||false}
                style={{cursor:'pointer'}} 
                id={`listItem${index}${index2}`}
                name={`listItem${index}${index2}`}
                type="checkbox" 
            />  
            &nbsp;
            <label htmlFor={`listItem${index}${index2}`} style={{cursor:'pointer'}}> 
                <div className="property-row-content"> 
                    {text} 
                </div>
            </label>
        </div>
    )
}

