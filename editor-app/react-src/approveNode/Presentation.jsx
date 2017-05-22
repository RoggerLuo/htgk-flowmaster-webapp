import React,{createClass} from 'react';
import  './style'
import CharacterContainer from './CharacterContainer'
import ButtonContainer from './ButtonContainerOfApproveNode.jsx'
import SolidFrame from '../presentations/SolidFrame/SolidFrame'

const ApproveNode = ({data,put}) => {
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
                <div style={{lineHeight: '24px'}}>{put('approveNode.title.staff')}</div>
                
                <div style={{display:display1}}>
                    <ButtonContainer>    
                        <i style={{paddingLeft: '1px'}} className="icon iconfont icon-tianjia"></i>
                    </ButtonContainer>    
                </div>
            </div>            
            <div style={{display:display2}}>
                <ButtonContainer>    
                    <div className="mybutton" >
                        {put('approveNode.button.add')}
                            <i className="icon iconfont icon-tianjia"></i>
                    </div>
                </ButtonContainer>    
            </div>
            {list}
            <div className="row-title">{put('approveNode.remark.title')}</div>
            <div className="the-content">{put('approveNode.remark.content')}</div>
        </div>
    )
}
import connectPut from 'react-put'
const options = {mapPropToDictionary: (props)=>window.reactI18n}
const ConnectedApp = connectPut(options)(ApproveNode)

export default ConnectedApp
