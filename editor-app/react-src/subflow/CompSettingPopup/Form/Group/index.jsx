import React from 'react'
import {connect} from 'react-redux'

export default ({leftData,mainRight,dispatch}) => {
    return (    
        <div style={{display:'flex',justifyContent: 'space-between'}}>
            <PartLeft title={leftData.title}/>
            <PartRight mainRight={mainRight} leftData={leftData} dispatch={dispatch}/>
        </div>
    )
}

