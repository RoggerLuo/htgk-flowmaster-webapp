import React,{createClass} from 'react';
import { render } from 'react-dom'
import Dropdown from './basicComp/Dropdown'
import DialoguePopup from './basicComp/DialoguePopup'
import SoftContainer from './basicComp/SoftContainer'
// import UserTaskBoardbutton from './basicComp/UserTaskBoardbutton'
import Boardbutton from './basicComp/Boardbutton'
import CharactersList from './basicComp/CharactersList'
import store from '../redux/configureStore.js'
import { Provider } from 'react-redux'
import { connect } from 'react-redux'

const Approve = (props) => {

    /* start of the superDropdown */
    const publicOnClick = function(){
        props.dispatch({type:'updateSuperDropDownChoosedOption','text':this.text})
        props.dispatch({type:'closeSuperDropDownVisibility'})
    }
    
    let superDropdownParams={
        visibleStatus:props.superDropDownVisibilityStatus,
        toggle(e){
            props.dispatch({type:'toggleSuperDropDownVisibility'})
            e.stopPropagation()
            e.preventDefault()
        },
        choosedOption:props.superDropDownChoosedOption,
        options:[
            {
                text:'一',
                onClick:publicOnClick
            },
            {
                text:'二',
                onClick:publicOnClick
            },
            {
                text:'三',
                onClick:publicOnClick
            }
        ]
    }

    /* end of the superDropdown */

    const superDialogueParams={
        visibleStatus:props.superDialogueVisibilityStatus,
        close(){
            props.dispatch({type:'closeSuperDialogue'})
        },
        confirm(){}
    }

    const orgDialogueParams={
        visibleStatus:props.orgDialogueVisibilityStatus,
        close(){
            props.dispatch({type:'closeOrgDialogue'})
        },
        confirm(){}
    }

    const boardbuttonParams={
        visibilityStatus:props.UserBoardbuttonVisibilityStatus,
        dispatch:props.dispatch,
        toggle(e){
            props.dispatch({type:'changeUserTaskBoardbuttonVisibility'})
            // debugger
            e.stopPropagation()
            e.preventDefault()
        },
        title:'添加审批人员',
        options:[
            {
                onClick(e){
                    props.dispatch({type:'openSuperDialogue'})
                    props.dispatch({type:'closeUserTaskBoardbuttonVisibility'})
                    e.stopPropagation()
                    e.preventDefault()

                    /* 不能放在纯函数组件里触发，就放在“模拟挂载”事件中触发 */
                    if(superDropdownParams.options[0]){
                        props.dispatch({type:'updateSuperDropDownChoosedOption','text':superDropdownParams.options[0].text})
                    }else{
                        props.dispatch({type:'updateSuperDropDownChoosedOption','text':''})
                    }
                },
                text:'选择发起人上级'
            },
            {
                onClick(e){
                    props.dispatch({type:'openOrgDialogue'})
                    props.dispatch({type:'closeUserTaskBoardbuttonVisibility'})
                    e.stopPropagation()
                    e.preventDefault()
                },
                text:'选择机构角色'
            },
            {
                onClick(e){
                    props.dispatch({type:'closeUserTaskBoardbuttonVisibility'})
                    e.stopPropagation()
                    e.preventDefault()
                },
                text:'选择特定人员'
            },
        ]
    }
    const closeAllDropDown = ()=>{
        // debugger
        // 如果没有阻止冒泡就会 出问题
        props.dispatch({type:'closeUserTaskBoardbuttonVisibility'})
        props.dispatch({type:'closeSuperDropDownVisibility'})
        // props.dispatch({type:dialogueParams.close})
    }

    return(
        <div className="react-approve" onClick={closeAllDropDown}>
            
            <div className="section-title">会签范围</div>

            <SoftContainer>
                <div className="container-header">
                    <span className="container-title">会签组</span><Boardbutton {...boardbuttonParams} position="below"/>  
                </div>       
                <div className="container-header">
                    <CharactersList />
                </div>       
            </SoftContainer>
            <div className="and">与</div>
            <SoftContainer>
                <div className="container-header">
                    <span className="container-title">会签组</span><Boardbutton {...boardbuttonParams} position="below"/>  
                </div>       
                <div className="container-header">
                    <CharactersList />
                </div>       
            </SoftContainer>

            <div className="addmoreContainer"><a className="addmore">添加多一会签组 >></a></div>
            
            
            <div className="section-title">审批规则</div>
            <div className="content">需每个会签范围内至少一名代表审批通过方可会签通过</div>
            <DialoguePopup {...superDialogueParams}>
                申请的上一<Dropdown {...superDropdownParams}/>级领导
            </DialoguePopup>

            <DialoguePopup {...orgDialogueParams}>
                最近<Dropdown {...superDropdownParams}/>级分管 <input type="text" style={{width:'100px'}} placeholder="请选择角色类型"/>

            </DialoguePopup>

        </div>
    )
}

const mapStateToProps = (state) => {
    return state.approve
}

const mapDispatchToProps = (dispatch) => {
    return {dispatch}
}

const ApproveContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Approve)

export default function(){
    store.dispatch({type:'closeBoardbuttonVisibility'})
    store.dispatch({type:'closesuperDropDownVisibility'})

    render(
        <Provider store={store}>
            <ApproveContainer />
        </Provider>
        ,
        document.getElementById('parallelApprovePropertyCtrl')
    );
}