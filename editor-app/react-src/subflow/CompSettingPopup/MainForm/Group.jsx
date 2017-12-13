import React from 'react'
import Dropdown from '../../basicComp/Dropdown'
import {connect} from 'react-redux'

const PartLeft = ({title}) => {
    return (
        <div  style={{width:'102px'}}>
            <div className="drop-down"  style={{width:'102px',height:'34px',marginTop:'10px'}}>
               <div className="title-tr" style={{fontSize:'13px',paddingLeft:'10px',width:'100px',lineHeight:'32px',height:'32px'}}>
                  {title}
               </div>
               <div> * </div>
            </div>
        </div>
        )
}


const PartRight = ({leftData,mainRight,dispatch}) => {
    const selectedOption = mainRight[leftData.name] || {text:'请选择',value:''}
    const optionsData = window.formProperties||[]
    const select = (item,optionInd) => {
        dispatch({type:'subflow/mainRight',fieldId,item})
    }
    return ( <div  style={{width:'342px',display: 'flex'}}>
        <div  style={{width:'160px',marginRight: '10px'}}>
        </div>
        <div style={{width:'160px'}}>
            <Dropdown data={optionsData} width={'160px'} choosedOption={selectedOption} choosed={select}/>
        </div>
    </div>
    )
}


const Group = ({leftData,mainRight,dispatch}) => {
    return (    
        <div style={{display:'flex',justifyContent: 'space-between'}}>
            <PartLeft title={leftData.title}/>
            <PartRight leftData={leftData} dispatch={dispatch}/>
        </div>
        )
}

