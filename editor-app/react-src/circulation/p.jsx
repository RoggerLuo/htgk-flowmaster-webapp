import React from 'react'
import  './style'
import Menu from './Menu'
import ApprovePool from './ApprovePool'
import ApproveSetting from './ApproveSetting'

const ApproveNode = ({ data, put }) => {
    const isListEmpty = data.length == 0
    return(
        <div className="react-approve">
            <div className="row-title" style={{display:'flex',justifyContent:'space-between'}}>
                <div style={{lineHeight: '30px'}} className="property-row-title-only-font">
                    {put('approveNode.title.staff')}
                </div>
                {!isListEmpty?(
                    <Menu>    
                        <i style={{paddingLeft: '1px'}} className="icon iconfont icon-tianjia"></i>
                    </Menu>    
                ):null}
            </div>    

            {isListEmpty?(
                <Menu>    
                    <div className="mybutton" >
                        {put('approveNode.button.add')}
                            <i className="icon iconfont icon-tianjia"></i>
                    </div>
                </Menu>    
            ):null}
            {!isListEmpty?(
                <ApprovePool data={data} />
            ):null}
            <ApproveSetting put={put}/>
            <div style={{height:'270px',width:'1px'}}></div>
        </div>
    )
}

import connectPut from 'react-put'
const options = {mapPropToDictionary: (props)=>window.reactI18n}
const ConnectedApp = connectPut(options)(ApproveNode)

export default ConnectedApp
