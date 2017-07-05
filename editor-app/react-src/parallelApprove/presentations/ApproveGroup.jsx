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
                        <div style={{fontSize:'13px',paddingLeft:'2px'}}>{put('parallel.group',(index+1))}</div>
                    </div>
                    <div>
                        <BoardbuttonContainer xClass={{right: '13px'}} index={index} >
                            <div style={{cursor:'pointer',paddingLeft: '27px',color:'#00b0ff',fontSize:'12.5px'}} >
                                {put('parallel.addGroup')}
                            </div>
                        </BoardbuttonContainer>
                    </div>
                </div>
            </SolidFrame>
        )
    }else{
        return (
            <SolidFrame {...solidFrame}>
                <div style={{display:'flex'}}>
                    <div style={{flex:'1',flexDirection:'column',justifyContent: 'space-around',paddingRight: '2px'}}>
                        <div style={{fontSize:'13px',paddingLeft:'6px',marginTop:'3px'}}>
                            {put('parallel.group',(index+1))}
                        </div>
                        <BoardbuttonContainer index={index} 
                            xClass={{
                                marginTop:'-14px',left: '16px',
                                backgroundSize: '142px 140px',
                                backgroundPosition: '-1px 0px',
                                padding: '8px 5px 6px 5px',
                                boxShadow: '0px 0px 0px rgba(212, 212, 212, 0.43)', 
                                backgroundImage: "url(./editor-app/dist/"+require('../../../images/pad2.png')+")"
                            }}
                        >
                            <div style={{textAlign:'center',height: '50px',lineHeight: '50px'}}>
                                <i style={{cursor:'pointer',fontSize:'20px',color:'#00b0ff'}} className="icon iconfont icon-jiahao2fill"></i>
                            </div>
                        </BoardbuttonContainer>
                    </div>
                    <div style={{flex:'3.5',whiteSpace:'normal',marginLeft: '4px',marginTop:'1px'}}>
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
