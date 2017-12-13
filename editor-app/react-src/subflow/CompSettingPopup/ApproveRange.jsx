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
    const isEmpty = data.length == 0
    return(
        <div>

            <div style={{fontSize:'14px',fontWeight:'600',marginBottom:'10px'}}> 
                设置子流程发起后第一个节点的审批人范围
            </div>
            <div style={{display:'flex',marginTop:'10px'}}>
                

                <div style={{width:'230px',height:'49px'}}>
                    {isEmpty?(<div style={{height:'43px', width:'230px',border: '1px solid #c5c5c5'}}></div>):(<RolesFrame data = {data}/>)}
                </div>


                <div style={{position:'relative',top: '11px',left: '5px'}}>
                    <Button >
                        <i style={{paddingLeft: '1px'}} className="icon iconfont icon-tianjia"></i>
                    </Button>
                </div>
            </div>
      
        </div>
    )
}

