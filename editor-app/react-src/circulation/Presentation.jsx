import React from 'react'
import  './style'
import Button from './ButtonConf'
import ApprovePool from './approvePool'
import NextHalfText from './NextHalfText'

const ApproveNode = ({ data, put }) => {
    const isListEmpty = data.length == 0
    return(
        <div className="react-approve">
            <div className="row-title" style={{display:'flex',justifyContent:'space-between'}}>
                <div style={{lineHeight: '30px'}} className="property-row-title-only-font">
                    {put('approveNode.title.staff')}
                </div>
                {!isListEmpty?(
                    <Button>    
                        <i style={{paddingLeft: '1px'}} className="icon iconfont icon-tianjia"></i>
                    </Button>    
                ):null}
            </div>    

            {isListEmpty?(
                <Button>    
                    <div className="mybutton" >
                        {put('approveNode.button.add')}
                            <i className="icon iconfont icon-tianjia"></i>
                    </div>
                </Button>    
            ):null}
            {!isListEmpty?(
                <ApprovePool data={data} />
            ):null}
            <NextHalfText put={put}/>
            <div style={{height:'270px',width:'1px'}}></div>
        </div>
    )
}

import connectPut from 'react-put'
const options = {mapPropToDictionary: (props)=>window.reactI18n}
const ConnectedApp = connectPut(options)(ApproveNode)

export default ConnectedApp
