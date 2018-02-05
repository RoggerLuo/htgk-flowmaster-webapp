import React from 'react'
import  './style'
import Button from './ButtonConf'
import RolesFrame from './RolesFrameConf'
import NextHalfText from './NextHalfText'

const UsertaskPre = ({ data, put }) => {
    
    const isEmpty = data.length == 0
    return(
        <div className="react-approve">
            <div className="row-title" style={{display:'flex',justifyContent:'space-between'}}>
                <div style={{lineHeight: '30px'}} className="property-row-title-only-font">
                    {put('approveNode.title.staff')}
                </div>
                {!isEmpty?(
                    <Button isEmpty={false}>    
                        <i style={{paddingLeft: '1px'}} className="icon iconfont icon-tianjia"></i>
                    </Button>    
                ):null}
            </div>    

            {isEmpty?(
                <Button isEmpty={true}>    
                    <div className="mybutton" >
                        {put('approveNode.button.add')}
                            <i className="icon iconfont icon-tianjia"></i>
                    </div>
                </Button>    
            ):null}

            {!isEmpty?(
                <RolesFrame data={data}/>
            ):null}
            <NextHalfText put={put}/>
            <div style={{height:'200px',width:'1px'}}></div>
        </div>
    )
}
export default rdx.i18nPut(UsertaskPre)
