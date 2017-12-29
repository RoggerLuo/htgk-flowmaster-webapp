import React from 'react'
import  './style'
import NextHalfText from './NextHalfText'
import SolidFrame from '../presentations/SolidFrame/SolidFrame'

const ApproveNode = ({ currentRepo, put, add, setting, del }) => {
    const isListEmpty = !(currentRepo.subProcess && currentRepo.subProcess.name)
    return(
        <div className="react-approve">
            <div className="row-title" style={{display:'flex',justifyContent:'space-between'}}>
                <div style={{lineHeight: '30px'}} className="property-row-title-only-font">
                    {`触发的子流程`}
                </div>
            </div>    
            
            {isListEmpty?(
                <div className="mybutton" onClick={add}>
                    {`添加触发的子流程`}
                    <i className="icon iconfont icon-tianjia"></i>
                </div>
            ):(
                <SolidFrame>
                    <div style={{display:'flex',justifyContent:'space-between'}}>
                        <div style={{textOverflow: 'ellipsis',whiteSpace: 'nowrap',overflow: 'hidden',maxWidth: '210px'}}>{currentRepo.subProcess.name||''}</div> 
                        <div>
                            <i 
                                onClick={setting} 
                                style={{paddingLeft: '1px',cursor:'pointer',marginRight:'10px'}} 
                                className="icon iconfont icon-shezhi">
                            </i>
                            <i 
                                onClick={del} 
                                style={{paddingLeft: '1px',cursor:'pointer',margin:'-6px 0 0 0',position:'relative',top:'3px'}} 
                                className="icon iconfont icon-shanchu">
                            </i>
                        </div>
                    </div>
                </SolidFrame>
            )}
            <NextHalfText put={put}/>
        </div>
    )
}


import connectPut from 'react-put'
const options = {mapPropToDictionary: (props)=>window.reactI18n}
const ConnectedApp = connectPut(options)(ApproveNode)

export default ConnectedApp


