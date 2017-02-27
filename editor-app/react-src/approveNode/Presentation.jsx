import React,{createClass} from 'react';
import  './style'
import CharacterContainer from './CharacterContainer'
import ButtonContainer from './ButtonContainerOfApproveNode.jsx'
import SolidFrame from '../presentations/SolidFrame/SolidFrame'

const ApproveNode = ({data}) => {
    let list = ''
    let display1 = 'none'
    let display2 = ''
    if(data.length != 0){
        list = (
            <SolidFrame>
                <div style={{padding:'2px'}}>
                    {data.map((el,index)=>{ //data 是 会签组, el是 一组character对象的array
                        return (<CharacterContainer index={index} el={el} key={index} />) //el 需要包含上一级 groupIndex
                    })}
                </div>
            </SolidFrame> 
        )
        display2 = 'none'
        display1 = ''
    }
    return(
        <div className="react-approve">
            <div className="row-title" style={{display:'flex',justifyContent:'space-between'}}>
                <div>审批人员</div>
                <div style={{display:display1}}><ButtonContainer><i style={{paddingLeft: '102px'}} className="icon qingicon icon-add"></i></ButtonContainer></div>
            </div>            
            <div style={{display:display2}}>
                <ButtonContainer>
                    <div className="mybutton" >
                        <span className="inverted-triangle">
                            <i className="icon qingicon icon-add"></i>
                        </span>
                        添加审批人员
                    </div>
                </ButtonContainer>
            </div>
            {list}
            <div className="row-title">审批规则</div>
            <div className="the-content">只需节点上任意一人审批即可通过</div>
        </div>
    )
}

export default ApproveNode
