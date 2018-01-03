import React from 'react'
import Radios from './Radios'

const ApproveNode = ({ put }) => {
    return(
        <div>
            
            <div className="property-row-title"> 
                子流程阻塞设置
            </div>

            <label htmlFor={"withdraw"} style={{cursor:'pointer'}}>
                <Radios />
            </label>

        </div>
    )

}

export default rdx.i18nPut(ApproveNode) 

