import React,{createClass} from 'react';
import store from '../../redux/configureStore.js'
import { Provider } from 'react-redux'
import { connect } from 'react-redux'
import ApproveGroup from './presentation/ApproveGroup.jsx'

const ApproveGroup = ({data,add,del,delCharacter,modeSwitch}) => {
    if(modeSwitch == 'initial'){
        return (
            <SolidFrame> 
                <div style={{display:'flex'}}>
                    <div style={{flex:'1'}}>
                        <div>会签组2</div>
                        <div></div>
                    </div>
                    <div style={{flex:'3.5'}}>
                        <div>添加审批人员</div>
                    </div>
                </div>
            </SolidFrame>
        )
    }else{
        return (
            <SolidFrame>
                <div style={{display:'flex'}}>
                    <div style={{flex:'1'}}>
                        <div>会签组1</div>
                        <div><i className="icon qingicon icon-jiahao2fill"></i></div>
                    </div>
                    <div style={{flex:'3.5',whiteSpace:'normal'}}>
                        {data.map((el,index)=>{
                            <CharacterContainer index={index} el={el} /> 
                        })}
                    </div>
                </div>
            </SolidFrame>
        )
    }
}
const ApproveGroupContainer = ({el,index}) => {
    data = [
        加上{groupIndex:''}
    ]
    
    return (
        <ApproveGroup />
    )
}
add
del
delCharacter  dispatch
modeSwitch 判断 character的数量
const mapStateToProps = (state) => {
    // const modeSwitch = state.parallel.mode
    const modeSwitch = state.parallel.mode

    return {modeSwitch}
}
const mapDispatchToProps = (dispatch) => {
    return {dispatch}
}
const ApproveGroupContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(ApproveGroup)

export default ApproveGroupContainer
