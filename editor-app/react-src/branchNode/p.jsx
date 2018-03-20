import React from 'react'
import  './style'
import SolidFrame from '../presentations/SolidFrame/SolidFrame'
import Dropdown from './dropdown.jsx'

// const optionsData = [ {//需要通过angular 和 oryx获得
//         value:'',
//         text:'分支1'
//     },
//     {
//         value:'',
//         text:'分枝2'
//     },
//     {
//         value:'',
//         text:'分枝3'
//     }
// ]

const BranchNode = ({ choosedText,choosed,data,put,choosedOption }) => {
    return(
        <div className="react-approve" style={{height: '91px'}}>
            <div className="row-title" style={{justifyContent:'space-between'}}>
                <div>{put('approveNode.title.staff')}</div>
            </div>    
            <div style={{paddingBottom: '8px',color:'#333',fontSize:'13px'}}>如果所有分支条件都不满足，则流向以下节点：</div>
            <div style={{display: 'flex',position: 'absolute',width: '100%',paddingRight: '22px'}}>
                <Dropdown options={data} choose={choosed} choosedOption={choosedOption}/>
            </div>
        </div>
    )
}

export default rdx.i18nPut(BranchNode)
