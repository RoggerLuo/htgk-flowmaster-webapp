import React from 'react'
import  './style'
import Button from './ButtonConfig.jsx'
import List from './List'

const ApproveNode = ({ data, cate, put }) => {
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
                <List data={data} cate={cate}/>
            ):null}

            <div className="property-row-title">{put('approveNode.remark.title')}</div>
            <div className="property-row-content">{put('approveNode.remark.content')}</div>
        </div>
    )
}
import connectPut from 'react-put'
const options = {mapPropToDictionary: (props)=>window.reactI18n}
const ConnectedApp = connectPut(options)(ApproveNode)

export default ConnectedApp
