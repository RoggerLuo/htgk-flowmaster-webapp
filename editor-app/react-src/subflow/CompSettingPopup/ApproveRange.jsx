import React from 'react'
import RolesFrame from './RolesFrameConf'
import Button from './ButtonConf'

export default ({ data ,put }) => {//data,
    const choosed = (item)=>{
        // dispatch({type:'dropdown1Choose',item})
    }
    const getData = () => {
        return [{text:'123',value:'456'},{text:'1235',value:'4565'}]
    }
    const choosedOption = {text:'123',value:'456'}

    return(
        <div>

            <div className="property-row-title"> 
                设置子流程发起后第一个节点的审批人范围
            </div>
            <div style={{display:'flex'}}>
                <div style={{width:'230px',height:'34px'}}>
                    <RolesFrame data = {data}/>
                </div>
                <div style={{position:'relative',top: '4px',left: '5px'}}>
                    <Button >
                        <i style={{paddingLeft: '1px'}} className="icon iconfont icon-tianjia"></i>
                    </Button>
                </div>
            </div>
      
        </div>
    )
}

