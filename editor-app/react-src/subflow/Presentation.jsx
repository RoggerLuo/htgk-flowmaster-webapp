import React from 'react'
import  './style'
import Button from './ButtonConf'
// import RolesFrame from './RolesFrameConf'
import NextHalfText from './NextHalfText'
import SolidFrame from '../presentations/SolidFrame/SolidFrame'

const ApproveNode = ({ currentRepo, put, add, setting }) => {
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
                                style={{paddingLeft: '1px',cursor:'pointer'}} 
                                className="icon iconfont icon-gantanhao-yuankuang">
                            </i>
                            <i 
                                onClick={setting} 
                                style={{paddingLeft: '1px',cursor:'pointer'}} 
                                className="icon iconfont icon-gantanhao-yuankuang">
                            </i>
                        </div>
                    </div>
                </SolidFrame>
            )}
            <NextHalfText put={put}/>
        </div>
    )
}
/*
{!isListEmpty?(
    <RolesFrame data={data} />
):null}

{!isListEmpty?(
    <Button>    
        <i style={{paddingLeft: '1px'}} className="icon iconfont icon-tianjia"></i>
    </Button>    
):null}


*/
import connectPut from 'react-put'
const options = {mapPropToDictionary: (props)=>window.reactI18n}
const ConnectedApp = connectPut(options)(ApproveNode)

export default ConnectedApp


