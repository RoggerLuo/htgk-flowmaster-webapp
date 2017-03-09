import React,{createClass} from 'react'
import CharacterContainer from '../CharacterContainer'
import SolidFrame from '../../presentations/SolidFrame/SolidFrame'
import BoardbuttonContainer from '../ButtonContainer'
import './ApproveGroup.less'

const ApproveGroup = ({data,mode,solidFrame,index,put}) => { 
    if(mode == 'initial'){
        return (
            <SolidFrame {...solidFrame}> 
                <div style={{display:'flex'}}>
                    <div style={{flex:'1'}}>
                        <div style={{fontSize:'14px',paddingLeft:'2px'}}>{put('parallel.group',(index+1))}</div>
                        <div></div>
                    </div>
                    <div style={{}}>
                        <BoardbuttonContainer index={index}>
                            <div style={{paddingLeft: '27px',color:'#00b0ff',fontSize:'14px'}}>{put('parallel.addGroup')}</div>
                        </BoardbuttonContainer>
                    </div>
                </div>
            </SolidFrame>
        )
    }else{
        return (
            <SolidFrame {...solidFrame}>
                <div style={{display:'flex'}}>
                    <div style={{flex:'1',display:'flex',flexDirection:'column',justifyContent: 'space-around'}}>
                        <div style={{fontSize:'14px',paddingLeft:'2px',marginTop:'3px'}}>{put('parallel.group',(index+1))}</div>
                        <BoardbuttonContainer index={index}>
                            <div style={{textAlign:'center',height: '50px',lineHeight: '50px'}}><i style={{fontSize:'22px',color:'#00b0ff'}} className="icon qingicon icon-jiahao2fill"></i></div>
                        </BoardbuttonContainer>
                    </div>
                    <div style={{flex:'3.5',whiteSpace:'normal',marginLeft: '4px',marginTop:'3px'}}>
                        {data.map((el,index)=>{ //data 是 会签组, el是 一组character对象的array
                            return (<CharacterContainer index={index} el={el} key={index} />) //el 需要包含上一级 groupIndex
                        })}
                    </div>
                </div>
            </SolidFrame>
        )
    }
}

import connectPut from 'react-put'
const options = {mapPropToDictionary: (props)=>window.reactI18n}
const ConnectedApp = connectPut(options)(ApproveGroup)

export default ConnectedApp
