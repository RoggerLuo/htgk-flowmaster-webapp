import React,{createClass} from 'react'
import CharacterContainer from '../CharacterContainer'
import SolidFrame from '../../presentations/SolidFrame/SolidFrame'
import BoardbuttonContainer from '../ButtonContainer'
import './ApproveGroup.less'

const ApproveGroup = ({data,mode,solidFrame,index}) => { 
    if(mode == 'initial'){
        return (
            <SolidFrame {...solidFrame}> 
                <div style={{display:'flex'}}>
                    <div style={{flex:'1'}}>
                        <div>会签组2</div>
                        <div></div>
                    </div>
                    <div style={{flex:'3.5'}}>
                        <BoardbuttonContainer index={index}>
                            <div>添加审批人员</div>
                        </BoardbuttonContainer>
                    </div>
                </div>
            </SolidFrame>
        )
    }else{
        return (
            <SolidFrame {...solidFrame}>
                <div style={{display:'flex'}}>
                    <div style={{flex:'1'}}>
                        <div>会签组1</div>
                        <BoardbuttonContainer index={index}>
                            <div><i className="icon qingicon icon-jiahao2fill"></i></div>
                        </BoardbuttonContainer>
                    </div>
                    <div style={{flex:'3.5',whiteSpace:'normal'}}>
                        {data.map((el,index)=>{ //data 是 会签组, el是 一组character对象的array
                            return (<CharacterContainer index={index} el={el} key={index} />) //el 需要包含上一级 groupIndex
                        })}
                    </div>
                </div>
            </SolidFrame>
        )
    }
}

export default ApproveGroup
